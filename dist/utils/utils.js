"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils = {
    convertSecondsToTimeString(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}분 ${remainingSeconds}초`;
    },
    convertTimestampToDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }
};
exports.default = Utils;
//# sourceMappingURL=utils.js.map