import {
  blueGray,
  bluePurple,
  brightBlue,
  purple,
  purpleBlue,
} from "../lib/colors";

// app common styles

export const cardStyles = {
  border: "none",
  borderRadius: 0,
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
};

export const sidebarCardStyles = {
  ...cardStyles,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 20,
  border: `2px dashed #7e98cf`,
  background: "#DCE4F3",
  "&:hover": {
    background: "rgba(40,131,252,0.3)",
    border: `2px dashed ${blueGray}`,
  },
  "&:last-child": {
    marginBottom: 0,
  },
};

export const actionButtonStyle = {
  marginTop: 15,
  height: 30,
  fontSize: 13,
  textTransform: "none",
};

export const formStyles = {
  display: "flex",
  alignItems: "baseline",
  textAlign: "center",
  marginTop: 10,
  marginLeft: 10,
};

export const linkStyle = {
  width: "fit-content",
  display: "flex",
  alignItems: "center",
  marginTop: 10,
  textDecoration: "underline",
  cursor: "pointer",
  color: `${brightBlue}`,
  "&:hover": {
    color: `${purple}`,
  },
};

export const cellStyle = {
  padding: "12px 20px",
  borderBottom: `1px solid ${bluePurple}`,
};
export const headerCellStyle = {
  position: "sticky",
  top: 0,
  background: `${purpleBlue}`,
  color: "#fff",
  boxShadow: "2px 3px 8px rgba(0, 0, 0, 0.2)",
  textAlign: "left",
  borderBottom: "1px solid #dce4f3",
  padding: "13px 20px",
  fontWeight: 500,
};
