package com.es2.memento;

import java.util.ArrayList;

public class Server {
    ArrayList<String> students;

    public Server() {
        students = new ArrayList<String>();
    }

    public void addStudent(String studentName) throws ExistingStudentException{
        if (students.contains(studentName)) {
            throw new ExistingStudentException("Estudante já existe: " + studentName);
        }
        students.add(studentName);
    }

    public Memento backup(){
        return new Memento(students);
    }

    public ArrayList<String> getStudentNames(){
        return students;
    }

    public void restore(Memento state){
        this.students = state.getState();
    }

}
