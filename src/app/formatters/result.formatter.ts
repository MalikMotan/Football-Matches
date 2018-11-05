class ResultFormatter {

  public static getResult(match: any, type: string): number | null {

    return type === 'home' ? match.score.fullTime.homeTeam : match.score.fullTime.awayTeam;
  }
}

export default ResultFormatter;
