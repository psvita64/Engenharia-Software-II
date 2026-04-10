import com.es2.whiteboxconditions.Rating;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TestWhiteBoxCondition {
    @BeforeAll
    static void setUpBeforeClass() throws Exception {
    }

    @AfterAll
    static void tearDownAfterClass() throws Exception {
        new End();
    }

    @BeforeEach
    void setUp() throws Exception {
    }

    @AfterEach
    void tearDown() throws Exception {
    }

    @DisplayName("Test White-box Conditions of evaluateScoreTemperature()")
    @Test
    void testScoreTemperature() {
        Rating r = new Rating();
        Assertions.assertEquals("It's hot out, and so am I", r.evaluateScoreTemperature(10, 35));
        Assertions.assertEquals("I'm balanced", r.evaluateScoreTemperature(8, 24));
        Assertions.assertEquals("I'm in a bad mood", r.evaluateScoreTemperature(4, 5));
        Assertions.assertEquals("I'm balanced", r.evaluateScoreTemperature(6, 21));
    }

    @DisplayName("Test White-box Conditions of evaluateIfCouldBeAcceptedAtDisco()")
    @Test
    void testAcceptedAtDisco() {
        Rating r = new Rating();
        Assertions.assertEquals("Accepted", r.evaluateIfCouldBeAcceptedAtDisco(8, 5));
        Assertions.assertEquals("Not Accepted", r.evaluateIfCouldBeAcceptedAtDisco(7, 4));
    }
}
