package com.es2.memento;

import java.util.ArrayList;

public class Memento {
    ArrayList<String> students;

    public Memento(ArrayList<String> students) {
        this.students = new ArrayList<String>(students);
    }

    public ArrayList<String> getState(){
        return students;
    }
}
