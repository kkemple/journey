import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism } from "react-syntax-highlighter";
import styled from "@emotion/styled";
import { Button } from "@rebass/emotion";

import Dialog from "./Dialog";

const StyledButton = styled(Button)`
  background-color: #ffac31;
`;

const DismissContainer = styled("div")`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

const StyledMarkdown = styled(ReactMarkdown)`
  color: #ffffff;
  max-height: 550px;
  overflow: scroll;
  padding: 8px;

  @media (max-height: 570px) {
    max-height: 350px;
  }

  @media (max-height: 675px) {
    max-height: 450px;
  }

  pre {
    border-radius: 4px;
  }
`;

const CodeBlock = props => (
  <Prism language={props.language}>{props.value}</Prism>
);

export default props => (
  <Dialog>
    <DismissContainer>
      <StyledButton onClick={props.onDismiss}>Close</StyledButton>
    </DismissContainer>
    <StyledMarkdown
      renderers={{ code: CodeBlock }}
      source={props.markdown || "No notes."}
    />
  </Dialog>
);
