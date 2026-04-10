package com.es2.whiteboxconditions;

public class Rating {
    public String evaluateScoreTemperature(int score, int temperature) {
        if (score >= 10 && temperature >= 35) {
            return "It's hot out, and so am I";
        } else {
            return score >= 5 && temperature > 20 ? "I'm balanced" : "I'm in a bad mood";
        }
    }

    public String evaluateIfCouldBeAcceptedAtDisco(int dressStyle, int talkSkill) {
        return dressStyle >= 8 && talkSkill >= 5 ? "Accepted" : "Not Accepted";
    }
}
