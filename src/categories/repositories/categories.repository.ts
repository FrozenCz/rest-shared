import {EntityRepository, TreeRepository} from "typeorm";
import {Category} from "../category.entity";
import {NotFoundException} from "@nestjs/common";
import {GetCategoriesFilterDto} from "../dto/get-categories-filter.dto";

@EntityRepository(Category)
export class CategoriesRepository extends TreeRepository<Category> {

    async getCategoryById(id: number): Promise<Category> {
        const found = await this.findOne(id);

        if (!found) {
            throw new NotFoundException(`Category with ID "${id}" not found`);
        }

        return found;
    }

    async getCategories(getCategoriesFilterDto: GetCategoriesFilterDto): Promise<Category[]> {
        let parent;
        let categories;

        if ( getCategoriesFilterDto ) {
            parent = getCategoriesFilterDto.parent;
        }

        if ( parent ) {
            const ancestor = await this.getCategoryById(parent);
            categories = await this.findDescendantsTree(ancestor);
        } else {
            categories = await this.findTrees();
        }

        return categories;
    }

}
