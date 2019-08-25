import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import styled from "@emotion/styled";

import Listing from "./Listing";
import TrackListing from "./Track-Listing";
import { listListings } from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";

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

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateListing)
    ).subscribe({
      next: payload => {
        const listing = payload.value.data.onCreateListing;
        setListings(
          [listing, ...listings].sort((a, b) => {
            if (a.updatedAt > b.updatedAt) return -1;
            else return 1;
          })
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [listings]);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onUpdateListing)
    ).subscribe({
      next: payload => {
        const listing = payload.value.data.onUpdateListing;
        setListings(listings.map(l => (l.id === listing.id ? listing : l)));
      }
    });

    return () => subscription.unsubscribe();
  }, [listings]);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onDeleteListing)
    ).subscribe({
      next: payload => {
        const listing = payload.value.data.onDeleteListing;

        setListings(
          listings.filter(l => {
            return l.id !== listing.id;
          })
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [listings]);

  return (
    <Container>
      <TrackListing />
      <Listings>
        {listings.map(listing => (
          <Listing key={listing.id} listing={listing} />
        ))}
      </Listings>
    </Container>
  );
};
