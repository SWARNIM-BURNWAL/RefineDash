import { totalCountVariants } from "@/constants";
import { Card, Skeleton } from "antd";
import { Text } from "../text";
import { Area, AreaConfig } from "@ant-design/plots";
type Props = {
  resource: "companies" | "contacts" | "deals";
  isLoading: boolean;
  totalCount?: number;
};

const TotalCountCard = ({ resource, isLoading, totalCount }: Props) => {
  const { primaryColor, secondaryColor, icon, title } =
    totalCountVariants[resource];

  const config: AreaConfig = {
    style: {
      height: "48px",
      width: "100%",

      fill: primaryColor,
    },

    padding: 0,

    data: totalCountVariants[resource].data,
    autoFit: true,
    tooltip: false,

    xField: "index",
    yField: "value",
    label: {
      style: {
        fill: "transparent",
      },
    },
    line: {
      color: primaryColor,
    },
    shapeField: "smooth",
    axis: false,
    area: {
      style: {
        fill: `l(270) 0:${primaryColor} 1:${secondaryColor}`,
        
      },
    },
  };

  return (
    <Card
      styles={{
        body: {
          padding: "8px 8px 8px 12px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        },
      }}
      size="small"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
          }}
        >
          {icon}
          <Text className="secondary" style={{ marginLeft: "8px" }}>
            {title}
          </Text>
        </div>

        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "60px",
            }}
          >
            <Skeleton.Button style={{ marginLeft: "48px", marginTop: "8px" }} />
          </div>
        ) : (
          <Text
            strong
            style={{
              fontSize: 38,
              textAlign: "start",
              marginLeft: "48px",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {totalCount}
          </Text>
        )}
      </div>
      <div
        style={{
          marginTop: "auto",
          marginLeft: "auto",
          width: "110px",
        }}
      >
        <Area {...config} height={100} width={120} />
      </div>
    </Card>
  );
};

export default TotalCountCard;
