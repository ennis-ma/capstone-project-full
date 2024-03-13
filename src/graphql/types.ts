import type * as Types from "./schema.types";

export type DeleteUserMutationVariables = Types.Exact<{
  userId: Types.Scalars["ID"]["input"];
}>;

export type DeleteUserMutation = Pick<Types.Mutation, "deleteUser">;

export type EditUserMutationVariables = Types.Exact<{
  input: Types.EditUserInput;
}>;

export type EditUserMutation = {
  editUser: Pick<Types.User, "name" | "email" | "accessLevel">;
};

export type GetUsersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  getUsers?: Types.Maybe<
    Array<
      Types.Maybe<
        Pick<Types.User, "id" | "email" | "createdAt" | "accessLevel">
      >
    >
  >;
};

export type GetUserQueryVariables = Types.Exact<{
  userId: Types.Scalars["String"]["input"];
}>;

export type GetUserQuery = {
  getUser?: Types.Maybe<
    Pick<
      Types.User,
      "id" | "name" | "email" | "createdAt" | "accessLevel" | "accessToken"
    >
  >;
};

export type GetSensorsQueryVariables = Types.Exact<{
  filter: Types.SensorFilter;
  sorting?: Types.InputMaybe<Array<Types.SensorSorting> | Types.SensorSorting>;
  paging: Types.OffsetPaging;
}>;

export type GetSensorsQuery = {
  sensors: Pick<Types.SensorResponse, "totalCount"> & {
    nodes: Array<Pick<Types.Sensor, "id" | "name" | "metadata">>;
  };
};

export type GetSensorQueryVariables = Types.Exact<{
  id: Types.Scalars["ID"]["input"];
}>;

export type GetSensorQuery = {
  sensor: Pick<Types.Sensor, "id" | "name" | "metadata">;
};

export type GetSensorDataQueryVariables = Types.Exact<{
  topic_id?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.Scalars["ID"]["input"]>>
    | Types.InputMaybe<Types.Scalars["ID"]["input"]>
  >;
  filter: Types.SensorDataFilter;
  sorting?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.SensorDataSorting>>
    | Types.InputMaybe<Types.SensorDataSorting>
  >;
  paging?: Types.InputMaybe<Types.OffsetPaging>;
}>;

export type GetSensorDataQuery = {
  sensorData: Pick<Types.SensorDataResponse, "totalCount"> & {
    nodes: Array<Pick<Types.SensorData, "topic_id" | "ts" | "value_string">>;
  };
};

export type DashboardTotalCountsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type DashboardTotalCountsQuery = {
  sensors: Pick<Types.SensorResponse, "totalCount">;
};
