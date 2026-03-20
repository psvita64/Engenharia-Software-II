import java.util.ArrayList;
import java.util.List;

// Abstração Base
abstract class Log {
    protected List<DestinoImplementador> destinos = new ArrayList<>();

    public void adicionarDestino(DestinoImplementador destino) {
        this.destinos.add(destino);
    }

    public abstract void enviar(String mensagem);
}

// Abstração Refinada: Log de Sistema
class LogSistema extends Log {
    @Override
    public void enviar(String mensagem) {
        String mensagemFormatada = "LOG_SISTEMA: " + mensagem;
        for (DestinoImplementador d : destinos) {
            d.gravarRegisto(mensagemFormatada);
        }
    }
}

// Abstração Refinada: Log de Alerta
class LogAlerta extends Log {
    @Override
    public void enviar(String mensagem) {
        String mensagemFormatada = "!!! ALERTA_URGENTE !!! -> " + mensagem.toUpperCase();
        for (DestinoImplementador d : destinos) {
            d.gravarRegisto(mensagemFormatada);
        }
    }
}
