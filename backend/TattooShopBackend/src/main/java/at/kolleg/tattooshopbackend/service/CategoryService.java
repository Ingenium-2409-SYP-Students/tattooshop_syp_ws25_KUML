package at.kolleg.tattooshopbackend.service;

import at.kolleg.tattooshopbackend.model.Category;
import at.kolleg.tattooshopbackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> findAll(Sort sort) {
        return categoryRepository.findAll(sort);
    }
}