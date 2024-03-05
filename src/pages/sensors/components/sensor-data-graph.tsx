import { totalCountVariants } from "@/constants";
import { Card, Skeleton } from "antd";
import { Text } from "../../../components/text";
import { Area, AreaConfig } from "@ant-design/plots";
import { SensorData } from "@/graphql/schema.types";

type Props = {
  data: SensorData[];
  isLoading: boolean;
};

const SensorDataGraph = ({ data, isLoading }: Props) => {
  const { primaryColor, secondaryColor, icon } = totalCountVariants["sensors"];

  const graphData = data.map((item) => {
    const date = new Date(Number(item.ts));
    const timeString = date.toLocaleString("en-US", {
      weekday: "short", // "Mon"
      hour: "2-digit", // "14"
      minute: "2-digit", // "32"
      second: "2-digit", // "21"
      hour12: false,
    });

    return {
      ts: timeString,
      value_string: Number(item.value_string),
    };
  });

  const config: AreaConfig = {
    data: graphData,
    xField: "ts",
    yField: "value_string",
    syncViewPadding: true,
    autoFit: true,
    tooltip: false,
    animation: false,
    xAxis: {
      range: [0, 1],
    },
    smooth: true,
    line: {
      color: primaryColor,
    },
    areaStyle: () => {
      return {
        fill: `l(270) 0:#fff 0.2${secondaryColor} 1:${primaryColor}`,
      };
    },
  };

  return <Area {...config} />;
};

export default SensorDataGraph;
