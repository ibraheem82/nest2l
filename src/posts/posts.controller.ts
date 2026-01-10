import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interface/post.interface';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    findAll(@Query('search') search?: string): PostInterface[] {
        const extraAllPosts = this.postsService.findAll();
        /*

            Get all posts:

        
        `GET /posts`
        Response: [{id: 1, title: "Hello World"}, {id: 2, title: "NestJS Tutorial"}]
        Search posts:

    
        `GET /posts?search=nest`
        Response: [{id: 2, title: "NestJS Tutorial"}]  // Only contains "nest"
        */


        if (search) {
            return extraAllPosts.filter((singlePost) =>
                singlePost.title.toLowerCase().includes(search.toLowerCase()),
            );
        }

        return extraAllPosts;
    }

    @Get(':id')
findOne(@Param('id', ParseIntPipe) id: number): PostInterface {
    return this.postsService.findOne(id);
}

}
