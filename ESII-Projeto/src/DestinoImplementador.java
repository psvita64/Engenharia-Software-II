
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

