import { DashboardTotalCountCard } from "./components";
import { DASHBOARD_TOTAL_COUNTS_QUERY } from "@/graphql/queries";
import { useCustom } from "@refinedev/core";
import { Col, Row } from "antd";

export const Home = () => {
  const { data, isLoading } = useCustom({
    url: "",
    method: "get",
    meta: {
      gqlQuery: DASHBOARD_TOTAL_COUNTS_QUERY,
    },
  });

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={24} xl={8}>
          <DashboardTotalCountCard
            resource="sensors"
            isLoading={isLoading}
            totalCount={data?.data.sensors.totalCount}
          />
        </Col>
      </Row>
    </div>
  );
};
