package com.es2.decorator;

import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        System.out.println("### Teste 1: Autenticação Padrão (Sem Decoradores) ###");
        AuthInterface normalAuth = new Auth();
        try {
            normalAuth.auth("admin", "admin");
            System.out.println("Sucesso: admin/admin autenticado.");
        } catch (AuthException | IOException e) {
            System.out.println("Erro inesperado: " + e.getMessage());
        }

        System.out.println("\n### Teste 2: Com Logging e Validação de Palavras Comuns ###");
        // Criando a estrutura decorada conforme o diagrama sugerido
        AuthInterface decoratedAuth = new Logging(
                new CommonWordsValidator(
                        new Auth()
                )
        );

        // Cenário A: Credenciais corretas, mas senha está no dicionário (insegura)
        // Nota: O Javadoc indica que admin/admin é o padrão. Se "admin" for considerada comum:
        try {
            System.out.println("Tentando autenticar com admin/admin...");
            decoratedAuth.auth("admin", "admin");
        } catch (AuthException e) {
            System.out.println("\nFalha de autenticação (Senha comum ou credenciais erradas).");
        } catch (IOException e) {
            System.out.println("\nErro de conexão com a API de dicionário.");
        }

        // Cenário B: Credenciais erradas
        try {
            System.out.println("\nTentando autenticar com usuario_inexistente/senha123...");
            decoratedAuth.auth("usuario_inexistente", "senha123");
        } catch (AuthException e) {
            System.out.println("\nResultado esperado: Falha capturada pelo Decorador de Log.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}