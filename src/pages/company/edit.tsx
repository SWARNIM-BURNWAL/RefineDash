import { Row, Col, Form, Select, InputNumber,Input } from "antd";
import { Edit, useForm } from "@refinedev/antd";
import { useSelect } from "@refinedev/antd";
import { UPDATE_COMPANY_MUTATION } from "@/graphql/mutations";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import SelectOptionWithAvatar from "@/components/selected-option-avatar";

import CustomAvator from "@/components/custom-avatar";
import { getNameInitials } from "@/utilities";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";
import type { UsersSelectQuery } from "@/graphql/types";
import {
  businessTypeOptions,
  companySizeOptions,
  industryOptions,
} from "@/constants";
import { CompanyContactsTable } from "./contacts-table";
export const EditCompany = () => {
  const {
    saveButtonProps,
    formProps,
    formLoading,
    query: queryResult,
  } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });
  const { avatarUrl, name } = queryResult?.data?.data || {};
  const { selectProps, query: queryResultUsers } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    pagination: { mode: "off" },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
    optionLabel: "name",
  });
  return (
    <div>
      <Row gutter={[32, 32]}></Row>
      <Col xs={24} xl={12}>
        <Edit
          isLoading={formLoading}
          saveButtonProps={saveButtonProps}
          breadcrumb={false}
        >
          <Form {...formProps} layout="vertical">
            <CustomAvator
              shape="square"
              src={avatarUrl}
              name={getNameInitials(name || "")}
              style={{
                width: 96,
                height: 96,
                marginBottom: "24px",
              }}
            />
            <Form.Item
              label="Sales owner"
              name="salesOwnerId"
              initialValue={formProps.initialValues?.salesOwner?.id}
            >
              <Select
                placeholder="Please sales owner user"
                {...selectProps}
                options={
                  queryResultUsers.data?.data?.map((user) => ({
                    value: user.id,
                    label: (
                      <SelectOptionWithAvatar
                        name={user.name}
                        avatarUrl={user.avatarUrl ?? undefined}
                      />
                    ),
                  })) ?? []
                }
              />
            </Form.Item>
            <Form.Item>
              <Select options={companySizeOptions} />
            </Form.Item>
            <Form.Item>
              <InputNumber
                autoFocus
                addonBefore="$"
                min={0}
                placeholder="0,00"
              />
            </Form.Item>
            <Form.Item label="Industry">
              <Select options={industryOptions} />
            </Form.Item>
            <Form.Item label="Business Type">
              <Select options={businessTypeOptions} />
            </Form.Item>
            <Form.Item label="Company Name" name="name">
                <Input placeholder="Enter your company name"/>
            </Form.Item>
          </Form>
        </Edit>
      </Col>
      <Col xs={24} xl={12}>
      <CompanyContactsTable />
      </Col>
    </div>
  );
};
