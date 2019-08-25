/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getListing = `query GetListing($id: ID!) {
  getListing(id: $id) {
    id
    title
    company
    url
    status
    favorite
    notes
    relatedDate
    contactName
    contactEmail
    contactPhoneNumber
    createdAt
    updatedAt
  }
}
`;
export const listListings = `query ListListings(
  $filter: ModelListingFilterInput
  $limit: Int
  $nextToken: String
) {
  listListings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      company
      url
      status
      favorite
      notes
      relatedDate
      contactName
      contactEmail
      contactPhoneNumber
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
