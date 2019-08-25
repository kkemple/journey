import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Authenticator } from "aws-amplify-react";
import styled from "@emotion/styled";

import awsExports from "./aws-exports";
import Listings from "./components/Listings";

const Title = styled("h1")`
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
  margin-bottom: 8px;
`;

const theme = {
  formContainer: {
    margin: 0,
    padding: "8px 24px 24px"
  },
  formSection: {
    backgroundColor: "#31465f",
    borderRadius: "4px"
  },
  sectionHeader: {
    color: "#ffffff"
  },
  inputLabel: {
    color: "#ffffff"
  },
  input: {
    backgroundColor: "#152939",
    color: "#FFAC31"
  },
  hint: {
    color: "#ffffff"
  },
  button: {
    borderRadius: "3px",
    backgroundColor: "#FFAC31"
  },
  a: {
    color: "#FFAC31"
  }
};

function App() {
  const [state, setState] = useState({ isLoggedIn: false, user: null });

  const checkLoggedIn = () => {
    Auth.currentAuthenticatedUser()
      .then(data => {
        const user = { username: data.username, ...data.attributes };
        setState({ isLoggedIn: true, user });
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return state.isLoggedIn ? (
    <Listings />
  ) : (
    <>
      <Title>Journey</Title>
      <Authenticator
        onStateChange={authState => {
          if (authState === "signedIn") {
            checkLoggedIn();
          }
        }}
        amplifyConfig={awsExports}
        theme={theme}
      />
    </>
  );
}

export default App;
