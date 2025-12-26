import { Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import burgerHeader from "../assets/burger_header.png";
import logo from "../assets/LogoHeader.png";
import burgerHeaderBig from "../assets/burger_header_big.png";

const Header: React.FC = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack
      //   bgcolor="orange"
      position="relative"
      zIndex={1}
      sx={{
        mb: 3.75,
        mt: 3,
        "&::before": {
          content: '""',
          display: "block",
          backgroundColor: "#FFAB08",
          borderRadius: "50%",
          position: "absolute",
          bottom: -4,

          left: "50%",
          transform: "translate(-50%, 4%)",
          zIndex: -1,
          width: "611px",
          height: "611px",

          "@media (min-width:321px) and (max-width:768px)": {
            width: "calc(430.58036vw - 766.85714px)",
            height: "calc(430.58036vw - 766.85714px)",
            transform: "translate(-50%, 1%)",
          },

          "@media (min-width:769px) and (max-width:1024px)": {
            width: "calc(132.8125vw + 1520px)",
            height: "calc(132.8125vw + 1520px)",
            transform: "translate(-50%, 1%)",
          },

          "@media (min-width:1025px)": {
            width: "2880px",
            height: "2880px",
            transform: "translate(-50%, 1%)",
          },
        }
      }}
    >
      <Stack direction="row" justifyContent="center" mb={3} gap={0.5}>
        <Typography variant="h2" fontWeight={800} sx={{ color: "white" }}>
          YourMeal
        </Typography>
        <img src={logo} alt="logo" />
      </Stack>
      <Grid container sx={{ flexDirection: { xs: "column", sm: "row-reverse" }, alignItems: { sm: "center" }, justifyContent: { sm: "center" }, gap: { sm: 1.25 } }} >
        <Grid>
          <Stack alignItems={{ xs: "center", sm: "start" }} mb={2.5}>
            <Stack alignItems={{ xs: "center", sm: "start" }} mb={{ xs: 2, sm: 3.25, md: 6.5 }}>
              <Typography variant="h1" sx={{ color: "white" }}>
                Только самые
              </Typography>
              <Typography variant="h1" sx={{ color: "red" }}>
                сочные бургеры!
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ color: "white" }}>
              Бесплатная доставка от 599₽
            </Typography>
          </Stack>
        </Grid>
        <Grid>
          <Stack alignItems="center">
            <img src={isMdUp ? burgerHeaderBig : burgerHeader} alt="burger" />
          </Stack>
        </Grid>
      </Grid>
    </Stack >
  );
};
export default Header;
