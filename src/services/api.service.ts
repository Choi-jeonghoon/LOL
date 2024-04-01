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

/**
 * @TODO
 * 1. API 키 발급받고 .env 작성
 * 2. 환경변수 api.service.ts 에서 불러오기
 * 3. 닉네임 검색하는 로직 작성
 * 4. 컨트롤러 작성하기 전에 TDD 방식이니 테스트코드 먼저 작성
 * 5. 올 패스 받으면 컨트롤러 작성
 * 6. POSTMAN으로 최종 테스트
 * 
 * 7. 그러고 나서 process.service 작성
 * ~~ 반복
 */