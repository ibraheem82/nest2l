import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interface/post.interface';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  private readonly posts: Post[] = [
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

  findAll(): Post[] {
    return this.posts
  }


  findOne(id: number): Post {
    const singlePost = this.posts.find((post) => post.id === id);

    if (!singlePost) {
      throw new NotFoundException(`Post with ID ${id} is not found`);
    }

    return singlePost;
  }

  // TypeScript utility type that says "Take the Post type, but remove id and createdAt properties

  /*
    "Take the Post type, but remove the id and createdAt properties."

Why? The user shouldn't choose the ID or the creation time—the system (this method) is responsible for generating those.
  */
  create(createPostData: Omit<Post, 'id' | 'createdAt'>): Post {
    const newPost: Post = {
      id: this.getNextId(),
      ...createPostData, // Spread user-provided data
      createdAt: new Date(), // Add timestamp
    };

    this.posts.push(newPost);
    return newPost;
  }

  /*
  This generates the next available ID:

If there are no posts → returns 1

If there are posts → finds the maximum ID and adds 1

*/
  private getNextId(): number {
    return this.posts.length > 0
      ? Math.max(...this.posts.map((post) => post.id)) + 1
      : 1;
  }


  /*
  Partial<...>: This says, "Take whatever is left, and make all fields optional."

Why? A user might want to fix a typo in the title without having to re-send the entire content or authorName.

Result: The user can send { title: "New Title" } and nothing else, and TypeScript will accept it.

* Partial allows you to say: "I accept an object that looks like a Post, but I don't require the whole Post."

  */

  update(id: number, updatePostData: Partial<Omit<Post, 'id' | 'createdAt'>>): Post {
    const currentPostIndexToEdit = this.posts.findIndex(post => post.id === id);

    if (currentPostIndexToEdit === -1) {
      throw new NotFoundException(`Post with ID ${id} is not found`)
    }


    /* 
    * First, spread (copy) all existing properties of the old post.

...updatePostData: Second, spread the new properties.

Because updatePostData comes second, any keys inside it will overwrite the matching keys from the old post.
    */

    this.posts[currentPostIndexToEdit] = {
      ...this.posts[currentPostIndexToEdit],
      ...updatePostData,
      updatedAt: new Date()
    }
    return this.posts[currentPostIndexToEdit];
  }


  /*
  
  
    splice(start, deleteCount): This is a JavaScript array method that modifies the array in place (mutates it).
  
  currentPostIndexToDelete: The starting point (e.g., index 3).
  
  1: The number of items to remove.
  
  Result: The array is now one item shorter, and the gap is closed up.
    */

  remove(id: number): { message: string } {
    const currentPostIndexToDelete = this.posts.findIndex(
      (post) => post.id === id,
    );
    if (currentPostIndexToDelete === -1) {
      throw new NotFoundException(`Post with ID ${id} is not found`);
    }

    this.posts.splice(currentPostIndexToDelete, 1);

    return { message: `Post with ID ${id} has been deleted` };
  }
}
