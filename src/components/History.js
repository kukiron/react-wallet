import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Delete as DeleteIcon,
  TimerOffOutlined as ClockIcon,
} from "@material-ui/icons";

import { blueGray, bluePurple, purple, purpleBlue, red } from "../lib/colors";
import { cardStyles } from "../lib/styles";
import { formatBalance, formatDate, confirmDelete } from "../lib/utils";
import { deleteRecord, deleteHistory } from "../redux/actions";

const cellStyle = {
  padding: "12px 20px",
  borderBottom: `1px solid ${bluePurple}`,
};

const useStyles = makeStyles((theme) => ({
  card: {
    ...cardStyles,
    fontSize: 14,
    overflowY: "auto",
    maxHeight: 450,
    [theme.breakpoints.down("sm")]: {
      height: 250,
    },
  },
  tableWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  table: {
    width: "100%",
    borderSpacing: 0,
    overflow: "scroll",
  },
  headerCell: {
    position: "sticky",
    top: 0,
    background: `${purpleBlue}`,
    color: "#fff",
    boxShadow: "2px 3px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "left",
    borderBottom: "1px solid #dce4f3",
    padding: "13px 20px",
    fontWeight: 500,
  },
  row: {
    "&:hover": {
      backgroundImage:
        "linear-gradient(270deg, #f7f7fb 0%, #f7f7fb 90%,   rgba(247, 247, 251, 0) 100%)",
    },
  },
  cell: cellStyle,
  alignedCell: {
    ...cellStyle,
    textAlign: "right",
  },
  centeredCell: {
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
    display: "flex",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  buttonWrapper: {
    alignSelf: "flex-end",
  },
  button: {
    height: 30,
    fontSize: 12,
    margin: "10px 20px",
    width: "fit-content",
    textTransform: "none",
    flexShrink: 0,
  },
}));

function History({ history, onDeleteRecord, onDeleteHistory }) {
  const classes = useStyles();
  const renderCell = (children, align) => (
    <td
      className={
        align === "right"
          ? classes.alignedCell
          : (align === "center" && classes.centeredCell) || classes.cell
      }
    >
      {children}
    </td>
  );
  const renderHeaderCell = (children) => (
    <th className={classes.headerCell}>{children}</th>
  );

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
        <div className={classes.tableWrapper}>
          <table className={classes.table}>
            <thead>
              <tr>
                {renderHeaderCell("Date")}
                {renderHeaderCell("Description")}
                {renderHeaderCell("Amount")}
                {renderHeaderCell("Currency")}
                {renderHeaderCell()}
              </tr>
            </thead>

            <tbody>
              {history.map(
                ({ id, type, date, description, amount, currency }) => (
                  <tr key={id} className={classes.row}>
                    {renderCell(formatDate(date).short)}
                    {renderCell(description)}
                    {renderCell(amount ? formatBalance(amount) : 0, "right")}
                    {renderCell(currency || "-", "center")}
                    {renderCell(renderDeleteIcon(id))}
                  </tr>
                )
              )}
            </tbody>
          </table>

          <div className={classes.buttonWrapper}>
            <Button
              className={classes.button}
              variant="outlined"
              color="secondary"
              onClick={() => confirmDelete({ callback: onDeleteHistory })}
            >
              Clear history
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
