import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

interface DestinoImplementador {
    void gravarRegisto(String mensagem);
}

// Implementação Concreta: Consola
class DestinoConsola implements DestinoImplementador {
    @Override
    public void gravarRegisto(String mensagem) {
        // 1. Pede emprestado ao M5
        FormatadorMensagem formatador = FormatadorPool.getInstance().adquirir();

        // 2. Usa
        String msgFormatada = formatador.formatar(mensagem);
        System.out.println("[CONSOLE] " + msgFormatada);

        // 3. Devolve ao M5
        FormatadorPool.getInstance().libertar(formatador);
    }
}

// Implementação Concreta: Ficheiro
class DestinoFicheiro implements DestinoImplementador {
    private String caminho;

    public DestinoFicheiro(String caminho) {
        this.caminho = caminho;
    }

    @Override
    public void gravarRegisto(String mensagem) {
        // 1. Pede emprestado ao M5
        FormatadorMensagem formatador = FormatadorPool.getInstance().adquirir();
        String msgFormatada = formatador.formatar(mensagem);

        // 2. Grava no ficheiro usando o bloco try-with-resources
        try (FileWriter fw = new FileWriter(caminho, true);
             PrintWriter pw = new PrintWriter(fw)) {

            pw.println(msgFormatada);
            System.out.println("[INFO] Gravado no ficheiro: " + caminho);

        } catch (IOException e) {
            System.err.println("Erro ao gravar no ficheiro local: " + e.getMessage());
        } finally {
            FormatadorPool.getInstance().libertar(formatador);
        }
    }
}