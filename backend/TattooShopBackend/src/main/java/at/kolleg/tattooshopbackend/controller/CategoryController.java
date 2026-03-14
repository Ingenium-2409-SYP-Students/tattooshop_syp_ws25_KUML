package at.kolleg.tattooshopbackend.controller;

import at.kolleg.tattooshopbackend.model.Category;
import at.kolleg.tattooshopbackend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories(@RequestParam(defaultValue = "id") String sortBy) {
        try {
            // Wenn das Feld nicht existiert, wirft Spring beim Zugriff auf die DB eine Exception
            return ResponseEntity.ok(categoryService.findAll(Sort.by(sortBy)));
        } catch (Exception e) {
            // Fängt ungültige Sortierparameter ab (für den 400 Bad Request Test)
            return ResponseEntity.badRequest().build();
        }
    }
}