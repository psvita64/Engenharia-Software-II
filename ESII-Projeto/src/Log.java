import java.util.ArrayList;
import java.util.List;

// Abstração Base
abstract class Log {
    // A lista que armazena todos os destinos (Ponte 1 para N)
    protected List<DestinoImplementador> destinos = new ArrayList<>();

    // Construtor que aceita o primeiro destino (exigido pela Factory)
    protected Log(DestinoImplementador destinoInicial) {
        this.destinos.add(destinoInicial);
    }

    // Permite adicionar mais destinos depois (ex: Consola + Ficheiro)
    public void adicionarDestino(DestinoImplementador destino) {
        this.destinos.add(destino);
    }

    public abstract void enviar(String mensagem);
}

// Abstração Refinada: Log de Sistema
class LogSistema extends Log {

    public LogSistema(DestinoImplementador destino) {
        super(destino); // Resolve o erro: chama o construtor da classe pai
    }

    @Override
    public void enviar(String mensagem) {
        for (DestinoImplementador d : destinos) {
            d.gravarRegisto("SISTEMA: " + mensagem);
        }
    }
}

// Abstração Refinada: Log de Alerta
class LogAlerta extends Log {

    public LogAlerta(DestinoImplementador destino) {
        super(destino); // Resolve o erro: chama o construtor da classe pai
    }

    @Override
    public void enviar(String mensagem) {
        String mensagemFormatada = "!!! ALERTA_URGENTE !!! -> " + mensagem.toUpperCase();
        for (DestinoImplementador d : destinos) {
            d.gravarRegisto(mensagemFormatada);
        }
    }
}