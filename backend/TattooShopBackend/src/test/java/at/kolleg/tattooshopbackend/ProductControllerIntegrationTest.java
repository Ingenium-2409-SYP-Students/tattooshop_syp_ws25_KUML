package at.kolleg.tattooshopbackend;

import at.kolleg.tattooshopbackend.model.Category;
import at.kolleg.tattooshopbackend.model.Product;
import at.kolleg.tattooshopbackend.repository.CategoryRepository;
import at.kolleg.tattooshopbackend.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    private Category testCategory;

    @BeforeEach
    void setup() {
        productRepository.deleteAll();
        categoryRepository.deleteAll();
        testCategory = categoryRepository.save(new Category("Tattoo", "Zubehör"));
    }

    // Prüft neues Produkt erstellen und ob es der richtigen Kategorie hinzugefügt wird
    @Test
    void shouldAddProduct() throws Exception {
        String json = """
                {
                  "name": "Nadel Set",
                  "description": "Edelstahl",
                  "category": { "id": %d },
                  "image": "nadel.jpg"
                }
                """.formatted(testCategory.getId());

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Nadel Set"))
                .andExpect(jsonPath("$.category.id").value(testCategory.getId()));
    }

    // Prüft, ob die Liste aller Produkte erfolgreich vom Server geladen wird
    @Test
    void shouldReturnAllProducts() throws Exception {
        productRepository.save(new Product(null, "Farbe Blau", "Hautfreundlich", testCategory, "blue.jpg"));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].name").value("Farbe Blau"));
    }
}