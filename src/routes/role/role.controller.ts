import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { successMessage } from '../../utils/responses';
import { Public } from '../../config/keys';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Public()
  @ApiOperation({ summary: 'Get all roles'})
  @Get()
  async findAll() {
    try{
      return successMessage('All roles', await this.roleService.findAll());
    }
    catch(err){
      throw err
    }
  }
}
