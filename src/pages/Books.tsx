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

export default function Books() {
  const generateSign = () => {
    const Key = localStorage.getItem("userKey") as string;
    const url = "/books";
    const method = "GET";
    const body = "";
    const secret = localStorage.getItem("secret");
    const Sign = CryptoJS.MD5(`${method}${url}${body}${secret}`).toString();
    return { Key, Sign };
  };
  const { data, error } = useGetBooksQuery(generateSign());

  return (
    <Container maxWidth="xl" sx={{ padding: "20px 0px" }}>
      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        {error ? (
          <div>
            <h1 style={{ color: "red" }}>Xatolik yuz berdi</h1>
          </div>
        ) : (
          data?.data?.map((item) => (
            <Grid item xs={3} key={item.book.id} sx={{ height: "100%" }}>
              <Card sx={{ minWidth: 275 }}>
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
                    published {item.book.published}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">
                      pages {item.book.pages}
                    </Typography>
                    <Typography variant="body2">
                      status {item.status}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <UpdateBook id={item.book.id} />
                    <DeleteBook id={item.book.id} />
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
