export interface Comment {
  commentId: number;
  author: string;
  content: string;
  timestamp: string;
}

export interface Posts {
  postId: number;
  name: string;
  category: string;
  title: string;
  description: string;
  comments: Comment[];
  avatar?: string;
  timestamp: string;
}
