import { List, CreateButton, FilterDropdown } from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import { useTable } from "@refinedev/antd";
import { Table, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { COMPANIES_LIST_QUERY } from "@/graphql/queries";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { CompaniesListQuery } from "@/graphql/types";
import { Text } from "@/components/text";
import { EditButton, DeleteButton } from "@refinedev/antd";
import { currencyNumber } from "@/utilities";
import CustomAvator from "@/components/custom-avatar";

type Company = GetFieldsFromList<CompaniesListQuery>;

export const Companies = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: "companies",
    onSearch: (values: any) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values.name,
        },
      ];
    },
    pagination: {
      pageSize: 10,
    },
    sorters: {
      initial: [{ field: "createdAt", order: "desc" }],
    },
    filters: {
      initial: [
        {
          field: "name",
          operator: "contains",
          value: undefined,
        },
      ],
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });
  return (
    <>
      <List
        breadcrumb={false}
        headerButtons={() => {
          return (
            <CreateButton
              onClick={() => {
                go({
                  to: {
                    resource: "companies",
                    action: "create",
                  },
                  options: {
                    keepQuery: true,
                  },
                  type: "replace",
                });
              }}
            />
          );
        }}
      >
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
          }}
        >
          <Table.Column<Company>
            dataIndex="name"
            title="Comapny Tittle"
            defaultFilteredValue={getDefaultFilter("id", filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search Company" />
              </FilterDropdown>
            )}
            render={(_value, record) => (
              <Space>
                <CustomAvator
                  shape="square"
                  name={record.name}
                  src={record.avatarUrl}
                />
                <Text style={{ whiteSpace: "nowrap" }}>{record.name}</Text>
              </Space>
            )}
          />
          <Table.Column<Company>
            dataIndex="totalRevenue"
            title="Opens Deals Amount"
            render={(value, company) => (
              <Text>
                {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
              </Text>
            )}
          />
          <Table.Column<Company>
            dataIndex="id"
            title="Action"
            fixed="right"
            render={(value, record) => (
              <Space>
                <EditButton hideText recordItemId={value} />
                <DeleteButton hideText recordItemId={value} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </>
  );
};
