public class MainM4M5 {
    public static void main(String[] args) {
        System.out.println("===== TESTE INTEGRADO: M1 A M5 =====");

        // ---------------------------------------------------------
        // 1. M1 (Singleton): Definir configuração global
        // ---------------------------------------------------------
        ConfiguracaoLog config = ConfiguracaoLog.getInstance();
        config.setNivelAtivo("DEBUG");
        config.setFormato("FICHEIRO"); // Vamos gravar tudo em ficheiro para testar
        System.out.println("[M1] Configuração: Nível " + config.getNivelAtivo() + " | Destino: " + config.getFormato());


        // ---------------------------------------------------------
        // 2. M2 + M3 + M5: Criar Logs e ver o Pool em ação
        // ---------------------------------------------------------
        System.out.println("\n[M2/M3/M5] Criando e enviando logs individuais...");

        // A Factory (M2) cria o Log com o Destino (M3) injetado.
        // O Destino, por sua vez, pede um formatador ao Pool (M5).
        Log log1 = LogFactory.criarLog("SISTEMA");
        log1.enviar("Iniciando módulos críticos...");

        Log log2 = LogFactory.criarLog("ALERTA");
        log2.enviar("Uso de CPU acima de 90%!");


        // ---------------------------------------------------------
        // 3. M4 (Composite): Organizar por Categorias
        // ---------------------------------------------------------
        System.out.println("\n[M4] Estruturando Logs por Categorias (Composite)...");

        // Criamos as "Folhas" (Wrappers para o Composite)
        ComponenteLog logBd = new LogFolha(LogFactory.criarLog("SISTEMA"));
        ComponenteLog logAuth = new LogFolha(LogFactory.criarLog("ALERTA"));
        ComponenteLog logRede = new LogFolha(LogFactory.criarLog("SISTEMA"));

        // Criamos as Categorias (Grupos)
        CategoriaLog catInfraestrutura = new CategoriaLog("INFRAESTRUTURA");
        catInfraestrutura.adicionar(logBd);
        catInfraestrutura.adicionar(logRede);

        CategoriaLog catSeguranca = new CategoriaLog("SEGURANCA");
        catSeguranca.adicionar(logAuth);

        // Categoria Raiz (Sistema Global)
        CategoriaLog sistemaGlobal = new CategoriaLog("SISTEMA_TOTAL");
        sistemaGlobal.adicionar(catInfraestrutura);
        sistemaGlobal.adicionar(catSeguranca);

        // O teste final: Enviamos UM evento para a raiz e ele propaga para TODOS
        System.out.println("\n--- Disparando Evento Global no Composite ---");
        sistemaGlobal.registarEvento("Manutenção agendada para as 02:00h.");


        // ---------------------------------------------------------
        // 4. Verificação M5 (Object Pool)
        // ---------------------------------------------------------
        // Se olhares para o terminal, verás que o "Formatador pesado criado"
        // apareceu poucas vezes, mesmo tendo disparado vários logs.

        System.out.println("\n==========================================");
        System.out.println("Teste concluído. Verifica o ficheiro 'log_geral.txt'!");
    }
}
