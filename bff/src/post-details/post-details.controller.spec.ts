import { Test, TestingModule } from '@nestjs/testing';
import { PostDetailsController } from './post-details.controller.js';

describe('PostDetailsController', () => {
  let controller: PostDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostDetailsController],
    }).compile();

    controller = module.get<PostDetailsController>(PostDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
