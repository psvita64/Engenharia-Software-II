package com.es2.factorymethod;

public class UndefinedProductException extends Exception {

    public UndefinedProductException() {
        super("Undefined product type");
    }
}