import React from "react";

import { Grid, Typography } from "@mui/material";

function Success() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <Typography variant="h3">Payment successful!</Typography>
      </Grid>
    </Grid>
  );
}

export default Success;

