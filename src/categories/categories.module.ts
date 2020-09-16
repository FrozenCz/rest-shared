import {Module} from "@nestjs/common";
import {CategoriesController} from "./categoriesController";


@Module({
    controllers: [CategoriesController]
})
export class CategoriesModule {

}
