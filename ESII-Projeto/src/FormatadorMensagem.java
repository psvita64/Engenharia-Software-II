import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

// 1. O Objeto Pesado que queremos reutilizar
class FormatadorMensagem {
    private DateTimeFormatter dtf;

    public FormatadorMensagem() {
        // Simulando que criar isto demora muito tempo/recursos
        System.out.println("[M5 ObjectPool] -> Criou um NOVO formatador pesado na memória.");
        this.dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    }

    public String formatar(String mensagem) {
        return "[" + dtf.format(LocalDateTime.now()) + "] " + mensagem;
    }
}

// 2. O Padrão Object Pool Genérico
abstract class ObjectPool<T> {
    private Set<T> disponiveis = new HashSet<>();
    private Set<T> emUso = new HashSet<>();

    protected abstract T criarObjeto();

    public synchronized T adquirir() {
        if (disponiveis.isEmpty()) {
            disponiveis.add(criarObjeto());
        }
        T objeto = disponiveis.iterator().next();
        disponiveis.remove(objeto);
        emUso.add(objeto);
        return objeto;
    }

    public synchronized void libertar(T objeto) {
        emUso.remove(objeto);
        disponiveis.add(objeto);
    }
}

// 3. O Pool Específico para o nosso Formatador
class FormatadorPool extends ObjectPool<FormatadorMensagem> {
    // Implementamos o padrão Singleton no Pool para haver só um gestor
    private static FormatadorPool instancia;

    private FormatadorPool() {}

    public static synchronized FormatadorPool getInstance() {
        if (instancia == null) {
            instancia = new FormatadorPool();
        }
        return instancia;
    }

    @Override
    protected FormatadorMensagem criarObjeto() {
        return new FormatadorMensagem();
    }
}