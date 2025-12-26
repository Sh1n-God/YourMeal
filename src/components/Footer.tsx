import { Typography, Stack, IconButton } from "@mui/material";
import Call from "../assets/Call.png";
import TG from "../assets/Icons/TgIcon.tsx";
import VK from "../assets/Icons/VkIcon.tsx";
import YourMeal from "../assets/Icons/YourMealIcon.tsx";

const Footer: React.FC = () => {
    return (
        <Stack sx={{ p: { xs: '23px 7px 27px', sm: "40px 64px 26px", md: "52px 32px 39px", lg: "51px 75px 40px" }, mt: { xs: 10, md: 12.5 } }} bgcolor={'#FFF'} gap={{ xs: 4.25, sm: 6.5, md: 5.625 }}>
            <Stack direction={{ xs: "column", md: "row" }} alignItems={{ md: "center" }} justifyContent={{ md: "space-between" }} gap={{ xs: 3, sm: 4.5 }}>
                <Stack direction="row" gap={{ xs: 0.5, md: 1 }}>
                    <Typography variant="h1" color="#FF7020">
                        YourMeal
                    </Typography>
                    <Typography fontSize={{ xs: 36, md: 56 }}>
                        <YourMeal />
                    </Typography>
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} gap={{ xs: 3, sm: 22, md: 6.25, lg: 15.75 }}>
                    <Stack gap={{ xs: 1, md: 3 }} >
                        <Typography variant="subtitle1">Номер для заказа</Typography>
                        <Stack direction="row" gap={0.5} alignItems={"center"}>
                            <img src={Call} alt="call" />
                            <Typography variant="body1">+7(930)833-38-11</Typography>
                        </Stack>
                    </Stack>
                    <Stack gap={{ xs: 1, md: 3 }}>
                        <Typography variant="subtitle1">Мы в соцсетях</Typography>
                        <Stack direction="row" gap={2}>
                            <IconButton
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    bgcolor: '#FF7020',
                                    '&:hover': { bgcolor: '#FFAB08' },
                                    p: 0,
                                }}
                                aria-label="VK"
                            >
                                <VK />
                            </IconButton>
                            <IconButton
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    bgcolor: '#FF7020',
                                    '&:hover': { bgcolor: '#FFAB08' },
                                    p: 0,
                                }}
                                aria-label="Telegram"
                            >
                                <TG />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack gap={0.5}>
                <Typography component="p" sx={{ fontSize: "12px !important", lineHeight: "12px" }}>
                    © YouMeal, 2022
                </Typography>
                <Typography component="p" sx={{ fontSize: "12px !important", lineHeight: "12px" }}>
                    Design: Anastasia Ilina
                </Typography>
            </Stack>
        </Stack>
    )
};
export default Footer;

