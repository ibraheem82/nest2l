

import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdatePostDto {

  // --- Title Field  ---
  // ! It tells the validator: "If this field is missing (undefined) or null, skip all the other checks and just let it pass."
  @IsOptional()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(50, { message: 'Title can not be longer than 50 characters' })
  title?: string;

  // --- Content Field ---
  @IsOptional()
  @IsNotEmpty({ message: 'Content is required' })
  @IsString({ message: 'Content must be a string' })
  @MinLength(5, { message: 'Content must be at least 5 characters long' })
  content?: string;

  // --- Author Field  ---
  @IsOptional()
  @IsNotEmpty({ message: 'Author is required' })
  @IsString({ message: 'Author must be a string' })
  @MinLength(2, { message: 'Author must be at least 2 characters long' })
  @MaxLength(25, { message: 'Author name can not be longer than 25 characters' }) 
  // ! t this property might not exist, so it doesn't yell at you when you try to access it later.
  authorName?: string;
}