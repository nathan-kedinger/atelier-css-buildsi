import { ref } from 'vue'
import type { Statistic, StatisticCollection } from '@/exampleModules/charts/type/statistics'

export function useLinearChart() {

  const linearChartData = ref();
  const linearChartOptions = ref();
  const lastMonthDays = ref<string[]>([]);
  const eachLinearValues = Array.from({length: 31}, () => 0)
  const linearStat = ref<Statistic[]>([]);
  const linearStats = ref<StatisticCollection>({
    exampleStatistics: []
  });

  const setLinearChartData = (eachDayValue: number[]) => {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
      labels: lastMonthDays,
      datasets: [
        {
          label: 'First Dataset',
          data: eachDayValue,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
          tension: 0.4
        },
      ]
    }
  }
  const setLineChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }


  return {
    linearChartData,
    linearChartOptions,
    lastMonthDays,
    eachLinearValues,
    linearStat,
    linearStats,
    setLinearChartData,
    setLineChartOptions
  }
}
