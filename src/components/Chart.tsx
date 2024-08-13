import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FC } from "react";
import { ChartProps } from "../types";
import { StyledChartWrapper } from "../styles";

const Chart: FC<ChartProps> = ({ categories, products, category }) => {
  const options = category
    ? {
        chart: {
          type: "column",
        },
        title: {
          text: "Products in selected category",
        },
        xAxis: {
          categories: products.map((product) => product.title),
        },
        yAxis: {
          title: {
            text: category,
          },
        },
        series: [
          {
            name: "Price",
            data: products.map((product) => product.price),
          },
        ],
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        accessibility: {
          enabled: false,
        },
      }
    : {
        chart: {
          type: "pie",
        },
        title: {
          text: "Categories",
        },
        yAxis: {
          title: {
            text: "",
          },
        },
        series: [
          {
            name: "Categories",
            data: categories.map((c) => ({
              name: c.name,
              y: 1,
            })),
            colorByPoint: true,
          },
        ],
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
          },
        },
        accessibility: {
          enabled: false,
        },
      };

  return (
    <StyledChartWrapper>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </StyledChartWrapper>
  );
};

export default Chart;
