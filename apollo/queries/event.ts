import gql from "graphql-tag";

export const CREATE_EVENT = gql`
  mutation ($title: String!, $date: String!, $time: String!, $organizer: String!, $description: String!, $venue: String!, $category: String!, $link: String!){
  createEvent(title: $title, date: $date, time: $time, organizer: $organizer, description: $description, venue: $venue, category: $category, link: $link) {
    _id
    category
    createdAt
    date
    description
    followers
    image
    link
    organizer
    reactions
    time
    title
    updatedAt
    venue
  }
}
`

export const GET_EVENTS = gql` 
query {
  events {
    _id
    description
    date
    category
    followers
    link
    image
    organizer
    reactions
    time
    title
    updatedAt
    venue
  }
}
`

export const GET_CREATOR_EVENTS = gql` 
query {
  events {
    _id
    description
    date
    category
    followers
    link
    image
    organizer
    reactions
    time
    title
    updatedAt
    venue
  }
}
`