import { Handler } from 'express'

import { PostService } from '../Service/post.service'

export class PostController {
    private postService:PostService = new PostService()
    getPostFindAll:Handler = async (_req,res) => {
        res.json({
            post:(await this.postService.findAll()).post
        })
    }
}