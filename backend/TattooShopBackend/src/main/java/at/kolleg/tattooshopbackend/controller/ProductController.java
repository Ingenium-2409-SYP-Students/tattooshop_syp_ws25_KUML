package at.kolleg.tattooshopbackend.controller;

import at.kolleg.tattooshopbackend.model.Product;
import at.kolleg.tattooshopbackend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/products")
    ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.ok(productService.findAll(Sort.unsorted()));
    }

    @PostMapping("/products")
    ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.addProduct(product));
    }
}