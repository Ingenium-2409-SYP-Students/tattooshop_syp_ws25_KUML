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
        try {
            ObjectMapper mapper = new ObjectMapper();

            List<Category> categories = mapper.readValue(
                    getClass().getClassLoader().getResourceAsStream("categories.json"),
                    new TypeReference<>() {}
            );

            categoryRepository.saveAll(categories);

            Category tattoo = categories.get(0);

            productService.addProduct(new Product(null,"After Care Balm","Pflege",tattoo,"1.jpg"));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}