import React from "react";
import styled from "@emotion/styled";
import { Button } from "@rebass/emotion";
import { Label, Select, Input, Checkbox } from "@rebass/forms";
import { Formik } from "formik";
import { API, graphqlOperation } from "aws-amplify";

import Dialog from "./Dialog";
import { createListing, updateListing } from "../graphql/mutations";

const StyledButton = styled(Button)`
  background-color: #ffac31;
  cursor: pointer;
`;

const StyledLabel = styled(Label)`
  color: #ffac31;
  margin-bottom: 4px;
`;

const StyledInput = styled(Input)`
  color: #ffac31;
  border-radius: 3px;
  background-color: #152939;
`;

const StyledSelect = styled(Select)`
  color: #ffac31;
  border-radius: 3px;
  background-color: #152939;
`;

const StyledTextarea = styled("textarea")`
  color: #ffac31;
  background-color: #152939;
  width: 100%;
  min-height: 80px;
  border-radius: 3px;
  resize: vertical;
`;

const StyledCheckbox = styled(Checkbox)`
  color: #ffac31;
  width: auto;
`;

const CheckboxText = styled("span")`
  margin-top: 3px;
`;

const Divider = styled("div")`
  height: 1px;
  background-color: #152939;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const FormInputs = styled("div")`
  max-height: 450px;
  overflow: scroll;
  border: 1px solid #152939;
  padding: 16px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);

  @media (max-height: 570px) {
    max-height: 300px;
  }

  @media (max-height: 675px) {
    max-height: 350px;
  }
`;

const Actions = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
`;

const Message = styled(`span`)`
  font-size: 12px;
  text-transform: uppercase;
  color: #cd3333;
`;

const InputContainer = styled("div")`
  margin-bottom: 16px;
`;

const Title = styled("h2")`
  color: #ffac31;
`;

const STATUSES = [
  {
    display: "Tracking",
    value: "TRACKING"
  },
  {
    display: "Applied",
    value: "APPLIED"
  },
  {
    display: "Take Home Assignment",
    value: "TAKE_HOME_ASSIGNMENTS"
  },
  {
    display: "Interview Set",
    value: "INTERVIEWING"
  }
];

export default props => (
  <Dialog onDismiss={props.onDismiss}>
    <Title>{props.listing ? "Edit Job Listing" : "Track Job Listing"}</Title>
    <Formik
      initialValues={
        props.listing
          ? props.listing
          : {
              title: "",
              company: "",
              url: "",
              favorite: false,
              status: "TRACKING",
              notes: undefined
            }
      }
      validate={values => {
        let errors = {};
        if (!values.title) {
          errors.title = "Required";
        }

        if (!values.company) {
          errors.company = "Required";
        }
        if (!values.url) {
          errors.url = "Required";
        } else if (
          !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
            values.url
          )
        ) {
          errors.url = "Invalid URL";
        }

        if (
          values.contactEmail &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.contactEmail)
        ) {
          errors.contactEmail = "Invalid email address";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        props.onSave(values);
        setSubmitting(false);
        resetForm();
        props.onDismiss();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <FormInputs>
            <InputContainer>
              <StyledLabel htmlFor="title">Job Title</StyledLabel>
              <StyledInput
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Message>{touched.title && errors.title}</Message>
            </InputContainer>

            <InputContainer>
              <StyledLabel htmlFor="company">Company</StyledLabel>
              <StyledInput
                type="text"
                name="company"
                value={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Message>{touched.company && errors.company}</Message>
            </InputContainer>

            <InputContainer>
              <StyledLabel htmlFor="url">URL</StyledLabel>
              <StyledInput
                type="url"
                name="url"
                value={values.url}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Message>{touched.url && errors.url}</Message>
            </InputContainer>

            <InputContainer>
              <StyledLabel htmlFor="status">Status</StyledLabel>
              <StyledSelect
                type="text"
                name="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {STATUSES.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.display}
                  </option>
                ))}
              </StyledSelect>
            </InputContainer>

            {values.status &&
              (values.status === "TAKE_HOME_ASSIGNMENT" ||
                values.status === "INTERVIEWING") && (
                <InputContainer>
                  <StyledLabel
                    style={{ marginTop: "16px" }}
                    htmlFor="relatedDate"
                  >
                    Date
                  </StyledLabel>
                  <StyledInput
                    type="date"
                    name="relatedDate"
                    value={values.relatedDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputContainer>
              )}

            <InputContainer>
              <StyledLabel style={{ maxWidth: "100px", marginTop: "24px" }}>
                <StyledCheckbox
                  name="favorite"
                  checked={values.favorite}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{" "}
                <CheckboxText>Favorite</CheckboxText>
              </StyledLabel>
            </InputContainer>

            <InputContainer>
              <StyledLabel htmlFor="notes">Notes</StyledLabel>
              <StyledTextarea
                name="notes"
                value={values.notes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputContainer>

            <Divider />

            <InputContainer>
              <StyledLabel htmlFor="contactName">Contact Name</StyledLabel>
              <StyledInput
                type="text"
                name="contactName"
                value={values.contactName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputContainer>

            <InputContainer>
              <StyledLabel htmlFor="contactEmail">Contact Email</StyledLabel>
              <StyledInput
                type="email"
                name="contactEmail"
                value={values.contactEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Message>{touched.contactEmail && errors.contactEmail}</Message>
            </InputContainer>

            <InputContainer>
              <StyledLabel htmlFor="contactPhoneNumber">
                Contact Phone Number
              </StyledLabel>
              <StyledInput
                type="text"
                name="contactPhoneNumber"
                value={values.contactPhoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </InputContainer>
          </FormInputs>
          <Actions>
            <StyledButton
              onClick={() => {
                props.onDismiss();
              }}
              style={{ marginRight: "8px" }}
            >
              Cancel
            </StyledButton>
            <StyledButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </StyledButton>
          </Actions>
        </form>
      )}
    </Formik>
  </Dialog>
);
