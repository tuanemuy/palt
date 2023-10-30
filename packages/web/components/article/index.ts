import { css } from "@/lib/style/system/css";

export const article = css({
  "& h1, & h2, & h3, & h4, & h5, & h6": {
    mt: "2rem",
    fontWeight: "bold",
    lineHeight: "1.5",
  },
  "& p, & ul, & ol, & table, & img, & code, & blockquote, & dl, & iframe": {
    mt: "1.5rem",
  },
  "& p + p": {
    mt: "1rem",
  },
  "& h1": {
    fontSize: "1.75em",
  },
  "& h2": {
    paddingBottom: "0.25rem",
    borderBottom: "2px solid token(colors.border)",
    fontSize: "1.5em",
  },
  "& h3": {
    fontSize: "1.5em",
  },
  "& h4": {
    fontSize: "1.25em",
  },
  "& h5": {
    fontSize: "1.1em",
  },
  "& a": {
    textDecoration: "underline",
  },
  "& hr": {
    margin: "4rem 0",
  },
  "& div:has(table)": {
    overflowX: "scroll",
  },
  "& table": {
    minW: "100%",
  },
  "& th": {
    textAlign: "center",
  },
  "& td:first-child": {
    verticalAlign: "middle",
  },
  "& th, & td": {
    whiteSpace: "nowrap",
  },
  "& ul": {
    pl: "1.5rem",
    listStyle: "disc",
  },
  "& ol": {
    pl: "1.5rem",
    listStyle: "decimal",
  },
  "& td ul, & li ul, & td ol, & li ol": {
    mt: "0",
  },
  "& li": {
    padding: "0.25rem 0",
  },
  "& code": {
    fontFamily: "mono",
  },
  "& img": {
    maxW: "100%",
  },
  "& *:first-child": {
    mt: "0",
  },
  "& *:last-child": {
    mb: "0",
  },
});
