import { Injectable } from "@nestjs/common";
import { ApiService } from "src/services/api.service";

@Injectable()
export class ProcessService {
    constructor(
        private readonly apiService: ApiService
    ) { }

    // DI(의존성 주입)은 이런식으로 쓰면 됨
    이거지워도댐() {
        this.apiService.beError
    }

    데이터가공하는함수로직() {
        return {
            가공된거: 'dd'
        }
    }
}