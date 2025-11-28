package at.kolleg.tattooshopbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Product {

    Integer id;
    String name;
    String description;
    Category category;
    String image;
}
