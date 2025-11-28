package at.kolleg.tattooshopbackend.service;

import at.kolleg.tattooshopbackend.model.Category;
import at.kolleg.tattooshopbackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @Autowired
    private final CategoryRepository categoryRepository;

    /**
     * Gibt eine Liste mit Category-Elementen aus dem Repository zurück.
     * @param sort Gibt an, wie die Liste sortiert werden soll
     * @return eine (optional: sortierte) Liste
     */
    public List<Category> findAll(Sort sort) {
        if(sort != null){
            return categoryRepository.findAll(sort);
        } else {
            return categoryRepository.findAll();
 }
}
}