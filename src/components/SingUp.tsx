import { Container, Grid } from "@mui/material";

export default function SingUp() {
  return (
    <Container maxWidth="xl" style={{ height: "100vh" }}>
      <Grid container spacing={2} style={{ height: "100%" }}>
        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Item 1
        </Grid>
        <Grid item xs={6}>
          Item 2
        </Grid>
      </Grid>
    </Container>
  );
}
