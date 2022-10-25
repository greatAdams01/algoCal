import gql from "graphql-tag";

export const JOIN_CREATOR = gql`
  mutation($address: String!) {
  join(address: $address) {
    token
    creatorId
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

export const USER = gql`
    query Creator{
      creator {
        _id
        about
        address
        website
      }
    }
`