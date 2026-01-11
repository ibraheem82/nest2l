


// * a DTO is a class that defines exactly what data users are allowed to send to your application. It acts as a strict contract or a "security guard" for your API.

import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
  // --- Title Field  ---
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  @MaxLength(50, { message: 'Title can not be longer than 50 characters' })
  title: string;

  // --- Content Field ---
  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  @MinLength(5, { message: 'Content must be at least 5 characters long' })
  content: string;

  // --- Author Field  ---
  @IsNotEmpty({ message: 'Author is required' })
  @IsString({ message: 'Author must be a string' })
  @MinLength(2, { message: 'Author must be at least 2 characters long' })
  @MaxLength(25, { message: 'Author name can not be longer than 25 characters' })
  authorName: string;
}