export interface Statistic {
  date: string;
  count: number;
}

export interface StatisticCollection {
  exampleStatistics: Statistic[];
}
