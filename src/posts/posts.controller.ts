import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Comment, Posts } from './post.interface';
import { log } from 'node:console';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1. Read all posts   /// already add type interface
  @Get()
  findAllPosts(): Posts[] {
    return this.postsService.findAll();
  }

  // 2. Read a specific post by postId   // aleady add type interface
  @Get(':id')
  findPostById(@Param('id') postId: string): Posts {
    return this.postsService.findOne(+postId);
  }

  // 3. Update a post by postId
  @Put(':id')
  updatePost(
    @Param('id') postId: number,
    @Body()
    updateData: Partial<{
      name: string;
      category: string;
      title: string;
      description: string;
    }>,
  ): Posts {
    const updatedPostData = {
      ...updateData,
      timestamp: new Date().toISOString(),
    };
    return this.postsService.updatePost(+postId, updatedPostData);
  }

  // 3.1 Add a comment to a specific post
  @Post(':id/comments')
  addCommentToPost(
    @Param('id') postId: string,
    @Body() comment: { author: string; content: string },
  ) {
    return this.postsService.addComment(+postId, comment);
  }

  // 4 Created new Post
  @Post()
  createPost(
    @Body()
    postData: {
      name: string;
      category: string;
      title: string;
      description: string;
      avatar?: string;
    },
  ): Posts {
    return this.postsService.create(postData);
  }

  // 5. Delete a post by ID
  @Delete(':id')
  deletePost(@Param('id') postId: number) {
    console.log(`Recived ID to request delete post,${postId}`);
    return this.postsService.deletePost(+postId);
  }
}
