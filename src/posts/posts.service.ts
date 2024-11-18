import { Injectable, NotFoundException } from '@nestjs/common';
import { Posts, Comment } from '../posts/post.interface';

@Injectable()
export class PostsService {
  private posts: Posts[] = [
    {
      postId: 1,
      name: 'Wittawat',
      category: 'History',
      title: 'The Beginning of the End of the World',
      description:
        'The afterlife sitcom The Good Place comes to its culmination...',
      comments: [
        {
          commentId: 1,
          author: 'Alice',
          content: 'Great post!',
          timestamp: '2024-11-15T10:00:00Z',
        },
        {
          commentId: 2,
          author: 'Bob',
          content: 'Very insightful.',
          timestamp: '2024-11-15T10:30:00Z',
        },
      ],
      avatar: '/avatar/wit.png',
      timestamp: '2024-11-15T09:00:00Z',
    },
    {
      postId: 2,
      name: 'Zach',
      category: 'History',
      title: 'The Big Short War',
      description:
        'Tall, athletic, handsome with cerulean eyes, he was the kind acere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem ',
      comments: [],
      avatar: '/avatar/zazch.jpeg',
      timestamp: '2024-11-14T15:00:00Z',
    },
    {
      postId: 3,
      name: 'Jessica',
      category: 'Exercise',
      title: 'The Mental Health Benefits of Exercise',
      description:
        'You already know that exercise is good for your body. But did you know it can also boost your mood..',
      comments: [
        {
          commentId: 1,
          author: 'Emma',
          content:
            'unde omnis iste natus error saspernatur aut odit aut fugit, sed quia consequuntur magni d',
          timestamp: '2024-11-15T09:45:00Z',
        },
        {
          commentId: 2,
          author: 'Wason',
          content: 'This is so inspiring!',
          timestamp: '2024-09-15T09:45:00Z',
        },
      ],
      avatar: '/avatar/jessica.jpeg',
      timestamp: '2024-11-13T11:30:00Z',
    },
    {
      postId: 4,
      name: 'Carl',
      category: 'History',
      title: 'What Makes a Man Betray His Country?',
      description:
        'The life of Adolf Tolkachev, Soviet dissident and CIA spy  acere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et ',
      comments: [
        {
          commentId: 1,
          author: 'John',
          content:
            'A compelling read. acere possimus, omnis volrerum necessitatibus saepe ev',
          timestamp: '2024-11-14T20:15:00Z',
        },
        {
          commentId: 2,
          author: 'Sophia',
          content:
            'Well-written and informative acere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis',
          timestamp: '2024-11-16T21:00:00Z',
        },
        {
          commentId: 3,
          author: 'Sopit',
          content:
            ' eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."',
          timestamp: '2024-11-15T21:00:00Z',
        },
      ],
      avatar: '/avatar/carl.png',
      timestamp: '2024-11-12T08:00:00Z',
    },
  ];

  //  1 . Get all posts
  findAll(): Posts[] {
    console.log(`Total number of posts found: ${this.posts.length}`);

    //desencding sort
    const sortedPosts = this.posts.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
    return sortedPosts;
  }

  // 2. Get a single post by ID
  findOne(postId: number): Posts {
    console.log(`Check post Id before find specfific  ${postId}`);
    const post = this.posts.find((p) => p.postId === postId);
    if (!post) {
      console.error(`Post with ID ${postId} not found`);
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    console.log(`Post found: ${JSON.stringify(post)}`);
    return post;
  }

  // 3. Update a post by ID
  updatePost(
    postId: number,
    updateData: Partial<{
      name: string;
      category: string;
      title: string;
      description: string;
      timestamp: string;
    }>,
  ) {
    const postIndex = this.posts.findIndex((p) => p.postId === postId);

    if (postIndex === -1) {
      console.error(`Post with ID ${postId} not found`);
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    console.log(
      `Updating post with ID ${postId}. Current data:`,
      this.posts[postIndex],
    );

    this.posts[postIndex] = { ...this.posts[postIndex], ...updateData };

    console.log(
      `Post with ID ${postId} successfully updated to:`,
      this.posts[postIndex],
    );

    return this.posts[postIndex];
  }

  // 3.1 Add a comment to a post
  addComment(
    postId: number,
    comment: { author: string; content: string },
  ): { commentId: number; author: string; content: string; timestamp: string } {
    const post = this.findOne(postId);

    if (!post) {
      console.error(`Post ID ${postId} not found`);
      throw new NotFoundException(`Post ID ${postId} not found`);
    }

    const newComment = {
      commentId: post.comments.length + 1,
      ...comment,
      timestamp: new Date().toISOString(),
    };
    post.comments.push(newComment);
    console.log(`New comment added to post ID ${postId}:`, newComment);

    return newComment;
  }

  //4 Create new post
  create(postData: {
    name: string;
    category: string;
    title: string;
    description: string;
    avatar?: string;
  }) {
    try {
      const newPost = {
        ...postData,
        postId: this.posts.length + 1,
        comments: [],
        timestamp: new Date().toISOString(),
      };
      console.log('Create new postadata', JSON.stringify(newPost));
      this.posts.push(newPost);
      console.log('Post Successfully added');
      return newPost;
    } catch (e) {
      console.log('Error post data ', e.message);
      throw new Error('Failed to create post');
    }
  }

  // 5. Delete a post by ID
  deletePost(postId: number) {
    try {
      const postIndex = this.posts.findIndex((p) => p.postId === postId);
      if (postIndex === -1) {
        throw new NotFoundException(`Post with ID ${postId} not found`);
      }
      const deletedPost = this.posts.splice(postIndex, 1);
      console.log(
        `Successfully deleted post: ${JSON.stringify(deletedPost[0])}`,
      );
      return deletedPost[0];
    } catch (e) {
      console.log('Error to Delete Post ', e);
      throw e;
    }
  }
}
