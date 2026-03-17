import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== TESTE M1: CONFIGURAÇÃO CENTRALIZADA (SINGLETON) ===");

        ConfiguracaoLog config1 = ConfiguracaoLog.getInstance();
        System.out.println("Nível de Log inicial: " + config1.getNivelAtivo());

        config1.setNivelAtivo("DEBUG");

        ConfiguracaoLog config2 = ConfiguracaoLog.getInstance();
        System.out.println("Nível de Log lido na config2: " + config2.getNivelAtivo());
        System.out.println("A config1 e a config2 são a exata mesma instância na memória? " + (config1 == config2));

        System.out.println("\n=== TESTE M2: CRIAÇÃO DE LOGS (FACTORY METHOD) ===");

        LogRecord logInfo = LogFactory.criarLog("INFO");
        logInfo.emitir("O sistema arrancou com sucesso.");

        LogRecord logErro = LogFactory.criarLog("ERROR");
        logErro.emitir("A base de dados não respondeu no tempo esperado.");

        System.out.println("\n=== TESTE M2 (DEFESA): EXTENSÃO DINÂMICA (OPEN/CLOSED) ===");

        LogFactory.registarNovoTipo("CRITICAL", () -> new LogRecord() {
            @Override
            public void emitir(String mensagem) {
                System.err.println("[CRITICAL ALERT] " + LocalDateTime.now() + " >>> " + mensagem.toUpperCase());
            }
        });

        LogRecord logCritico = LogFactory.criarLog("CRITICAL");
        logCritico.emitir("O servidor principal foi abaixo!");

        System.out.println("\nTestes concluídos com sucesso (Exit code 0).");
    }
}