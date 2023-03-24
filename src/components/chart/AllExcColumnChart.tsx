import ApexChart from "react-apexcharts";

interface IProps {
  visible?: boolean;
  counts?: number[];
  categories?: string[];
}

const AllExcColumnChart = ({ counts, categories }: IProps) => {
  return (
    <ApexChart
      type="bar"
      series={[{ data: counts ? counts : [null] }]}
      options={{
        plotOptions: {
          bar: {
            borderRadius: 4,
            dataLabels: {
              position: "top", // top, center, bottom
            },
          },
        },
        xaxis: {
          categories,
          position: "bottom",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      }}
      title={{
        title: {
          text: "Monthly Inflation in Argentina, 2002",
          floating: true,
          offsetY: 330,
          align: "center",
          style: {
            color: "#723c3c",
          },
        },
      }}
      height={400}
    />
  );
};

export default AllExcColumnChart;
