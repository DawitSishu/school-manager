import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import TelegramIcon from '@mui/icons-material/Telegram';
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              About Us
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#fff" }}
            >
              Our school is dedicated to providing students with an exceptional
              and personalized learning experience. We are committed to creating
              a nurturing environment where students can thrive academically,
              socially, and emotionally. Our goal is to equip students with the
              knowledge, skills, and values necessary for their future success.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#fff" }}
            >
              HVW7+667, Dire Dawa, Ethiopia
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#fff" }}
            >
              Email: info@example.com
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#fff" }}
            >
              Phone: +251-9-123-123-123
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook sx={{ color: "#fff" }} />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram sx={{ color: "#fff" }} />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter sx={{ color: "#fff" }} />
            </Link>
            <Link
              href="https://www.tiktok.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <TelegramIcon  sx={{ color: "#fff" }}/>
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ color: "#fff" }}
          >
            {"Copyright © "}
            <Link
              to="/"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "gold",
              }}
            >
              Notre Dame School
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
