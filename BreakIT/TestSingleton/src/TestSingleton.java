import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

import com.es2.singleton.Registry;

import java.lang.reflect.Constructor;
import java.lang.reflect.Modifier;

public class TestSingleton {

    private Registry registry;

    @BeforeEach
    public void setUp() {
        registry = Registry.getInstance();
    }

    // Test 1: setPath stores correctly
    @Test
    public void testSetPath() {
        String path = "C:/test/file.txt";
        registry.setPath(path);

        assertEquals(path, registry.getPath());
    }

    // Test 2: setConnectionString stores correctly
    @Test
    public void testSetConnectionString() {
        String conn = "jdbc:mysql://localhost:3306/db";
        registry.setConnectionString(conn);

        assertEquals(conn, registry.getConnectionString());
    }

    // Test 3: setPath with null
    @Test
    public void testSetPathNull() {
        registry.setPath(null);

        assertNull(registry.getPath());
    }

    // Test 4: setConnectionString with null
    @Test
    public void testSetConnectionStringNull() {
        registry.setConnectionString(null);

        assertNull(registry.getConnectionString());
    }

    // Test 5: constructor is private
    @Test
    public void testPrivateConstructor() {
        Constructor<?>[] constructors = Registry.class.getDeclaredConstructors();

        for (Constructor<?> constructor : constructors) {
            if (!Modifier.isPrivate(constructor.getModifiers())) {
                fail("Constructor is not private");
            }
        }
    }

    // Required by platform
    @AfterAll
    static void tearDown() {
        End e = new End();
    }
}