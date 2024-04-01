import { Injectable } from "@nestjs/common";

@Injectable()
export class ApiService {
    constructor() { }

    async search(nickname: string): Promise<object> {
        return {
            닉네임: nickname,
            시작시간: '2029-01-01',
            끝난시간: '2030-01-01'
        };
    }

    async beError(): Promise<any> {
        throw new Error("에러임");
    }
}