import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {GetCategoriesFilterDto} from "./dto/get-categories-filter.dto";
import {Category} from "./category.entity";
import {CategoriesRepository} from "./repositories/categories.repository";
import {CreateCategoryDto} from "./dto/create-category.dto";


@Injectable()
export class CategoriesService {

    constructor(private categoriesRepository: CategoriesRepository) {
    }

    async getCategoryById(id: number) {
        const found = await this.categoriesRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Category with ID "${id}" not found!`);
        }

        return found;
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
        const {name, code = null, parent = null} = createCategoryDto || {};

        const nameExists = await this.categoriesRepository.findOne({where: {name, parent}})

        if (nameExists) {
            throw new ConflictException(`Category with "${name}" name already exists!`);
        }

        if (parent) {
            ancestor = await this.categoriesRepository.findOne({id: parent});
            if (!ancestor) {
                throw new NotFoundException(`Category with ID "${parent}" not found`);
            }
        }

        const category = new Category();
        category.name = name;
        category.code = code;
        category.parent = ancestor;
        const newCat = await category.save();

        return newCat;
    }

    /**
     * smazani kategorie a veskerych kategorii pod ni
     * @param id
     */
    async deleteCategory(id: number): Promise<void> {
        const category = await this.getCategoryById(id);
        //TODO: kontrola zda v této kategorii není žádný majetek, jinak není možné jí smazat

        const children = await this.categoriesRepository.findDescendants(category);

        /**
         * prvne musim odstranit zavislosti
         */
        const query = await this.categoriesRepository.createDescendantsQueryBuilder('category', 'categoryClosure', category);

        await query.delete()
            .from('category_closure')
            .where('id_ancestor IN (:...ids)', {ids: children.map(ch => ch.id)})
        .execute()

        await this.categoriesRepository.remove(children.reverse());

        return;
    }

    //TODO: moveCategory?
}
