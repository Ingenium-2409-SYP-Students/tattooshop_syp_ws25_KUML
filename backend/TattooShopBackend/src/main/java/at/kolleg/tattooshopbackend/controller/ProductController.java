package at.kolleg.tattooshopbackend.controller;

import at.kolleg.tattooshopbackend.model.Category;
import at.kolleg.tattooshopbackend.model.Product;
import at.kolleg.tattooshopbackend.service.CategoryService;
import at.kolleg.tattooshopbackend.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@Slf4j
@RequestMapping("/api")
@RestController
@CrossOrigin("*")

public class ProductController {

    @Autowired
    CategoryService categoryService;

    @Autowired
    ProductService productService;

    @GetMapping("/products")
    ResponseEntity<List<Product>> getExpenses() {
        List<Product> expenses = productService.findAll(Sort.unsorted());
        return ResponseEntity.ok(expenses);
    }

    @PostMapping("/products")
    ResponseEntity<Product> addProduct(@RequestBody Product product) {
        productService.addProduct(product);
        log.info("add Product " + product);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/categories")
    ResponseEntity<List<Category>> getCategories(
            @RequestParam(value = "sortBy", required = false) String sortBy
    ) {
        // Sort auf unsorted() setzen, damit nicht null
        Sort sort = Sort.unsorted();
        // wenn sortBy Parameter übergeben wurde
        if (sortBy != null) {
            // Liste mit erlaubten Sortierparametern
            Set<String> allowed = Set.of("name", "description");
            // wenn enthalten, dann Sort setzen
            if(allowed.contains(sortBy)) {
                sort = Sort.by(sortBy);
            } else {
                // sonst BadRequest
                return ResponseEntity.badRequest().build();
            }
        }

        // Liste aus dem Service holen
        List<Category> categories = categoryService.findAll(sort);

        // entweder noContent oder den Inhalt
        return categories.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(categories);
    }

}
