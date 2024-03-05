import CustomAvatar from "@/components/custom-avatar";
import { GET_SENSORS_QUERY } from "@/graphql/queries";
import { SearchOutlined } from "@ant-design/icons";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  useTable,
} from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import { Input, Space, Table } from "antd";
import { Text } from "../../../components/text";
import { Sensor } from "@/graphql/schema.types";
import { GetSensorsQuery } from "@/graphql/types";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

export const SensorList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps, filters } = useTable<Sensor>({
    resource: "sensors",
    onSearch: (values) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values.name,
        },
      ];
    },
    meta: {
      gqlQuery: GET_SENSORS_QUERY,
    },
    pagination: {
      pageSize: 10,
    },
    sorters: {
      initial: [
        {
          field: "id",
          order: "asc",
        },
      ],
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
  });

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() => {
              go({
                to: {
                  resource: "sensors",
                  action: "create",
                },
                options: {
                  keepQuery: true,
                },
                type: "replace",
              });
            }}
          />
        )}
      >
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
          }}
          onRow={(record) => ({
            onClick: () => {
              go({
                to: {
                  resource: "sensors",
                  action: "show",
                  id: record.id,
                },
                options: {
                  keepQuery: true,
                },
                type: "replace",
              });
            },
          })}
        >
          <Table.Column<Sensor>
            dataIndex="id"
            title="Sensor ID"
            sorter
            render={(value, record) => (
              <Space>
                <Text style={{ whiteSpace: "nowrap" }}>{record.id}</Text>
              </Space>
            )}
          />
          <Table.Column<Sensor>
            dataIndex="name"
            title="Sensor Name"
            defaultFilteredValue={getDefaultFilter("id", filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search Sensor" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <CustomAvatar shape="square" name={record.name} />
                <Text style={{ whiteSpace: "nowrap" }}>{record.name}</Text>
              </Space>
            )}
          />
          <Table.Column<Sensor>
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value) => (
              <Space>
                <EditButton hideText size="small" recordItemId={value} />
                <DeleteButton hideText size="small" recordItemId={value} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};
