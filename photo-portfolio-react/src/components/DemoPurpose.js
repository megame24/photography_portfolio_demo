import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

const DemoPurpose = ({ message }) => (
  <Message info>
    <Message.Header>For Demo Purposes</Message.Header>
    <p>{message}</p>
  </Message>
);

DemoPurpose.propTypes = {
  message: PropTypes.string.isRequired
};

export default DemoPurpose;
