public class ConfiguracaoLog {

    private static ConfiguracaoLog instancia;

    // Definições do Sistema
    private String nivelAtivo;
    private String formato; // "PADRAO" ou "FICHEIRO"

    // Construtor Privado
    private ConfiguracaoLog() {
        this.nivelAtivo = "INFO";
        this.formato = "PADRAO"; // Valor inicial
    }

    public static synchronized ConfiguracaoLog getInstance() {
        if (instancia == null) {
            instancia = new ConfiguracaoLog();
        }
        return instancia;
    }

    // Getters e Setters para o Nível
    public String getNivelAtivo() { return nivelAtivo; }
    public void setNivelAtivo(String nivel) { this.nivelAtivo = nivel; }

    // --- ADICIONA ISTO: Getters e Setters para o Formato ---
    // Essencial para o M2 e M3 saberem onde gravar!
    public String getFormato() { return formato; }
    public void setFormato(String formato) { this.formato = formato; }
}