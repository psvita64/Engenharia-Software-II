package com.es2.factorymethod;

public class Main {

    public static void main(String[] args) throws UndefinedProductException {

        Product computer = FactoryProduct.makeProduct("computer", "Dell");
        Product software = FactoryProduct.makeProduct("software", "Microsoft");

        computer.showInfo();
        software.showInfo();
    }
}