import React, { useState } from "react";
import styled from "@emotion/styled";
import { Auth } from "aws-amplify";
import { Button } from "@rebass/emotion";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import AllListings from "./All-Listings";
import FavoriteListings from "./Favorite-Listings";

const Header = styled("div")`
  background-color: #31465f;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  height: 80px;
  z-index: 2;
`;

const Title = styled("h1")`
  margin-top: 0;
  margin-bottom: 0;
  text-transform: uppercase;
  color: #ffffff;
`;

const SignOutButton = styled(Button)`
  background-color: #ffac31;
  cursor: pointer;
`;

const StyledTabs = styled(Tabs)`
  padding-top: 80px;
`;

const StyledTabList = styled(TabList)`
  display: flex;
  justify-content: stretch;
  align-items: center;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  height; 40px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);

  & > [data-selected] {
    border-bottom-color: #FFAC31;
    color: #FFAC31;
  }
`;

const StyledTabPanels = styled(TabPanels)`
  padding-top: 60px;
  display: flex;
  justify-content: stretch;
`;

const StyledTabPanel = styled(TabPanel)`
  flex: 1;
  padding: 16px;
`;

const StyledTab = styled(Tab)`
  text-transform: uppercase;
  flex: 1;
  padding: 16px;
  color: #ffffff;
  background-color: #31465f;
  font-size: 16px;
  border: none;
  border-bottom: 3px solid #31465f;
`;

export default () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Header>
        <Title>Journey</Title>
        <SignOutButton
          onClick={() => {
            Auth.signOut().then(() => window.location.reload());
          }}
        >
          Sign Out
        </SignOutButton>
      </Header>
      <StyledTabs onChange={index => setTabIndex(index)}>
        <StyledTabList>
          <StyledTab>All Listings</StyledTab>
          <StyledTab>Favorites</StyledTab>
        </StyledTabList>
        <StyledTabPanels>
          <StyledTabPanel>{tabIndex === 0 && <AllListings />}</StyledTabPanel>
          <StyledTabPanel>
            {tabIndex === 1 && <FavoriteListings />}
          </StyledTabPanel>
        </StyledTabPanels>
      </StyledTabs>
    </>
  );
};
