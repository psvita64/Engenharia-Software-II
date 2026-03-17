import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Supplier;

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

// A FÁBRICA
class LogFactory {
    private static final Map<String, Supplier<LogRecord>> registo = new HashMap<>();

    static {
        registo.put("INFO", InfoLog::new);
        registo.put("ERROR", ErrorLog::new);
        registo.put("WARNING", WarningLog::new);
    }

    public static void registarNovoTipo(String tipo, Supplier<LogRecord> construtor) {
        registo.put(tipo.toUpperCase(), construtor);
    }

    public static LogRecord criarLog(String tipo) {
        Supplier<LogRecord> construtor = registo.get(tipo.toUpperCase());
        if (construtor != null) {
            return construtor.get();
        }
        throw new IllegalArgumentException("Tipo de log desconhecido: " + tipo);
    }
}