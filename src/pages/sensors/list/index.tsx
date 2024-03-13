import CustomAvatar from "@/components/custom-avatar";
import { GET_SENSORS_QUERY, GET_SENSOR_DATA_QUERY } from "@/graphql/queries";
import { SearchOutlined } from "@ant-design/icons";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  ExportButton,
  FilterDropdown,
  List,
  useTable,
} from "@refinedev/antd";
import { getDefaultFilter, useExport, useGo } from "@refinedev/core";
import { Checkbox, Input, Space, Table } from "antd";
import { Text } from "../../../components/text";
import { Sensor } from "@/graphql/schema.types";
import { useState } from "react";

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

  const [SelectedSensorData, setSelectedSensorData] = useState<string[]>([]);

  const { triggerExport } = useExport({
    resource: "sensorData",
    meta: {
      gqlQuery: GET_SENSOR_DATA_QUERY,
    },
    filters: [
      {
        field: "topic_id",
        operator: "in",
        value: SelectedSensorData,
      },
    ],
    sorters: [
      { field: "topic_id", order: "asc" },
      {
        field: "ts",
        order: "asc",
      },
    ],
    onError: (error) => {
      console.error("Error exporting data:", error);
    },
  });

  const handleSelectionChange = (e: any, record: Sensor) => {
    const isChecked = e.target.checked;
    setSelectedSensorData(
      isChecked
        ? [...SelectedSensorData, record.id]
        : SelectedSensorData.filter((key: string) => key !== record.id)
    );
  };

  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          // add two buttons to the header
          <Space>
            {/* <CreateButton
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
            /> */}
            <ExportButton onClick={triggerExport} />
          </Space>
        )}
      >
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
          }}
          onRow={(record) => ({
            onClick: (event) => {
              const target = event.target as HTMLElement;

              if (target.tagName !== "INPUT") {
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
              }
            },
          })}
        >
          <Table.Column<Sensor>
            title="Select"
            key="selection"
            fixed="left"
            render={(value, record) => (
              <Checkbox
                checked={SelectedSensorData.includes(record.id)} // Determine if checked
                onChange={(e) => handleSelectionChange(e, record)}
              />
            )}
          />
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
