package com.es2.factorymethod;

public abstract class Product {
    private String brand;

    protected Product(String brand) {  // protegido para usar apenas via factory
        this.brand = brand;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public abstract void showInfo();
}