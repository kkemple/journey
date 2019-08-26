import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@rebass/emotion";

import ListingEditor from "./Listing-Editor";

const TrackListingContainer = styled("div")`
  text-align: right;
`;

const StyledButton = styled(Button)`
  background-color: #ffac31;
  cursor: pointer;
`;

export default props => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <TrackListingContainer>
        <StyledButton
          onClick={() => {
            setShowDialog(true);
          }}
        >
          Track Listing
        </StyledButton>
      </TrackListingContainer>
      {showDialog && (
        <ListingEditor
          onSave={props.onSave}
          onDismiss={() => {
            setShowDialog(false);
          }}
        />
      )}
    </>
  );
};
