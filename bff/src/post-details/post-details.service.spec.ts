import { Test, TestingModule } from '@nestjs/testing';
import { PostDetailsService } from './post-details.service.js';

describe('PostDetailsService', () => {
  let service: PostDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostDetailsService],
    }).compile();

    service = module.get<PostDetailsService>(PostDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
