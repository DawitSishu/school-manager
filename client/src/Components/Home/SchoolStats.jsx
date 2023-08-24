import React from "react";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#FFFF",
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0px 3px 10px rgba(0, 0, 0, 1)",
  transition: "transform 0.3s ease-in-out",

  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const StyledNumber = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

const StyledLabel = styled(Typography)(({ theme }) => ({
  opacity: 0.8,
}));

const QuotationIcon = styled(FormatQuoteIcon)(({ theme }) => ({
  fontSize: "3rem",
  color: theme.palette.primary.contrastText,
  verticalAlign: "middle",
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: "0px 3px 10px rgba(0, 0, 0, 1)",
}));

const SchoolStats = () => {
  // Replace these numbers with actual data
  const numberOfStudents = 500;
  const numberOfStaff = 50;

  return (
    <StyledContainer m={3}>
      <Typography variant="h6" align="center" fontWeight="bold" mb={3}>
        <QuotationIcon />
        "Knowledge is the key that unlocks the doors of limitless possibilities"
        <QuotationIcon />
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        School Statistics
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <StyledNumber variant="h4">{numberOfStudents}</StyledNumber>
              <StyledLabel variant="subtitle1">Number of Students</StyledLabel>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <CardContent>
              <StyledNumber variant="h4">{numberOfStaff}</StyledNumber>
              <StyledLabel variant="subtitle1">
                Number of Staff Members
              </StyledLabel>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default SchoolStats;
