import java.util.ArrayList;
import java.util.List;

// 1. Component (A interface comum a ambos)
interface ComponenteLog {
    void registarEvento(String mensagem);
}

// 2. Leaf (Folha - O log individual que usa o nosso M3/Bridge)
class LogFolha implements ComponenteLog {
    private Log bridgeLog; // A tua classe abstrata do M3

    public LogFolha(Log bridgeLog) {
        this.bridgeLog = bridgeLog;
    }

    @Override
    public void registarEvento(String mensagem) {
        bridgeLog.enviar(mensagem);
    }
}

// 3. Composite (O Grupo / Categoria)
class CategoriaLog implements ComponenteLog {
    private String nome;
    private List<ComponenteLog> componentes = new ArrayList<>();

    public CategoriaLog(String nome) {
        this.nome = nome;
    }

    public void adicionar(ComponenteLog c) { componentes.add(c); }
    public void remover(ComponenteLog c) { componentes.remove(c); }

    @Override
    public void registarEvento(String mensagem) {
        System.out.println("\n>>> Propagando para a Categoria: " + nome);
        // O "segredo" do Composite: um ciclo que chama todos os filhos!
        for (ComponenteLog c : componentes) {
            c.registarEvento("[" + nome + "] " + mensagem);
        }
    }
}