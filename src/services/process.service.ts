import { Injectable } from "@nestjs/common";

@Injectable()
export class ProcessService {
    constructor() { }

    async infoProcess(infoData: any): Promise<any> {
        console.log("값 확인", infoData)
        try {
            // ApiService로부터 받은 데이터(infoData)에서 원하는 데이터를 가공합니다.
            const processedData = this.processData(infoData);
            return processedData;
        } catch (error) {
            // 에러 처리 로직 추가
            console.error('데이터 가공 중 에러가 발생했습니다:', error);
            throw new Error('데이터 가공 중 에러가 발생했습니다.');
        }
    }

    processData(infoData: any): any {
        // ApiService에서 받은 데이터에서 'name'과 'id' 속성을 추출하여 가공합니다.
        const processedData = {
            id: infoData.id,
            puuid: infoData.puuid
        };
        console.log("가공된 데이터", processedData);
        return processedData;
    }
}
