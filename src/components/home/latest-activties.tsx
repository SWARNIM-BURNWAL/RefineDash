import { UnorderedListOutlined } from "@ant-design/icons";
import { Card, List, Space } from "antd";
import { Text } from "../text";
import dayjs from "dayjs";
import { LatesetActivitesSkeleton } from "..";
import { useList } from "@refinedev/core";
import {
  DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
  DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
} from "@/graphql/queries";
import CustomAvator from "../custom-avatar";

const LatestActivites = () => {
  const {
    data: audit,
    isLoading: isLoadingAudit,
    isError,
    error,
  } = useList({
    resource: `audits`,
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    },
  });
  const dealids = audit?.data.map((audit) => audit?.targetId);

  const { data: deals, isLoading: isLoadingDeal } = useList({
    resource: `deals`,
    queryOptions: {
      enabled: !!dealids?.length,
    },
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
      variables: {
        filter: {
          ids: dealids,
        },
      },
    },
  });

  if (isError) {
    console.log(error);
    return null;
  }
  const isLoading = isLoadingAudit || isLoadingDeal;

  return (
    <Card
      styles={{
        header: {
          padding: "0px 16px",
        },
        body: {
          padding: "0 1rem",
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
          <UnorderedListOutlined />
          <Text size="sm" style={{ marginLeft: "0.5rem" }}>
            LatestActivities
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, i) => ({ id: i }))}
          renderItem={(_, i) => <LatesetActivitesSkeleton key={i} />}
        ></List>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={audit?.data}
          renderItem={(item) => {
            const deal =
              deals?.data.find((deal) => deal.id == item.targetId) || undefined;
            return (
              <List.Item>
                <List.Item.Meta
                  title={dayjs(deal?.createdAt).format("MMM DD YYYY-HH:mm:ss ")}
                  avatar={
                    <CustomAvator
                      shape="square"
                      size={48}
                      src={deal?.company.avatarUrl}
                      name={deal?.company.name}
                    />
                  }
                  description={
                    <Space size={4}>
                      <Text strong>{item.user?.name}</Text>
                      <Text>
                        {item.action === "CREATE" ? "created" : "moved"}
                      </Text>
                      <Text>deal</Text>
                      <Text>{item.action === "CREATE" ? "in" : "to"}</Text>
                        <Text>{deal?.stage?.title}</Text>   
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        ></List>
      )}
    </Card>
  );
};

export default LatestActivites;
