import {Module} from "@nestjs/common";
import {CategoriesController} from "./categoriesController";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PassportModule} from "@nestjs/passport";
import {CategoriesService} from "./categories.service";
import {CategoriesRepository} from "./repositories/categories.repository";


@Module({
    imports: [
        TypeOrmModule.forFeature([CategoriesRepository]),
        PassportModule.register({defaultStrategy: 'jwt'})
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService]

})
export class CategoriesModule {

}
