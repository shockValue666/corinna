"use server";
import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config();

export const onGetBlogPosts = async (): Promise<{title:string, id:string, image:string, content:string, createdAt:Date}[] | undefined> => {
    try {
        const postarray:{
            id:string,
            title:string,
            image:string,
            content:string,
            createdAt:Date
        }[] = []
        const posts = await axios.get(process.env.CLOUDWAYS_POSTS_URL!)
        // console.log("posts: ",posts.data)

        const featuredImages = process.env.CLOUDWAYS_FEATURED_IMAGES_URL!
        let i = 0;
        while(i<posts.data.length){
            const image = await axios.get(featuredImages)
            // console.log("image: ",image.data)
            if(image){
                const post:{
                    id:string,
                    title:string,
                    image:string,
                    content:string,
                    createdAt:Date
                } | undefined = {
                    id:posts.data[i].id,
                    title:posts.data[i].title.rendered,
                    image:image.data[i].media_details.file,
                    content:posts.data[i].content.rendered,
                    createdAt:new Date(posts.data[i].createdAt)
                }

                postarray.push(post)
            }
            i++;
        }

        if(posts.data){
            return postarray;
        }
    } catch (error) {
        console.log("error getting posts and featured images: ",error)
        return undefined;
    }
    return undefined;
}

export const onGetBlogPost = async (id:string) => {
    try {
        const post = await axios.get(`${process.env.CLOUDWAYS_POSTS_URL!}/${id}`)
        // console.log("post: ",post)
        if(post.data){
            const author = await axios.get(`${process.env.CLOUDWAYS_USERS_URL!}/${post.data.author}`)
            if(author.data){
                return {
                    id:post.data.id,
                    title:post.data.title.rendered,
                    content:post.data.content.rendered,
                    createdAt:new Date(post.data.date),
                    author:author.data.name
                }
            }
        }
    } catch (error) {
        console.log("error fetching singe post and/or author: ",error)
    }
}