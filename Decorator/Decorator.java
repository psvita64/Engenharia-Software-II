package com.es2.decorator;

import java.io.IOException;

public abstract class Decorator implements AuthInterface {
    protected AuthInterface authEntry;

    public Decorator(AuthInterface auth) {
        this.authEntry = auth;
    }

    @Override
    public void auth(String username, String password) throws AuthException, IOException {
        authEntry.auth(username, password);
    }
}