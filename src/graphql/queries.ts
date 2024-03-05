import gql from "graphql-tag";

// Query to get all users
export const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      id
      email
      createdAt
      accessLevel
    }
  }
`;

// Query to get a specific user
export const GET_USER_QUERY = gql`
  query GetUser($userId: String!) {
    getUser(userId: $userId) {
      id
      name
      email
      createdAt
      accessLevel
      accessToken
    }
  }
`;

// Query to get all sensors
export const GET_SENSORS_QUERY = gql`
  query GetSensors(
    $filter: SensorFilter!
    $sorting: [SensorSorting!]
    $paging: OffsetPaging!
  ) {
    sensors(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        name
        metadata
        data {
          ts
          value_string
        }
      }
    }
  }
`;

// Query to get a specific sensor
export const GET_SENSOR_QUERY = gql`
  query GetSensor($id: ID!) {
    sensor(id: $id) {
      id
      name
      metadata
      data {
        ts
        value_string
      }
    }
  }
`;

// Query to get Total Sensors
export const DASHBOARD_TOTAL_COUNTS_QUERY = gql`
  query DashboardTotalCounts {
    sensors {
      totalCount
    }
  }
`;
