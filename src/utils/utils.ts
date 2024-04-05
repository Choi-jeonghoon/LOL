const Utils = {
  /**
   * 초를 시간 문자열 형식으로 변환합니다 (예: "5분 30초").
   * @param {number} seconds - 변환할 초 단위의 숫자입니다.
   * @returns {string} "분 초" 형식으로 포맷된 시간 문자열
   */
  convertSecondsToTimeString(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = Math.round(seconds % 60);
    return `${minutes}분 ${remainingSeconds}초`;
  },

  /**
   * 날짜와 시간 문자열로 변환합니다.
   * @param {number} timestamp - 변환할 타임스탬프입니다.
   * @returns {string} 날짜와 시간 문자열
   */
  convertTimestampToDate(timestamp: number): string {
    const date: Date = new Date(timestamp);
    return date.toLocaleString(); // 현지 시간 문자열로 변환
  },
};

export default Utils;
