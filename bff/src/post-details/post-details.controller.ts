import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostDetailsIdService } from './post-detailsId.service.js';

@Controller('post-details')
export class PostDetailsController {
  constructor(private readonly postDetailsIdService: PostDetailsIdService) {}

  @Get(':id')
  find(
    @Param('id', ParseIntPipe) id: BFFPaths.PostDetails$Id.Get.Parameters.Id,
  ): Promise<BFFPaths.PostDetails$Id.Get.Responses.$200> {
    return this.postDetailsIdService.find(id);
  }
}
