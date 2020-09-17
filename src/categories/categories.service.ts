import {ConflictException, Injectable} from "@nestjs/common";
import {GetCategoriesFilterDto} from "./dto/get-categories-filter.dto";
import {Category} from "./category.entity";
import {CategoriesRepository} from "./repositories/categories.repository";
import {CreateCategoryDto} from "./dto/create-category.dto";


@Injectable()
export class CategoriesService {

    constructor(private categoriesRepository: CategoriesRepository) {
    }

    /**
     * vraci strom kategorii, pokud je parametr vyplnen, vraci pouze strukturu pod
     * @param getCategoriesFilterDto
     */
    async getCategories(getCategoriesFilterDto: GetCategoriesFilterDto): Promise<Category[]> {
        return this.categoriesRepository.getCategories(getCategoriesFilterDto);
    }

    /**
     * tvorba kategorie
     * @param createCategoryDto
     */
    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        let ancestor;
        const { name, code = null, parent = null } = createCategoryDto || {};

        const nameExists = await this.categoriesRepository.findOne({ where: {name, parent}})

        if (nameExists) {
            throw new ConflictException(`Category with "${name}" name already exists!`);
        }

        if (parent) {
            ancestor = await this.categoriesRepository.findOneOrFail({id: parent});
        }

        const category = new Category();
        category.name = name;
        category.code = code;
        category.parent = ancestor;
        const newCat = await category.save();

        return newCat;
    }

}
