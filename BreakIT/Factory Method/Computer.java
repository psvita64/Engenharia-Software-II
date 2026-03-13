package com.es2.factorymethod;

public class Computer extends Product {

    // Construtor protegido sem argumento (para testes reflexivos)
    protected Computer() {
        this("DefaultBrand");
    }

    // Construtor protegido com marca
    protected Computer(String brand) {
        super(brand);
    }

    @Override
    public void showInfo() {
        System.out.println("Computer brand: " + getBrand());
    }
}