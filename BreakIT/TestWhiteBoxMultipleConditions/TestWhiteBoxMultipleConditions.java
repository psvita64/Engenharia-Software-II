import static org.junit.jupiter.api.Assertions.*;

import com.es2.multipleconditions.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterAll;
import java.util.ArrayList;

public class TestWhiteBoxMultipleConditions {
	@Test
	public void testApprovedAllTrue() {
		// All conditions true: T T T
		Marks marks = new Marks(10, 0.7f, 10);
		Assertions.assertTrue(CourseUtils.approved(marks));
	}

	@Test
	public void testApprovedAttendanceFalse() {
		// T F T - attendance false
		Marks marks = new Marks(10, 0.6f, 10);
		assertFalse(CourseUtils.approved(marks));
	}

	@Test
	public void testApprovedWorkFalse() {
		// T T F - work false
		Marks marks = new Marks(8, 0.7f, 5);
		assertFalse(CourseUtils.approved(marks));
	}

	@Test
	public void testApprovedWrittenTestFalse() {
		// T T F - writtenTest false
		Marks marks = new Marks(5, 0.7f, 10);
		assertFalse(CourseUtils.approved(marks));
	}

	@Test
	public void testApprovedAttendanceWorkFalse() {
		// F F T - attendance and work false
		Marks marks = new Marks(10, 0.6f, 5);
		assertFalse(CourseUtils.approved(marks));
	}

	@Test
	public void testApprovedAttendanceWrittenTestFalse() {
		// F T F - attendance and writtenTest false
		Marks marks = new Marks(5, 0.6f, 10);
		assertFalse(CourseUtils.approved(marks));
	}

	@Test
	public void testApprovedWorkWrittenTestFalse() {
		// T F F - work and writtenTest false
		Marks marks = new Marks(5, 0.7f, 5);
		assertFalse(CourseUtils.approved(marks));
	}

	@Test
	public void testApprovedAllFalse() {
		// F F F - all false
		Marks marks = new Marks(5, 0.6f, 5);
		assertFalse(CourseUtils.approved(marks));
	}

	@Test
	public void testApprovedBoundaryWork() {
		// Boundary: work = 10 (exactly on boundary, should be true)
		Marks marks = new Marks(10, 0.7f, 10);
		assertTrue(CourseUtils.approved(marks));
	}

	@Test
	public void testApprovedBoundaryAttendance() {
		// Boundary: attendance just above 0.66 (should be true with other conditions met)
		Marks marks = new Marks(10, 0.67f, 10);
		assertTrue(CourseUtils.approved(marks));
	}

	@Test
	public void testApprovedBoundaryWrittenTest() {
		// Boundary: writtenTest = 9 (exactly on boundary, should be true)
		Marks marks = new Marks(9, 0.7f, 10);
		assertTrue(CourseUtils.approved(marks));
	}

	// ============ DriveUtils.assertConditionsToDrive() Tests ============
	// Condition 1: age < 18
	// Condition 2: p != null
	// Expected combinations: 2^2 = 4

	@Test
	public void testDriveYoungPerson() throws PersonCannotDriveException {
		// age < 18, not null - should throw exception
		Person person = new Person("John", 16);
		assertThrows(PersonCannotDriveException.class, () -> {
			DriveUtils.assertConditionsToDrive(person);
		});
	}

	@Test
	public void testDriveAdultPerson() throws PersonCannotDriveException {
		// age >= 18, not null - should not throw exception
		Person person = new Person("Jane", 20);
		DriveUtils.assertConditionsToDrive(person);
	}

	@Test
	public void testDriveBoundaryAge() throws PersonCannotDriveException {
		// age = 18 (exactly on boundary, should not throw)
		Person person = new Person("Bob", 18);
		DriveUtils.assertConditionsToDrive(person);
	}

	@Test
	public void testDriveYoungBoundary() throws PersonCannotDriveException {
		// age = 17 (just below boundary, should throw)
		Person person = new Person("Alice", 17);
		assertThrows(PersonCannotDriveException.class, () -> {
			DriveUtils.assertConditionsToDrive(person);
		});
	}

	// ============ ListUtils.findName() Tests ============
	// Condition 1: list.get(i).equals(name)
	// Condition 2: i <= list.size()
	// Expected combinations: 2^2 = 4

	@Test
	public void testFindNameFound() {
		ArrayList<String> list = new ArrayList<>();
		list.add("Alice");
		list.add("Bob");
		list.add("Charlie");

		int result = ListUtils.findName(list, "Bob");
		assertEquals(1, result);
	}

	@Test
	public void testFindNameFoundFirst() {
		ArrayList<String> list = new ArrayList<>();
		list.add("Alice");
		list.add("Bob");
		list.add("Charlie");

		int result = ListUtils.findName(list, "Alice");
		assertEquals(0, result);
	}

	@Test
	public void testFindNameNotFound() {
		ArrayList<String> list = new ArrayList<>();
		list.add("Alice");
		list.add("Bob");
		list.add("Charlie");

		int result = ListUtils.findName(list, "Diana");
		assertEquals(-1, result);
	}

	@Test
	public void testFindNameEmptyList() {
		ArrayList<String> list = new ArrayList<>();

		int result = ListUtils.findName(list, "Alice");
		assertEquals(-1, result);
	}

	@Test
	public void testFindNameFoundLast() {
		ArrayList<String> list = new ArrayList<>();
		list.add("Alice");
		list.add("Bob");
		list.add("Charlie");

		int result = ListUtils.findName(list, "Charlie");
		assertEquals(2, result);
	}

    // Adicione este teste em DriveUtils.assertConditionsToDrive()
    @Test
    public void testDriveNullPerson() {
        // Caso onde o objeto Person é nulo (Condição p != null é falsa)
        assertThrows(PersonCannotDriveException.class, () -> {
            DriveUtils.assertConditionsToDrive(null);
        });
    }

    // Certifique-se de que estas combinações cobrem os estados independentes
    @Test
    public void testApprovedComb2() {
        // T F T (Escrita OK, Frequência Baixa, Trabalho OK)
        // Se a regra for (test >= 9 && attendance > 0.66 && work >= 10)
        Marks marks = new Marks(10, 0.5f, 10);
        assertFalse(CourseUtils.approved(marks));
    }

    @Test
    public void testApprovedComb3() {
        // T T F (Escrita OK, Frequência OK, Trabalho Baixo)
        Marks marks = new Marks(10, 0.7f, 5);
        assertFalse(CourseUtils.approved(marks));
    }

	@AfterAll
	public static void afterAll() {
		new End();
	}
}
