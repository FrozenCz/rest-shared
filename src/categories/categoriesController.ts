import {Body, Controller, Get, Post, Query, UseGuards, ValidationPipe} from "@nestjs/common";
import {GetCategoriesFilterDto} from "./dto/get-categories-filter.dto";
import {CategoriesService} from "./categories.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Category} from "./category.entity";
import {AuthGuard} from "@nestjs/passport";
import {RightsGuard} from "../guards/rights.guard";
import {RightsAllowed} from "../guards/rights-allowed.decorator";
import {RightsTag} from "../rights/config/rights.list";


@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) {
    }

    @Get()
    getCategories(@Query(ValidationPipe) getCategriesFilterDto: GetCategoriesFilterDto) {
        return this.categoriesService.getCategories(getCategriesFilterDto);
    }

    @Post()
    @UseGuards(AuthGuard(), RightsGuard)
    @RightsAllowed(RightsTag.createCategory)
    createCategories(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.createCategory(createCategoryDto);
    }


}
