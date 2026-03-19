import java.util.HashSet;
import java.util.Set;

public class ConfiguracaoLog {

    private static ConfiguracaoLog instancia;

    // Definições do Sistema
    private String nivelAtivo;
    private String formato;

    //Construtor
    private ConfiguracaoLog() {
        this.nivelAtivo = "INFO";
        this.formato = "PADRAO";
    }

    public static synchronized ConfiguracaoLog getInstance() {
        if (instancia == null) {
            instancia = new ConfiguracaoLog();
        }
        return instancia;
    }

    // Getters e Setters
    public String getNivelAtivo() { return nivelAtivo; }
    public void setNivelAtivo(String nivel) { this.nivelAtivo = nivel; }
}