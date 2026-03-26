import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

interface LogRecord {
    void emitir(String mensagem);
}

class InfoLog implements LogRecord {
    public void emitir(String msg) {
        System.out.println("[INFO] " + LocalDateTime.now() + " - " + msg);
    }
}

class ErrorLog implements LogRecord {
    public void emitir(String msg) {
        System.err.println("[ERROR] " + LocalDateTime.now() + " -  " + msg.toUpperCase());
    }
}

class WarningLog implements LogRecord {
    public void emitir(String msg) {
        System.out.println("[WARNING] " + LocalDateTime.now() + " -  " + msg);
    }
}

class LogFactory {
    // Mudamos para Function: ela recebe um Destino e entrega um Log
    private static final Map<String, Function<DestinoImplementador, Log>> registo = new HashMap<>();

    static {
        // Agora passamos o destino para o construtor da classe
        registo.put("SISTEMA", d -> new LogSistema(d));
        registo.put("ALERTA", d -> new LogAlerta(d));
        registo.put("INFO", d -> new LogSistema(d)); // Podes mapear os antigos para os novos
    }

    public static Log criarLog(String tipo) {
        ConfiguracaoLog config = ConfiguracaoLog.getInstance();
        DestinoImplementador destino;

        // Escolha do Destino (M3)
        if ("FICHEIRO".equalsIgnoreCase(config.getFormato())) {
            destino = new DestinoFicheiro("log_geral.txt");
        } else {
            destino = new DestinoConsola();
        }

        Function<DestinoImplementador, Log> construtor = registo.get(tipo.toUpperCase());

        if (construtor != null) {
            // Aqui passamos o destino "injetando-o" no log
            return construtor.apply(destino);
        }

        return new LogSistema(destino);
    }
}