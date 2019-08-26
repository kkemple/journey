import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import styled from "@emotion/styled";

import Listing from "./Listing";
import TrackListing from "./Track-Listing";
import { listListings } from "../graphql/queries";
import {
  createListing,
  deleteListing,
  updateListing
} from "../graphql/mutations";

const Container = styled("div")`
  max-width: 800px;
  margin: 16px auto;
`;

const Listings = styled("div")`
  margin-top: 24px;
`;

export default () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    API.graphql(graphqlOperation(listListings))
      .then(result => {
        setListings(
          result.data.listListings.items.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) return -1;
            else return 1;
          })
        );
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <TrackListing
        onSave={values => {
          API.graphql(
            graphqlOperation(createListing, {
              input: values
            })
          ).then(result => {
            setListings([result.data.createListing, ...listings]);
          });
        }}
      />
      <Listings>
        {listings.map(listing => (
          <Listing
            key={listing.id}
            listing={listing}
            onSaveChanges={values => {
              API.graphql(
                graphqlOperation(updateListing, {
                  input: {
                    ...listing,
                    ...values
                  }
                })
              ).then(result => {
                const updatedListings = listings.map(l => {
                  if (l.id === result.data.updateListing.id) {
                    return result.data.updateListing;
                  }

                  return l;
                });

                setListings(updatedListings);
              });
            }}
            onFavorite={() => {
              API.graphql(
                graphqlOperation(updateListing, {
                  input: {
                    ...listing,
                    favorite: !listing.favorite
                  }
                })
              ).then(result => {
                const updatedListings = listings.map(l => {
                  if (l.id === result.data.updateListing.id) {
                    return result.data.updateListing;
                  }

                  return l;
                });

                setListings(updatedListings);
              });
            }}
            onDelete={() => {
              if (window.confirm("Are you sure want to delete this listing?")) {
                API.graphql(
                  graphqlOperation(deleteListing, {
                    input: { id: listing.id }
                  })
                ).then(result => {
                  const updatedListings = listings.filter(
                    l => l.id !== result.data.deleteListing.id
                  );

                  setListings(updatedListings);
                });
              }
            }}
          />
        ))}
      </Listings>
    </Container>
  );
};
