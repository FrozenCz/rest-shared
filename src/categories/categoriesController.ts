import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseGuards,
    ValidationPipe
} from "@nestjs/common";
import {GetCategoriesFilterDto} from "./dto/get-categories-filter.dto";
import {CategoriesService} from "./categories.service";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Category} from "./category.entity";
import {AuthGuard} from "@nestjs/passport";
import {RightsGuard} from "../guards/rights.guard";
import {RightsAllowed} from "../guards/rights-allowed.decorator";
import {RightsTag} from "../rights/config/rights.list";
import {User} from "../users/user.entity";
import {GetUser} from "../users/utils/get-user.decorator";


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

    @Delete('/:id')
    // @UseGuards(AuthGuard(), RightsGuard)
    // @RightsAllowed(RightsTag.deleteCategory)
    deleteCategory(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
        return this.categoriesService.deleteCategory(id);
    }

}
