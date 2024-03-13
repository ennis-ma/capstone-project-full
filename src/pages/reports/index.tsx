import { GET_SENSORS_QUERY, GET_SENSOR_DATA_QUERY } from "@/graphql/queries";
import { Sensor, SensorData } from "@/graphql/schema.types";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdown, getDefaultFilter, useTable } from "@refinedev/antd";
import { Checkbox, Col, Input, Row, Space, Table } from "antd";
import { useState } from "react";
import { Text } from "../../components/text";
import CustomAvatar from "@/components/custom-avatar";
import { HttpError, useMany } from "@refinedev/core";
import { Line, LineConfig } from "@ant-design/plots";

const ReportsPage = () => {
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

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  const { data, isLoading, isError } = useMany<SensorData, HttpError>({
    meta: {
      gqlQuery: GET_SENSOR_DATA_QUERY,
    },
    resource: "sensorData",
    ids: selectedRowKeys,
  });

  const handleSelectionChange = (e: any, record: Sensor) => {
    const isChecked = e.target.checked;
    setSelectedRowKeys(
      isChecked
        ? [...selectedRowKeys, record.id]
        : selectedRowKeys.filter((key: string) => key !== record.id)
    );
    console.log(data?.data);
  };

  const config: LineConfig = {
    data: data?.data
      ? data.data.map((d) => ({
          ...d,
          ts: new Date(Number(d.ts)).toLocaleString("en-US", {
            weekday: "short", // "Mon"
            hour: "2-digit", // "14"
            minute: "2-digit", // "32"
            second: "2-digit", // "21"
            hour12: false,
          }),
        }))
      : [],
    xField: "ts",
    yField: "value_string",
    seriesField: "topic_id",
    legend: {
      itemName: {
        formatter: (topic_id) => `Sensor ${topic_id}`,
      },
    },
  };

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Line {...config} />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Table
            {...tableProps}
            pagination={{
              ...tableProps.pagination,
            }}
          >
            <Table.Column<Sensor>
              title="Select"
              key="selection"
              fixed="left"
              render={(value, record) => (
                <Checkbox
                  checked={selectedRowKeys.includes(record.id)} // Determine if checked
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
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default ReportsPage;
