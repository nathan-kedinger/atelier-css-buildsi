import { ref } from 'vue'

export function useCircularChart() {
  const circularChartData = ref()
  const circularChartOptions = ref()
  const firstCircularChartValue = ref<number>(35);
  const secondCircularChartValue = ref<number>(65);

  const setCircularChartData = (dataUsed: number, dataLeft: number) => {
    const documentStyle = getComputedStyle(document.body)

    return {
      labels: ['first', 'second'],
      datasets: [
        {
          data: [dataUsed, dataLeft],
          backgroundColor: [
            documentStyle.getPropertyValue('--p-red-500'),
            documentStyle.getPropertyValue('--p-green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--p-red-400'),
            documentStyle.getPropertyValue('--p-green-400'),
          ],
        },
      ],
    }
  }

  const setCircularChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--p-text-color')

    return {
      plugins: {
        legend: {
          labels: {
            cutout: '60%',
            color: textColor,
          },
        },
      },
    }
  }
  return {
    circularChartData,
    circularChartOptions,
    firstCircularChartValue,
    secondCircularChartValue,
    setCircularChartData,
    setCircularChartOptions,
  }
}
