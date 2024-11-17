import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from '../src/posts/posts.service';
import { NotFoundException } from '@nestjs/common';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a post', () => {
    const post = {
      name: 'Test User',
      category: 'Technology',
      title: 'Unit Testing with Jest',
      description: 'Learning how to test in NestJS',
    };

    const result = service.create(post);
    expect(result).toHaveProperty('postId');
    expect(result.title).toBe('Unit Testing with Jest');
  });

  it('should find all posts', () => {
    const posts = service.findAll();
    expect(posts).toBeInstanceOf(Array);
  });

  it('should find a post by ID', () => {
    const post = service.create({
      name: 'Test User',
      category: 'Technology',
      title: 'Test Post',
      description: 'Testing findOne method',
    });

    const foundPost = service.findOne(post.postId);
    expect(foundPost).toBeDefined();
    expect(foundPost.title).toBe('Test Post');
  });

  it('should throw an error if post not found', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('should update a post', () => {
    const post = service.create({
      name: 'Test User',
      category: 'Tech',
      title: 'Initial Title',
      description: 'Original description',
    });

    const updatedPost = service.updatePost(post.postId, {
      title: 'Updated Title',
    });

    expect(updatedPost.title).toBe('Updated Title');
  });

  it('should delete a post', () => {
    const post = service.create({
      name: 'Test User',
      category: 'Tech',
      title: 'Post to Delete',
      description: 'To be deleted',
    });

    const deletedPost = service.deletePost(post.postId);
    expect(deletedPost).toBeDefined();
    expect(() => service.findOne(post.postId)).toThrow(NotFoundException);
  });
});
