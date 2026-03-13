package com.es2.memento;

public class NotExistingSnapshotException extends RuntimeException {
    public NotExistingSnapshotException(String message) {
        super(message);
    }
}
