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
import {CreateUnitDto} from "./dto/create-unit.dto";
import {UnitsService} from "./units.service";
import {Unit} from "./unit.entity";
import {GetUnitsFilterDto} from "./dto/get-units-filter.dto";
import {AuthGuard} from '@nestjs/passport';
import {RightsGuard} from '../guards/rights.guard';
import {RightsAllowed} from '../guards/rights-allowed.decorator';
import {RightsTag} from '../rights/config/rights.list';
import {GetUser} from '../users/utils/get-user.decorator';
import {User} from '../users/user.entity';


@Controller('units')
export class UnitsController {

    constructor(private unitsService: UnitsService) {
    }

    @Get()
    listUnits(@Query(ValidationPipe) getUnitsFilterDto: GetUnitsFilterDto): Promise<Unit[]>{
        return this.unitsService.getUnits(getUnitsFilterDto);
    }

    @Get('/:id/master_unit')
    getMasterUnit(@Param('id', ParseIntPipe) id: number): Promise<Unit> {
        return this.unitsService.findMasterUnit(id);
    }

    @Post()
    @UseGuards(AuthGuard(), RightsGuard)
    @RightsAllowed(RightsTag.createUnits)
    createUnit(@Body(ValidationPipe) createUnitDto: CreateUnitDto, @GetUser() user: User): Promise<Unit> {
        return this.unitsService.createUnit(createUnitDto, user);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard(), RightsGuard)
    @RightsAllowed(RightsTag.deleteUnits)
    deleteUnit(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
        return this.unitsService.deleteUnit(id, user);
    }

    @Post('/:idUnit/managers/:idUser')
    @UseGuards(AuthGuard(), RightsGuard)
    @RightsAllowed(RightsTag.addManagerToUnits)
    addManager(@Param('idUnit', ParseIntPipe) idUnit: number, @Param('idUser', ParseIntPipe) idUser: number, @GetUser() user: User): Promise<void> {
        return this.unitsService.addManager(idUnit, idUser, user);
    }

    @Delete('/:idUnit/managers/:idUser')
    @UseGuards(AuthGuard(), RightsGuard)
    @RightsAllowed(RightsTag.removeManagerFromUnits)
    removeManager(@Param('idUnit', ParseIntPipe) idUnit: number, @Param('idUser', ParseIntPipe) idUser: number, @GetUser() user: User): Promise<void> {
        return this.unitsService.removeManager(idUnit, idUser, user);
    }


}
