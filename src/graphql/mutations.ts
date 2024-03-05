import gql from "graphql-tag";

// Mutation to delete a user
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

// Mutation to edit a user
export const EDIT_USER_MUTATION = gql`
  mutation EditUser($input: EditUserInput!) {
    editUser(editUserInput: $input) {
      name
      email
      accessLevel
    }
  }
`;
