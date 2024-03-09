export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  JSON: { input: any; output: any };
};

export type EditUserInput = {
  id: Scalars["ID"]["input"];
  update: UserUpdate;
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Mutation = {
  deleteUser: Scalars["Boolean"]["output"];
  editUser: User;
  login: User;
  register: User;
};

export type MutationDeleteUserArgs = {
  userId: Scalars["ID"]["input"];
};

export type MutationEditUserArgs = {
  editUserInput?: InputMaybe<EditUserInput>;
};

export type MutationLoginArgs = {
  loginInput?: InputMaybe<LoginInput>;
};

export type MutationRegisterArgs = {
  registerInput?: InputMaybe<RegisterInput>;
};

export type OffsetPaging = {
  limit: Scalars["Int"]["input"];
  offset: Scalars["Int"]["input"];
};

export type Query = {
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  sensor: Sensor;
  sensorData: SensorDataResponse;
  sensors: SensorResponse;
  user?: Maybe<User>;
};

export type QueryGetUserArgs = {
  userId: Scalars["String"]["input"];
};

export type QuerySensorArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerySensorDataArgs = {
  filter?: InputMaybe<SensorDataFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<InputMaybe<SensorDataSorting>>>;
  topic_id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QuerySensorsArgs = {
  filter?: InputMaybe<SensorFilter>;
  paging?: InputMaybe<OffsetPaging>;
  sorting?: InputMaybe<Array<InputMaybe<SensorSorting>>>;
};

export type QueryUserArgs = {
  id: Scalars["ID"]["input"];
};

export type RegisterInput = {
  accessLevel: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Sensor = {
  id: Scalars["ID"]["output"];
  metadata: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type SensorData = {
  topic_id: Scalars["ID"]["output"];
  ts: Scalars["String"]["output"];
  value_string: Scalars["String"]["output"];
};

export type SensorDataFilter = {
  topic_id?: InputMaybe<Scalars["JSON"]["input"]>;
  ts?: InputMaybe<Scalars["JSON"]["input"]>;
  value_string?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type SensorDataResponse = {
  nodes: Array<SensorData>;
  totalCount: Scalars["Int"]["output"];
};

export type SensorDataSorting = {
  direction: Scalars["String"]["input"];
  field: Scalars["String"]["input"];
};

export type SensorFilter = {
  name?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type SensorResponse = {
  nodes: Array<Sensor>;
  totalCount: Scalars["Int"]["output"];
};

export type SensorSorting = {
  direction: Scalars["String"]["input"];
  field: Scalars["String"]["input"];
};

export type User = {
  accessLevel: Scalars["String"]["output"];
  accessToken: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type UserUpdate = {
  accessLevel: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};
