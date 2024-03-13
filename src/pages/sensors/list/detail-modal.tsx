import { Col, Divider, Modal, Row, Space, Table } from "antd";
import { useGo, useShow } from "@refinedev/core";
import { GET_SENSOR_DATA_QUERY, GET_SENSOR_QUERY } from "@/graphql/queries";
import { useModal, useTable } from "@refinedev/antd";

import { Text } from "@/components/text";
import CustomAvatar from "@/components/custom-avatar";
import { Sensor, SensorData } from "@/graphql/schema.types";
import SensorDataGraph from "../components/sensor-data-graph";
import { useParams } from "react-router-dom";

export const SensorDetailModal = () => {
  const go = useGo();
  const { id } = useParams<{ id: string }>();

  const goToListPage = () => {
    go({
      to: { resource: "sensors", action: "list" },
      options: {
        keepQuery: true,
      },
    });
  };

  const { queryResult } = useShow<Sensor>({
    resource: "sensors",
    id,
    meta: {
      gqlQuery: GET_SENSOR_QUERY,
    },
  });

  const { modalProps } = useModal();

  const { tableProps } = useTable({
    resource: "sensorData",
    meta: {
      gqlQuery: GET_SENSOR_DATA_QUERY,
      customVariables: {
        topic_id: [id],
      },
    },
  });

  const sensor = queryResult.data?.data;
  const sensorData = tableProps.dataSource;

  return (
    <Modal
      {...modalProps}
      title="Sensor Detail"
      open={true}
      onCancel={goToListPage}
      footer={null}
      width={1000}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        <CustomAvatar shape="square" name={sensor?.name} />
        <Text size="md" className="secondary">
          {sensor?.name}
        </Text>
      </div>
      <Divider />
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <SensorDataGraph data={sensorData || []} isLoading={false} />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Table {...tableProps} pagination={{ ...tableProps.pagination }}>
            <Table.Column<SensorData>
              dataIndex="ts"
              title="Timestamp"
              render={(value, record) => (
                <Space>
                  <Text style={{ whiteSpace: "nowrap" }}>{record.ts}</Text>
                </Space>
              )}
            />
            <Table.Column<SensorData> dataIndex="value_string" title="Value" />
          </Table>
        </Col>
      </Row>
    </Modal>
  );
};
