import { styled } from "@/lib/style/system/jsx";

type Props = {
  children: React.ReactNode;
};

export function Article({ children }: Props) {
  return (
    <styled.article
      css={{
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          mt: "2rem",
          fontWeight: "bold",
          lineHeight: "1.5",
        },
        "& ul, & ol, & table, & img, & code, & blockquote, & dl, & iframe": {
          mt: "1rem",
        },
        "& p": {
          mt: "1rem",
        },
        "& h1": {
          fontSize: "1.75rem",
        },
        "& h2": {
          paddingBottom: "0.25rem",
          borderBottom: "2px solid token(colors.border)",
          fontSize: "1.5rem",
        },
        "& h3": {
          fontSize: "1.5rem",
        },
        "& h4": {
          fontSize: "1.25rem",
        },
        "& h5": {
          fontSize: "1.1rem",
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
          padding: "0.1rem 0",
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
      }}
    >
      {children}
    </styled.article>
  );
}
