import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { UsersIdService } from './usersId.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersIdService: UsersIdService) {}

  @Get(':id')
  find(
    @Param('id', ParseIntPipe) id: BFFPaths.Users$Id.Get.Parameters.Id,
  ): Promise<BFFPaths.Users$Id.Get.Responses.$200> {
    return this.usersIdService.find(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: BFFPaths.Users$Id.Put.Parameters.Id,
    @Body() body: BFFPaths.Users$Id.Put.RequestBody,
  ): Promise<BFFPaths.Users$Id.Put.Responses.$200> {
    return this.usersIdService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', ParseIntPipe) id: BFFPaths.Users$Id.Delete.Parameters.Id,
  ): Promise<BFFPaths.Users$Id.Delete.Responses.$204> {
    return this.usersIdService.remove(id);
  }
}
