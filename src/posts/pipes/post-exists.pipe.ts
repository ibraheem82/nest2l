import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from "@nestjs/common"
import { PostsService } from "../posts.service"

@Injectable()
// * Every pipe in NestJS must implement this interface. It forces you to write the transform() method.
export class PostExistsPipe implements PipeTransform {
  constructor(private readonly postsService : PostsService){}

  /* 
    This is the method that runs every time a request comes in.

value: This is the data being validated (likely the id from the URL, e.g., /posts/123).

metadata: Contains info about the argument (rarely used in simple pipes).
In NestJS, ArgumentMetadata is an object that provides context about the data your pipe is currently processing.

Think of the transform(value, metadata) method like a border control checkpoint:

value: This is the actual person (or data) trying to pass through (e.g., "123" or { title: "Hello" }).

metadata: This is their passport. It tells you who they claim to be, where they are coming from, and what type they are supposed to be.

  */

  transform(value: any, metadata: ArgumentMetadata) {
    try{
      this.postsService.findOne(value)
    }catch(e){
      throw new NotFoundException(`Post with ID ${value} not found 💣💣💣`)
    }
    return value
  }
}