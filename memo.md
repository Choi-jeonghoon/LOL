// memo.md

interface 파일 수정할때

participants 안에 있는 게임에 참여한 유저의 암호와 ID array
뽑을려면 아래껄로
export interface MatchDataType {
    matchId: string;
    dataVersion: string;
    // participants를 여기에서 제거합니다.
    info: InfoDataType;
}
또한 데이터를 추출하는 곳에서도 관련해서 뎁스바꿔줘야된다
.
process.services..ts 파일에서 데이터 조작하는부분에서 바꿔줘야된다.

private extractMatchData(
    nickname: string,
    matchData: MatchDataType,
  ): DataType {
    if (!matchData) {
      throw new Error('Metadata is missing in match data.');
    }
    const extractedData: DataType = {
      nickname,
      matchData: {
        matchId: matchData.matchId,
        dataVersion: matchData.dataVersion,
        info: {
          gameCreation: Utils.convertTimestampToDate(
            Number(matchData.info.gameCreation),
          ),
          gameEndTimestamp: Utils.convertTimestampToDate(
            Number(matchData.info.gameEndTimestamp),
          ),
          gameDuration: Utils.convertSecondsToTimeString(
            Number(matchData.info.gameDuration),
          ),
          gameId: matchData.info.gameId,
          gameMode: matchData.info.gameMode,
          gameName: matchData.info.gameName,
          gameStartTimestamp: matchData.info.gameStartTimestamp,
          gameType: matchData.info.gameType,
          participants: matchData.info.participants.map(
            (participant: ParticipantType) => ({
              teamId: participant.teamId,
              puuid: participant.puuid,
              summonerId: participant.summonerId,
              summonerLevel: participant.summonerLevel,
              summonerName: participant.summonerName,
              championName: participant.championName,
              championId: participant.championId,
              lane: participant.lane,
              teamPosition: participant.teamPosition,
              goldEarned: participant.goldEarned,
              assists: participant.assists,
              deaths: participant.deaths,
              kills: participant.kills,
              item0: participant.item0,
              item1: participant.item1,
              item2: participant.item2,
              item3: participant.item3,
              item4: participant.item4,
              item5: participant.item5,
              item6: participant.item6,
              kda: participant.challenges.kda,
            }),
          ),
        },
      },
    };