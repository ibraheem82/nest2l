import { Controller, Get, Param, ParseIntPipe, Post, Query, HttpCode, HttpStatus, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interface/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistsPipe } from './pipes/post-exists.pipe';

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
    findOne(@Param('id', ParseIntPipe, PostExistsPipe) id: number): PostInterface {
        return this.postsService.findOne(id);
    }

    // @Post('create')
    @Post('')
    @HttpCode(HttpStatus.CREATED)
    // create(@Body() createPostData: Omit<PostInterface, 'id' | 'created'>): PostInterface {
    // @UsePipes(new ValidationPipe({
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //     transform: true,
    //     disableErrorMessages: false
    // }))
    create(@Body() createPostData: CreatePostDto): PostInterface {
        return this.postsService.create(createPostData)
    }
    @Put(':id')
    update(
        @Param('id', ParseIntPipe, PostExistsPipe) id: number,
        // @Body() updatePostData: Partial<Omit<PostInterface, 'id' | 'createdAt'>>,
        @Body() updatePostData: UpdatePostDto,
    ): PostInterface {
        return this.postsService.update(id, updatePostData);
    }


    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe, PostExistsPipe) id: number): void {
        this.postsService.remove(id);
    }
}
