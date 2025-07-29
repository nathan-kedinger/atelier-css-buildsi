import { ref } from 'vue'
import type { Statistic } from '@/modules/charts/type/statistics.ts'

export function getStatisticValues() {
  const statisticValues = ref<Statistic[]>([])

  function getLast31Days(): string[] {
    const dates: string[] = [];
    const today = new Date();

    for (let i = 0; i < 31; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().slice(0, 10));
    }
    return dates;
  }

  function getRandomCount(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateLast31DaysStatistics() {
    const dates = getLast31Days();

    statisticValues.value = dates.map((date) => ({
      date,
      count: getRandomCount(10, 100),
    }));
  }
  return {
    generateLast31DaysStatistics,
    statisticValues,
  }
}
