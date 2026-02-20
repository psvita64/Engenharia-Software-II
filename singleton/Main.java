package com.es2.singleton;

public class Main {
    public static void main(String[] args) {
        Registry r1 = Registry.getInstance();
        Registry r2 = Registry.getInstance();

        r1.setPath("/usr/local/bin");

        System.out.println("Path do r1: " + r1.getPath());
        System.out.println("Path do r2: " + r2.getPath());

        if (r1 == r2) {
            System.out.println("r1 e r2 são iguais.");
        } else {
            System.out.println("r1 e r2 não sao iguais.");
        }

        r1.setConnectionString(null);
        System.out.println("ConnectionString: " + r1.getConnectionString());
    }
}