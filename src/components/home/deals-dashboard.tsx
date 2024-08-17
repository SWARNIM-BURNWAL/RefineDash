import React from "react";
import { Card } from "antd";
import { Text } from "../text";
import { Area, AreaConfig } from "@ant-design/plots";
import { useList } from "@refinedev/core";
import { mapDealsData } from "@/utilities/helpers";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { DashboardDealsChartQuery } from "@/graphql/types";
import { DollarOutlined } from "@ant-design/icons";
import { DASHBOARD_DEALS_CHART_QUERY } from "@/graphql/queries";

const DealsDashboard = () => {
  const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
    resource: "dealStages",

    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
    },
  });
  const dealsData = React.useMemo(() => {
    return mapDealsData(data?.data);
  }, [data?.data]);

  const config: AreaConfig = {
    data: dealsData,
    xField: "timeText",
    yField: "value",
    shapeField: "smooth",

    colorField: "state",
    stack: false,
    seriesField: "state",
    style: {
      fillOpacity: 0.5,
      stroke: "white",
    },
    legend: {
      offsetY: -6,
    },

    axis: {
      y: {
        labelFormatter: (v: number) => {
          return Number(v / 100000) + "M";
        },
      },
    },
  };
  return (
    <Card
      style={{
        height: "100%",
      }}
      styles={{
        body: {
          padding: "24px 24px 0 24px",
        },
        header: {
          padding: "8px 16px",
        },
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <DollarOutlined />

          <Text style={{ marginLeft: "0.5rem" }}>Deals Dasboard</Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  );
};

export default DealsDashboard;
