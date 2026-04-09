import type User from "./user.types";

export default interface Blog {
  id: number;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
}
