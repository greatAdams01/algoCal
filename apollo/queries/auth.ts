import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation AuthData($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    creatorId
    token
  }
}
`

export const SIGNUP_USER = gql`
  mutation($name: String!, $password: String!, $email: String!) {
  signup(name: $name, password: $password, email: $email) {
    _id
  }
}
`