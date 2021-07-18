import React, { Component } from "react";
import ErrorIcon from "@material-ui/icons/ErrorOutlineOutlined";
import { withStyles } from "@material-ui/core/styles";

import logger from "./lib/logger";

const StyledIcon = withStyles({
  root: {
    fontSize: 80,
  },
})(ErrorIcon);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    logger.log("Info", errorInfo);
    logger.log("Error", error);
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    return error ? (
      <div className="error-page">
        <StyledIcon color="secondary" fontSize="large" />
        <div className="error-page__title">
          {error?.message || "Something went wrong!"}
        </div>
        <button
          className="error-page__button"
          onClick={() => this.setState({ error: null })}
        >
          Go back
        </button>
      </div>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
