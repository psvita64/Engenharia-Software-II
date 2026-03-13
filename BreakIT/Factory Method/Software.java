package com.es2.factorymethod;

public class Software extends Product {

    // Construtor protegido sem argumento (para testes reflexivos)
    protected Software() {
        this("DefaultBrand");
    }

    // Construtor protegido com marca
    protected Software(String brand) {
        super(brand);
    }

    @Override
    public void showInfo() {
        System.out.println("Software brand: " + getBrand());
    }
}