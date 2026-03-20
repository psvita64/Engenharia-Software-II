import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// Interface Implementor
interface DestinoImplementador {
    void gravarRegisto(String mensagem);
}

// Implementação Concreta: Consola
class DestinoConsola implements DestinoImplementador {
    @Override
    public void gravarRegisto(String mensagem) {
        System.out.println("[CONSOLE] " + mensagem);
    }
}

class DestinoFicheiro implements DestinoImplementador {
    private String caminho;

    public DestinoFicheiro(String caminho) {
        this.caminho = caminho;
    }

    @Override
    public void gravarRegisto(String mensagem) {
        try (FileWriter fw = new FileWriter(caminho, true);
             PrintWriter pw = new PrintWriter(fw)) {
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            pw.println("["+ timestamp +"]" + mensagem);
            System.out.println("[INFO] Gravado no ficheiro: " + caminho);

        } catch (IOException e) {
            System.err.println("Erro ao gravar no ficheiro local: " + e.getMessage());
        }
    }
}