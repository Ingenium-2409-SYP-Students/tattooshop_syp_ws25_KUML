package at.kolleg.tattooshopbackend.repository;

import at.kolleg.tattooshopbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}