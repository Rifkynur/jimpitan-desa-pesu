import React, { Children } from "react";
import { Box } from "@mui/material";

const Container = ({ children }) => {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",

        [theme.breakpoints.down("sm")]: {
          //   width: "50px",
          padding: "16px",
        },
        [theme.breakpoints.up("md")]: {
          padding: "24px",
          //   width: "75px",
        },
      })}
    >
      {children}
    </Box>
  );
};

export default Container;
