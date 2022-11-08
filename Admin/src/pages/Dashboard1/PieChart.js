import React from "react"
import ReactApexChart from "react-apexcharts"

const PieChart = (props) => {
  const series = props?.series
  const options = {
    labels: props?.labels,
    colors: ["#34c38f", "#5b73e8", "#f1b44c", "#50a5f1", "#f46a6a"],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      floating: false,
      fontSize: '14px',
      offsetX: 0
    },
    responsive: [{
      breakpoint: 600,
      options: {
        chart: {
          height: 240
        },
        legend: {
          show: !1
        },
      }
    }]
  }

  return (
    <ReactApexChart options={options} series={series} type="pie" height="320" className="apex-charts" />
  )
}

export default PieChart
