import { APIRequest, APIRequestContext } from "@playwright/test";

export class APIHelper{
    private baseUrl: string;
    private username: string;
    private token: string;

    constructor(baseUrl: string){
        this.baseUrl = baseUrl;
    }


    async login(request: APIRequestContext) {
        const response = await request.post(`${this.baseUrl}/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                username: `${process.env.TEST_USERNAME}`,
                password: `${process.env.TEST_PASSWORD}`
            })
        });
        const responsData = await response.json();
        console.log(responsData);
        this.username = responsData.username;
        this.token = responsData.token;
        return response;
    }

    async getAllRooms(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/rooms`, 
            {
            headers: {
                'Content-Type': 'application/json',
                'x-user-auth': JSON.stringify({
                    username: this.username,
                    token: this.token
                })
            }}
        );
        return response;
    }


    async getRoomByID(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/rooms/1`);
        return response;
    }

    async createRoom(request: APIRequestContext, payload: object) {
        const response = await request.post(`${this.baseUrl}/room/new`, {
            data: payload,
        });
        return response;
    }





    async updateRoom(request: APIRequestContext) {
        const response = await request.put(`${this.baseUrl}/room/1`);
        return response;
    }

    async deleteRoom(request: APIRequestContext) {
        const response = await request.delete(`${this.baseUrl}/room/2`);
        return response;
    }



    // post, get, put, delete
    async getAllPosts(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/posts`);
        return response;
    }

    async getByID(request: APIRequestContext, postId: number) {
        const response = await request.get(`${this.baseUrl}/posts/${postId}`);
        return response;
    }

async createpost(request: APIRequestContext, payload: object){
    const response = await request.post(`${this.baseUrl}/posts`, {
        data: JSON.stringify(payload), 
    })
    return response;
    }

    async deletePost(request: APIRequestContext, postId:number){
        const response = await request.delete(`${this.baseUrl}/posts/${postId}`, );
        return response;

    }
}








