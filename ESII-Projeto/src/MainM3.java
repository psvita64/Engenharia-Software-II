public class MainM3 {
    public static void main(String[] args) {
        // Criamos os destinos (Implementadores)
        DestinoImplementador consola = new DestinoConsola();
        DestinoImplementador arquivo = new DestinoFicheiro("app_errors.log");

        // Cenário A: Log de Sistema enviado para a Consola
        Log log1 = new LogSistema(consola);
        log1.enviar("Aplicação iniciada.");

        // Cenário B: Log de Alerta enviado para o Ficheiro
        Log log2 = new LogAlerta(arquivo);
        log2.enviar("Falha crítica de segurança detectada.");

        // Cenário C: Log de Alerta enviado para a Consola (Mudança dinâmica!)
        Log log3 = new LogAlerta(consola);
        log3.enviar("Tentativa de login falhada.");
    }
}