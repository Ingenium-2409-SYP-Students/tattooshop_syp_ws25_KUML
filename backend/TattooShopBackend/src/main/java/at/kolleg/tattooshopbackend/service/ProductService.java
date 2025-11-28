package at.kolleg.tattooshopbackend.service;

import at.kolleg.tattooshopbackend.model.Product;
import at.kolleg.tattooshopbackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor

public class ProductService {
    @Autowired
    CategoryRepository categoryRepository;

    List<Product> products = new ArrayList<>();
    // for demo use a simple counter for the ids
    int idCounter = 0;

    public List<Product> findAll(Sort sort) {
        return products;
    }

    public void addProduct(Product product) {
        product.setId(++idCounter);
        products.add(product);
    }
}
