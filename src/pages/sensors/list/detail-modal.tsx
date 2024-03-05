import { Col, Modal, Row } from "antd";
import { useGo, useShow } from "@refinedev/core";
import { GET_SENSOR_QUERY } from "@/graphql/queries";
import { GetSensorQuery } from "@/graphql/types";
import { useModal } from "@refinedev/antd";

import { Text } from "@/components/text";
import { totalCountVariants } from "@/constants";
import CustomAvatar from "@/components/custom-avatar";
import { Sensor } from "@/graphql/schema.types";
import SensorDataGraph from "../components/sensor-data-graph";

export const SensorDetailModal = () => {
  const go = useGo();

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
    meta: {
      gqlQuery: GET_SENSOR_QUERY,
    },
  });

  const { modalProps } = useModal();

  const sensor = queryResult.data?.data;
  console.log(sensor);

  return (
    <Modal
      {...modalProps}
      title="Sensor Detail"
      open={true}
      onCancel={goToListPage}
      footer={null}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <CustomAvatar shape="square" name={sensor?.name} />
            <Text size="md" className="secondary">
              {sensor?.name}
            </Text>
          </Col>
          <Col span={24}>
            <SensorDataGraph data={sensor?.data || []} isLoading={false} />
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
