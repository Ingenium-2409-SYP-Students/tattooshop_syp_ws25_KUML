package at.kolleg.tattooshopbackend.service;

import at.kolleg.tattooshopbackend.model.Category;
import at.kolleg.tattooshopbackend.model.Product;
import at.kolleg.tattooshopbackend.repository.CategoryRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DBInit {

    private final CategoryRepository categoryRepository;
    private final ProductService productService;

    @PostConstruct
    void initializeDb() {
        if (categoryRepository.count() > 0) {
            return;
        }

        try {
            ObjectMapper mapper = new ObjectMapper();

            List<Category> categories = mapper.readValue(
                    getClass().getClassLoader().getResourceAsStream("categories.json"),
                    new TypeReference<>() {}
            );
            categoryRepository.saveAll(categories);

            Category schmuckCat = findCategory(categories, "Schmuck");
            Category tattooCat = findCategory(categories, "Tattoo");
            Category piercingCat = findCategory(categories, "Piercing");

            // Schmuck/Piercing Produkte
            productService.addProduct(new Product(null, "Ohr-Stecker 'Gold Dream'", "Eleganter Stecker aus 14k Gold.", schmuckCat, "1.jpg"));
            productService.addProduct(new Product(null, "Bauchnabel Ring 'Crystal'", "Chirurgenstahl-Ring mit Zirkonia-Kristall.", schmuckCat, "2.jpg"));
            productService.addProduct(new Product(null, "Nasenpiercing 'Tiny Dot'", "Feiner Silber-Pin für dezente Akzente.", schmuckCat, "3.jpg"));

            // Tattoo Pflege Produkte
            productService.addProduct(new Product(null, "After Care Balm 50ml", "Intensivpflege zur Beschleunigung der Wundheilung von Tattoos.", tattooCat, "4.jpg"));
            productService.addProduct(new Product(null, "Tattoo Sun Blocker LSF50", "Hochwirksamer Sonnenschutz speziell für tätowierte Haut.", tattooCat, "5.jpg"));
            productService.addProduct(new Product(null, "Farb-Auffrischung 100ml", "Lotion zur Belebung alter und matter Tätowierungen.", tattooCat, "6.jpg"));

            // Piercing Pflege Produkte
            productService.addProduct(new Product(null, "Desinfektionsspray 30ml", "Antiseptisches Spray zur Reinigung frischer Piercings.", piercingCat, "7.jpg"));
            productService.addProduct(new Product(null, "Sea Salt Solution", "Sterile Salzlösung zur täglichen Spülung und Pflege.", piercingCat, "8.jpg"));
            productService.addProduct(new Product(null, "Tattoo Glide Cream", "Hochwertige, langanhaltende Gleitcreme für Tätowierarbeiten.", tattooCat, "9.jpg"));

            System.out.println("--- DBInit: Alle 9 Produkte erfolgreich geladen ---");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private Category findCategory(List<Category> list, String name) {
        return list.stream()
                .filter(c -> c.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElse(list.get(0));
    }
}