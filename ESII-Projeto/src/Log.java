// Abstração Base
abstract class Log {
    protected DestinoImplementador destino; // A "Ponte"

    protected Log(DestinoImplementador destino) {
        this.destino = destino;
    }

    public abstract void enviar(String mensagem);
}

// Abstração Refinada: Log de Sistema (Normal)
class LogSistema extends Log {
    public LogSistema(DestinoImplementador destino) {
        super(destino);
    }

    @Override
    public void enviar(String mensagem) {
        destino.gravarRegisto("LOG_SISTEMA: " + mensagem);
    }
}

// Abstração Refinada: Log de Alerta (Urgente)
class LogAlerta extends Log {
    public LogAlerta(DestinoImplementador destino) {
        super(destino);
    }

    @Override
    public void enviar(String mensagem) {
        destino.gravarRegisto("!!! ALERTA_URGENTE !!! -> " + mensagem.toUpperCase());
    }
}