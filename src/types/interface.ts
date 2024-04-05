export interface DataType {
  nickname: string;
  matchData: MatchDataType;
}

export interface MatchDataType {
  metadata: {
    matchId: string;
    dataVersion: string;
    participants: string[];
  };
  info: InfoDataType;
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
  platformId: string;
  queueId: number;
  teams: TeamType[];
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
  challenges?: ChallengesType;
}
export interface ChallengesType {
  kda: number;
}

export interface TeamType {
  bans: BanType[];
  teamId: number;
  win: string;
  objectives: {
    baron: {
      first: boolean;
      kills: number;
    };
    champion: {
      first: boolean;
      kills: number;
    };
    dragon: {
      first: boolean;
      kills: number;
    };
    // horde: {
    //     first: boolean;
    //     kills: number;
    // };
    // inhibitor: {
    //     first: boolean;
    //     kills: number;
    // };
    // riftHerald: {
    //     first: boolean;
    //     kills: number;
    // };
    // tower: {
    //     first: boolean;
    //     kills: number;
    // };
  };
}

export interface BanType {
  championId: number;
  pickTurn: number;
}
