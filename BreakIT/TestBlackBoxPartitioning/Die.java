package com.es2.blackboxpartitioning;
import java.util.Random;
public class Die {

    public static final int DEFAULT_SIDES = 6;
    private static Random ourRandNumGen;
    private int sides;
    private int result;
    public String state;

    static{
        ourRandNumGen = new Random();
    }
    public Die(){
        sides = DEFAULT_SIDES;
    }
    public Die(int numSides){
        if (numSides > 1 && numSides <= 6) {
            this.sides = numSides;
            this.result = 1;
            if (this.getResult() != 1 || this.getNumSides() != numSides) {
                throw new AssertionError();
            }
        } else {
            throw new AssertionError("Violation of precondition: numSides = " + numSides + "numSides must be greater than 1");
        }
    }
    public Die(int numSides, int result){
        if (numSides > 1 && 1 <= result && result <= numSides) {
            this.sides = numSides;
            this.result = result;
        } else {
            throw new AssertionError("Violation of precondition");
        }

    }
    public int getNumSides(){
        return this.sides;
    }
    public int getResult(){
        return this.result;
    }
    public int roll(){
        this.result = ourRandNumGen.nextInt(this.sides) + 1;
        if (1 <= this.getResult() && this.getResult() <= this.getNumSides()) {
            return this.result;
        } else {
            throw new AssertionError();
        }
    }
    public String toString(){
        return "Num sides " + this.getNumSides() + " result " + this.getResult();
    }
}
