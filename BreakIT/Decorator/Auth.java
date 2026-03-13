package com.es2.decorator;

import java.io.IOException;

public class Auth implements AuthInterface {
    @Override
    public void auth(String username, String password) throws AuthException, IOException {
        if (!"admin".equals(username) || !"admin".equals(password)) {
            throw new AuthException();
        }
        // Se chegar aqui, autenticou com sucesso
    }
}