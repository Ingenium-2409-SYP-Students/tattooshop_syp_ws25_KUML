package at.kolleg.tattooshopbackend.service;

import at.kolleg.tattooshopbackend.model.Product;
import at.kolleg.tattooshopbackend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> findAll(Sort sort) {
        return productRepository.findAll(sort);
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }
}