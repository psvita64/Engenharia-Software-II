package com.es2.factorymethod;

public abstract class FactoryProduct {

    // Método exigido pelos testes (assinatura sem brand)
    public static Product makeProduct(String type) throws UndefinedProductException {
        if (type == null) {
            throw new UndefinedProductException();
        }

        switch (type) {
            case "Computer":
                return new Computer();
            case "Software":
                return new Software();
            default:
                throw new UndefinedProductException();
        }
    }

    // Método opcional para criar produtos com marca personalizada
    public static Product makeProduct(String type, String brand) throws UndefinedProductException {
        if (type == null) {
            throw new UndefinedProductException();
        }

        switch (type) {
            case "Computer":
                return new Computer(brand);
            case "Software":
                return new Software(brand);
            default:
                throw new UndefinedProductException();
        }
    }
}