import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Delete as DeleteIcon,
  TimerOffOutlined as ClockIcon,
  DeleteSweepOutlined as DeleteAllIcon,
} from "@material-ui/icons";

import { blueGray, bluePurple, purple, red } from "../lib/colors";
import { cardStyles, cellStyle, headerCellStyle } from "../lib/styles";
import { formatBalance, formatDate, confirmDelete } from "../lib/utils";
import { deleteRecord, deleteHistory } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  card: {
    ...cardStyles,
    fontSize: 14,
    maxHeight: 450,
    overflow: "auto",
    // responsive styles
    [theme.breakpoints.down("sm")]: {
      minHeight: 250,
    },
  },
  table: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tbody: {
    display: "table",
    width: "100%",
    borderSpacing: 0,
    whiteSpace: "nowrap",
  },
  th: headerCellStyle,
  thCenter: {
    ...headerCellStyle,
    textAlign: "center",
  },
  tr: {
    "&:hover": {
      backgroundImage:
        "linear-gradient(270deg, #f7f7fb 0%, #f7f7fb 90%,   rgba(247, 247, 251, 0) 100%)",
    },
  },
  td: cellStyle,
  tdAligned: {
    ...cellStyle,
    textAlign: "right",
  },
  tdCenter: {
    ...cellStyle,
    textAlign: "center",
  },
  deleteIcon: {
    "&:hover": {
      color: `${red}`,
      cursor: "pointer",
    },
  },
  clockIcon: {
    color: `${blueGray}`,
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    background: `repeating-linear-gradient(-45deg, #f7f7fb, #f7f7fb 7px, ${bluePurple} 1px, ${bluePurple} 8px)`,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 10,
    color: `${purple}`,
  },
  footer: {
    padding: "12px 20px",
  },
  deleteAllIcon: {
    color: `${red}`,
    marginRight: 5,
    fontSize: 18,
    marginTop: -2,
  },
  button: {
    height: 30,
    fontSize: 13,
    padding: "15px 20px",
    width: "fit-content",
    textTransform: "none",
    alignSelf: "flex-start",
    flexShrink: 0,
  },
}));

function History({ history, onDeleteRecord, onDeleteHistory }) {
  const classes = useStyles();

  const renderDeleteIcon = (id) => (
    <DeleteIcon
      className={classes.deleteIcon}
      color="disabled"
      fontSize="medium"
      onClick={() => confirmDelete({ callback: () => onDeleteRecord(id) })}
    />
  );

  return (
    <Card className={classes.card}>
      {!history.length ? (
        <div className={classes.empty}>
          <ClockIcon className={classes.clockIcon} fontSize="large" />
          <div className={classes.emptyText}>No transaction record to show</div>
        </div>
      ) : (
        <div className={classes.table}>
          <table className={classes.tbody}>
            <thead>
              <tr>
                <th className={classes.th}>Date</th>
                <th className={classes.th}>Description</th>
                <th className={classes.thCenter}>Amount</th>
                <th className={classes.thCenter}>Currency</th>
                <th className={classes.th}>&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              {history.map(
                ({ id, type, date, description, amount, currency }) => (
                  <tr key={id} className={classes.tr}>
                    <td className={classes.td}>{formatDate(date).short}</td>
                    <td className={classes.td}>{description}</td>
                    <td className={classes.tdAligned}>
                      {amount ? formatBalance(amount) : "0.00"}
                    </td>
                    <td className={classes.tdCenter}>{currency || "-"}</td>
                    <td className={classes.td}>{renderDeleteIcon(id)}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <div className={classes.footer}>
            <Button
              className={classes.button}
              variant="outlined"
              color="secondary"
              onClick={() => confirmDelete({ callback: onDeleteHistory })}
            >
              <DeleteAllIcon className={classes.deleteAllIcon} />
              Clear all
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

History.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.string,
      amount: PropTypes.number,
      description: PropTypes.string,
      currency: PropTypes.string,
    })
  ).isRequired,
  onDeleteRecord: PropTypes.func.isRequired,
  onDeleteHistory: PropTypes.func.isRequired,
};

const mapStateProps = ({ history }) => ({ history });

const mapDispatchToProps = (dispatch) => ({
  onDeleteRecord: (id) => dispatch(deleteRecord({ id })),
  onDeleteHistory: () => dispatch(deleteHistory()),
});

export default connect(mapStateProps, mapDispatchToProps)(History);
