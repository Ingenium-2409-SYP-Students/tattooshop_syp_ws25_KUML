package at.kolleg.tattooshopbackend.service;

import at.kolleg.tattooshopbackend.model.Category;
import at.kolleg.tattooshopbackend.model.Product;
import at.kolleg.tattooshopbackend.repository.CategoryRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;

@Service
public class DBInit {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductService productService;

    @PostConstruct
    void initializeDb() {
        ObjectMapper mapper = new ObjectMapper();

        try {
            List<Category> categories = mapper
                    .readValue(getClass()
                                    .getClassLoader()
                                    .getResourceAsStream("categories.json"),
                            new TypeReference<>() {});

            categoryRepository.saveAll(categories);

            // Annahme: categories.get(0) ist 'Tattoo' und categories.get(1) ist 'Piercing'/'Schmuck'
            Category tattooCategory = categories.stream()
                    .filter(c -> c.getName().toLowerCase().contains("tattoo"))
                    .findFirst().orElse(null);

            Category piercingCategory = categories.stream()
                    .filter(c -> c.getName().toLowerCase().contains("piercing"))
                    .findFirst().orElse(null);

            Category schmuckCategory = categories.stream()
                    .filter(c -> c.getName().toLowerCase().contains("schmuck"))
                    .findFirst().orElse(null);

            // Wenn keine Kategorien gefunden wurden, brechen wir ab, um NullPointerExceptions zu vermeiden
            if (tattooCategory == null || piercingCategory == null || schmuckCategory == null) {
                // Hier könnten Sie einen Logger verwenden, um einen Fehler auszugeben
                return;
            }


            // Produkte initialisieren:
            // new Product(id, name, description, category, imagePath)

            // Schmuck/Piercing Produkte (Verwenden Sie Schmuck, wenn es spezifisch Schmuck ist)
            productService.addProduct(new Product(1, "Ohr-Stecker 'Gold Dream'", "Eleganter Stecker aus 14k Gold.", schmuckCategory, "1.jpg"));
            productService.addProduct(new Product(2, "Bauchnabel Ring 'Crystal'", "Chirurgenstahl-Ring mit Zirkonia-Kristall.", schmuckCategory, "2.jpg"));
            productService.addProduct(new Product(3, "Nasenpiercing 'Tiny Dot'", "Feiner Silber-Pin für dezente Akzente.", schmuckCategory, "3.jpg"));

            // Tattoo Pflege Produkte
            productService.addProduct(new Product(4, "After Care Balm 50ml", "Intensivpflege zur Beschleunigung der Wundheilung von Tattoos.", tattooCategory, "4.jpg"));
            productService.addProduct(new Product(5, "Tattoo Sun Blocker LSF50", "Hochwirksamer Sonnenschutz speziell für tätowierte Haut.", tattooCategory, "5.jpg"));
            productService.addProduct(new Product(6, "Farb-Auffrischung 100ml", "Lotion zur Belebung alter und matter Tätowierungen.", tattooCategory, "6.jpg"));

            // Piercing Pflege Produkte (Verwenden Sie Piercing für die Pflege, falls diese Kategorie existiert)
            productService.addProduct(new Product(7, "Desinfektionsspray 30ml", "Antiseptisches Spray zur Reinigung frischer Piercings.", piercingCategory, "7.jpg"));
            productService.addProduct(new Product(8, "Sea Salt Solution", "Sterile Salzlösung zur täglichen Spülung und Pflege.", piercingCategory, "8.jpg"));
            productService.addProduct(new Product(9, "Tattoo Glide Cream", "Hochwertige, langanhaltende Gleitcreme für Tätowierarbeiten.", tattooCategory, "9.jpg"));

        } catch (Exception e) {
            // Loggen Sie die Exception anstatt sie zu ignorieren
            // e.printStackTrace();
        }
    }
}