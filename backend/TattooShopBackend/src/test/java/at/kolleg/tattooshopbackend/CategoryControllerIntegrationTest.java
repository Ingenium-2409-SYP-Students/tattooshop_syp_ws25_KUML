package at.kolleg.tattooshopbackend;

import at.kolleg.tattooshopbackend.model.Category;
import at.kolleg.tattooshopbackend.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CategoryControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CategoryRepository categoryRepository;

    @BeforeEach
    void setup() {
        categoryRepository.deleteAll();
        categoryRepository.save(new Category("Zubehör", "Nadeln und Griffe"));
        categoryRepository.save(new Category("Aftercare", "Pflegecremes"));
    }

    // Prüft, ob alle angelegten Kategorien in der Antwort enthalten sind
    @Test
    void shouldReturnAllCategories() throws Exception {
        mockMvc.perform(get("/api/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    // Prüft, ob die Kategorien alphabetisch nach ihrem Namen sortiert werden
    @Test
    void shouldReturnSortedCategories() throws Exception {
        mockMvc.perform(get("/api/categories?sortBy=name"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Aftercare"));
    }

    // Prüft, ob der Server eine Fehlermeldung schickt, wenn nach einem ungültigen Feld sortiert wird
    @Test
    void shouldReturnBadRequestForInvalidSort() throws Exception {
        mockMvc.perform(get("/api/categories?sortBy=falschesFeld"))
                .andExpect(status().isBadRequest());
    }
}