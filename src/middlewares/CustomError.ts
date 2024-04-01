export class CustomError extends Error {
  code?: number; // 선택적으로 코드를 저장할 수 있도록 정의
  constructor(message: string, code?: number) {
    super(message);
    this.name = 'CustomError';
    this.code = code; // 코드가 전달되면 저장
  }
}
