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
  mutation Creator($inputs: CreatorInput!){
    signup(Inputs: $inputs) {
    about
    email
    name
    website
  }
}
`