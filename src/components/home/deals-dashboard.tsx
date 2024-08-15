import Icon from "@ant-design/icons/lib/components/Icon";
import { Card } from "antd";
import { Text } from "../text";
import { Area, AreaConfig } from "@ant-design/plots";
import { useList } from "@refinedev/core";
import { DASHBOARD_DEALS_CHART_QUERY } from "@/graphql/queries";
import { mapDealsData } from "@/utilities/helpers";
import React from "react";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { DashboardDealsChartQuery } from "@/graphql/types";


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
    style:{
        fillOpacity: 0.5,
        stroke: 'white',

    },
    legend:{
        offsetY: -6,
    },
     
    axis:{
        y: {
            labelFormatter: (v:number) => {    
                return (Number(v/100000)) + 'M';
            }
        }
    },
    
    
    
  };
  return (
    <Card
      style={{
        height: "100%",
      }}
      headStyle={{ padding: "8px 16px" }}
      bodyStyle={{ padding: "24px 24px 0 24px" }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Icon
            component={() => (
              <img
                src="rupee.svg"
                alt="custom-icon"
                style={{ width: "1em", height: "1em" }}
              />
            )}
          />
          <Text style={{ marginLeft: "0.5rem" }}>Deals Dasboard</Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  );
};

export default DealsDashboard;
