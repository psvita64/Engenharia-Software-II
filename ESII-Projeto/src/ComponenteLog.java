import java.util.*;

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
    private Map<String, ComponenteLog> componentes = new HashMap<>();

    public CategoriaLog(String nome) {
        this.nome = nome;
    }

    public void adicionar(String chave, ComponenteLog componente) {
        componentes.put(chave, componente);
    }

    public void remover(String chave) {
        componentes.remove(chave);
    }

    public ComponenteLog obter(String chave) {
        return componentes.get(chave);
    }

    @Override
    public void registarEvento(String mensagem) {
        System.out.println("\n>>> Propagando para a Categoria: " + nome);
        // O "segredo" do Composite: um ciclo que chama todos os filhos!
        for (Map.Entry<String, ComponenteLog> entry : componentes.entrySet()) {
            String chave = entry.getKey();
            ComponenteLog componente = entry.getValue();

            componente.registarEvento("[" + nome + " -> " + chave + "] " + mensagem);
        }
    }
}