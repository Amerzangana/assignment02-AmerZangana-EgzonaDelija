import { APIRequest, APIRequestContext } from "@playwright/test";

export class APIHelper{
    private baseUrl: string;

    constructor(baseUrl: string){
        this.baseUrl = baseUrl;
    }
    
    // post, get, put, delete
    async getAllPosts(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/posts`);
        return response;
    }

async createpost(request: APIRequestContext, payload: object){
    const response = await request.post(`${this.baseUrl}/posts`, {
        data: JSON.stringify(payload), 
    })
    return response;
    }
}
