export interface DataType {
    nickname: string;
    matchData: MatchDataType;
}
export interface MatchDataType {
    metadata: MatchDataType2;
    info: InfoDataType;
}
export interface MatchDataType2 {
    dataVersion: string;
    matchId: string;
    participants: string[];
}
export interface InfoDataType {
    gameCreation: string;
    gameEndTimestamp: string;
    gameDuration: string;
    gameId: number;
    gameMode: string;
    gameName: string;
    gameStartTimestamp: number;
    gameType: string;
    participants: ParticipantType[];
}
export interface ParticipantType {
    teamId: number;
    puuid: string;
    summonerId: string;
    summonerLevel: number;
    summonerName: string;
    championName: string;
    championId: number;
    lane: string;
    teamPosition: string;
    goldEarned: number;
    assists: number;
    deaths: number;
    kills: number;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
}
export interface challengesType {
    kda: number;
}
