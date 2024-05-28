import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useGetBooksQuery } from "../services/books";
import CryptoJS from "crypto-js";
import UpdateBook from "../components/UpdateBook";
import DeleteBook from "../components/DeleteBook";

const generateSign = () => {
  const Key = localStorage.getItem("userKey") as string;
  const url = "/books";
  const method = "GET";
  const secret = localStorage.getItem("secret") ?? "";
  const Sign = CryptoJS.MD5(`${method}${url}${secret}`).toString();
  return { Key, Sign };
};

export default function Books() {
  const { data, error } = useGetBooksQuery(generateSign());

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ padding: "20px 0px" }}>
        <Typography variant="h1" color="error">
          Data is empty
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ padding: "20px 0px" }}>
      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        {data?.data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.book.id}>
            <Card
              sx={{
                minWidth: 275,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {item.book.author}
                </Typography>
                <Typography variant="h5" component="div">
                  {item.book.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Published {item.book.published}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">
                    Pages {item.book.pages}
                  </Typography>
                  <Typography variant="body2">Status {item.status}</Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <UpdateBook id={item.book.id} value={item.status} />
                  <DeleteBook id={item.book.id} />
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
