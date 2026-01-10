import { Injectable } from '@nestjs/common';
import { Post } from './interface/post.interface';

@Injectable()
export class PostsService {
    private posts: Post[]  = [
        {
    id: 1,
    title: "Getting Started with TypeScript",
    content: "TypeScript adds static typing to JavaScript, making it easier to catch errors early. In this post, we explore the basics of types, interfaces, and how to set up your first TS project.",
    authorName: "Chinedu Okeke",
    createdAt: new Date("2024-01-10T09:00:00.000Z"),
    updatedAt: new Date("2024-01-12T14:30:00.000Z")
  },
  {
    id: 2,
    title: "Understanding Flexbox Layouts",
    content: "Flexbox is a one-dimensional layout method for laying out items in rows or columns. We will cover justify-content, align-items, and how to create responsive navbars.",
    authorName: "Amina Yusuf",
    createdAt: new Date("2024-02-05T11:15:00.000Z")
  },
  {
    id: 3,
    title: "The Power of Tailwind CSS",
    content: "Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. Learn why utility classes are changing the way we style web apps.",
    authorName: "David Balogun",
    createdAt: new Date("2024-03-20T08:45:00.000Z"),
    updatedAt: new Date("2024-03-21T10:00:00.000Z")
  },
  {
    id: 4,
    title: "Node.js vs Python for Backend",
    content: "Choosing the right backend technology can be tough. We compare Node.js (JavaScript everywhere) and Python (great for data & AI) to help you decide which fits your project better.",
    authorName: "Sarah Johnson",
    createdAt: new Date("2024-04-15T13:20:00.000Z")
  },
  {
    id: 5,
    title: "Deploying to ClawCloud",
    content: "Deploying your full-stack app shouldn't be a headache. This guide walks you through setting up a CI/CD pipeline to deploy your Node.js and PostgreSQL app directly to ClawCloud.",
    authorName: "Emeka Nnamdi",
    createdAt: new Date("2024-05-01T16:50:00.000Z"),
    updatedAt: new Date("2024-05-05T09:10:00.000Z")
  }
    ];

    findAll() : Post[]{
        return this.posts
    }
}
