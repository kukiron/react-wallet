import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import {
  CurrencyList,
  Summary,
  History,
  Sidebar,
  ResetButton,
} from "./components";
import { SectionHeader } from "./components/common";
import ErrorBoundary from "./ErrorBoundary";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "60px auto",
  },
  space: {
    marginBottom: 60,
  },
  sidebar: {
    display: "grid",
    gridTemplateColumns: "4fr 1fr",
    gridGap: 30,
    width: "100%",
    minHeight: 300,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <ErrorBoundary>
      <Container maxWidth="md" className={classes.root}>
        <Summary />
        <div className={classes.space} />
        <>
          <SectionHeader text="Available currencies" />
          <CurrencyList />
        </>
        <div className={classes.space} />

        <>
          <SectionHeader text="Transaction history" />
          <div className={classes.sidebar}>
            <History />
            <Sidebar />
          </div>
        </>
        <ResetButton />
      </Container>
    </ErrorBoundary>
  );
}
