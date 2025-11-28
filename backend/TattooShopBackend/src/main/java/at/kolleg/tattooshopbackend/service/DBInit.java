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
    void initializeDb()
    {
        ObjectMapper mapper = new ObjectMapper();

        try{
            List<Category> categories = mapper
                    .readValue(getClass()
                                    .getClassLoader()
                                    .getResourceAsStream("categories.json"),
                            new TypeReference<>() {});

            categoryRepository.saveAll(categories);

            productService.addProduct(new Product(1, "Piercingschmuck 1" , "Schmuck", categories.get(1), "/1.jpg"));
            productService.addProduct(new Product(2, "Piercingschmuck 2" , "Schmuck", categories.get(1),"/2.jpg"));
            productService.addProduct(new Product(3, "Piercingschmuck 3" , "Schmuck", categories.get(1),"/3.jpg"));
            productService.addProduct(new Product(4, "Tattoo Pflege 1" , "Tattoo", categories.get(0), "/4.jpg"));
            productService.addProduct(new Product(5, "Tattoo Pflege 2" , "Tattoo", categories.get(0),"/5.jpg"));
            productService.addProduct(new Product(6, "Tattoo Pflege 3" , "Tattoo", categories.get(0),"/6.jpg"));
            productService.addProduct(new Product(7, "Piercing Pflege 1" , "Piercing", categories.get(1), "/7.jpg"));
            productService.addProduct(new Product(8, "Piercing Pflege 2" , "Piercing", categories.get(1),"/8.jpg"));
            productService.addProduct(new Product(9, "Tattoo Pflege 4" , "Tattoo", categories.get(0),"/9.jpg"));




        } catch (Exception e){
        }
    }
}