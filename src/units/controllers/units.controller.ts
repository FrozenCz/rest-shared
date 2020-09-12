import {Body, Controller, Get, Post, Query, UseGuards, ValidationPipe} from "@nestjs/common";
import {CreateUnitDto} from "../dto/create-unit.dto";
import {UnitsService} from "../units.service";
import {Unit} from "../unit.entity";
import {GetUnitsFilterDto} from "../dto/get-units-filter.dto";



@Controller('units')
export class UnitsController {

    constructor(private unitsService: UnitsService) {
    }

    @Get()
    getUnits(@Query(ValidationPipe) getUnitsFilterDto: GetUnitsFilterDto): Promise<Unit[]>{
        return this.unitsService.getUnits(getUnitsFilterDto);
    }

    @Post()
    // @UseGuards(AuthGuard())
    createUnit(@Body(ValidationPipe) createUnitDto: CreateUnitDto): Promise<Unit> {
        return this.unitsService.createUnit(createUnitDto);
    }
}
