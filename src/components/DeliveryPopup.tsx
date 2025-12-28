import React, { useState } from "react";
import { Dialog, Typography, RadioGroup, FormControlLabel, Radio, Stack, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, useMediaQuery, Box } from "@mui/material"
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import donut from '../assets/delivery_donut.png';
import { SubmitHandler, useForm } from "react-hook-form"


interface DeliveryPopupProps {
    open: boolean;
    onClose: () => void;
    paperSx?: SxProps<Theme>;
}

interface OrderFormValues {
    name?: string;
    phone?: string;
    adress?: string;
    floor?: string;
    flatNum?: string;
    // method хранится во внешнем состоянии, не в форме
}

const DeliveryPopup: React.FC<DeliveryPopupProps> = ({ open, onClose, paperSx }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const { register, handleSubmit, formState: { errors } } = useForm<OrderFormValues>();
    const [method, setMethod] = useState<'pickup' | 'delivery'>('pickup');
    const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => setMethod(e.target.value as 'pickup' | 'delivery')
    const onSubmit: SubmitHandler<OrderFormValues> = async (data) => {
        try {
            const payload = {
                ...data,
                method, // 'pickup' | 'delivery'
                // продублируем правильное имя поля адреса
                address: data.adress,
            };
            console.log("Отправляем данные:", payload);

            const response = await fetch("http://localhost:5000/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            console.log("Ответ API:", result);

            // Очистка формы
            alert("✅ Данные успешно отправлены!");
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            alert("❌ Не удалось отправить данные.");
        }
    };

    return (
        <Dialog
            onClose={onClose}
            open={open}
            fullScreen={isXs}
            slotProps={{
                paper: {
                    sx: [
                        {
                            boxSizing: 'border-box',
                            height: { xs: '100dvh', sm: 'auto' },
                            borderRadius: { xs: 0, sm: 6 },
                            p: { xs: "32px 10px", sm: "20px 16px 29px", md: 0 },
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            m: 0,
                            width: { xs: "100%", sm: "calc(100% - 2*(100vw / 6.3))" },
                            maxHeight: '100dvh',
                            maxWidth: '684px',
                            minHeight: { sm: "345px", md: "435px" }
                        },
                        paperSx,
                    ] as SxProps<Theme>,
                },
            }}
        >
            <Box sx={{ display: { xs: 'block', md: 'flex' }, flex: 1, minHeight: { md: '100%' } }}>
                <Box
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        width: { md: '50%' },
                        flex: { md: '0 0 50%' },
                        bgcolor: '#FFAB08',
                        p: { md: '65px 21px 65px 19px' },
                        boxSizing: 'border-box',
                    }}
                >
                    <img src={donut} alt="donught" />
                </Box>
                <Box
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        flex: { md: '0 0 50%' },
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: { md: '100%' },
                        p: 0,
                        minWidth: 0,
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: { md: '100%' }, p: { xs: 0, md: "44px 24px 24px" }, boxSizing: 'border-box' }}>
                        <DialogTitle sx={{ p: 0, mb: { xs: 2.25, md: 0 } }}>
                            <Typography variant="h3">Доставка</Typography>
                            <IconButton
                                onClick={onClose}
                                sx={{
                                    position: "absolute",
                                    right: { xs: 10, sm: 16 },
                                    top: { xs: 10, sm: 16 },
                                    p: 0,
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent sx={{ p: 0, pt: { md: "16px !important" }, flex: 1, overflow: 'auto', mb: { sm: 3, md: 4 }, maxWidth: { xs: "100vw", sm: '300px', md: '100%' } }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack sx={{ gap: 1, mb: { xs: 3, sm: 2 } }}>
                                    <TextField
                                        {...register("name", { required: true, pattern: /^[A-Za-z ]+$/i })}
                                        label={
                                            errors?.name?.type === "pattern"
                                                ? "Недопустимые символы"
                                                : errors?.name
                                                    ? "Обязательное поле"
                                                    : "Имя"
                                        }
                                        placeholder="Имя"
                                        error={Boolean(errors?.name)}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        {...register("phone", { required: true, pattern: /^\+?380\d{9}$/ })}
                                        label={
                                            errors?.phone?.type === "pattern"
                                                ? "Формат +380XXXXXXXXX"
                                                : errors?.phone
                                                    ? "Обязательное поле"
                                                    : "Номер телефона"
                                        }
                                        placeholder="Номер телефона"
                                        error={Boolean(errors?.phone)}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Stack>
                                <RadioGroup value={method} onChange={onChangeRadio} sx={{ gap: { sm: 1, md: 1.5 }, mb: { xs: 3, sm: 2 } }}>
                                    <FormControlLabel value="pickup" control={<Radio />} label="Самовывоз" />
                                    <FormControlLabel value="delivery" control={<Radio />} label="Доставка" />
                                </RadioGroup>
                                {method === 'delivery' && (
                                    <Stack direction='column' spacing={1}>
                                        <TextField
                                            {...register("adress", { required: true })}
                                            label={errors?.adress ? "Обязательное поле" : "Адрес"}
                                            placeholder="Адрес"
                                            error={Boolean(errors?.adress)}
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <Stack direction="row" spacing={{ xs: 1, sm: 0.5, md: 1 }}>
                                            <TextField
                                                {...register("floor", { required: true, min: 1, maxLength: 3 })}
                                                label={
                                                    errors?.floor?.type === "min"
                                                        ? "Минимум первый"
                                                        : errors?.floor?.type === "maxLength"
                                                            ? "Не больше 3 цифр"
                                                            : errors?.floor
                                                                ? "Обязательное поле"
                                                                : "Этаж"
                                                }
                                                placeholder="Этаж"
                                                error={Boolean(errors?.floor)}
                                                variant="outlined"
                                                sx={{ flex: 1 }}
                                            />
                                            <TextField
                                                {...register("flatNum", { required: true, min: 1, maxLength: 4 })}
                                                label={
                                                    errors?.flatNum?.type === "min"
                                                        ? "Минимум первая"
                                                        : errors?.flatNum?.type === "maxLength"
                                                            ? "Не больше 4 цифр"
                                                            : errors?.flatNum
                                                                ? "Обязательное поле"
                                                                : "Квартира"
                                                }
                                                placeholder="Квартира"
                                                error={Boolean(errors?.flatNum)}
                                                variant="outlined"
                                                sx={{ flex: 1 }}
                                            />
                                        </Stack>
                                    </Stack>
                                )}
                            </form>
                        </DialogContent>
                        <DialogActions sx={{ p: 0, maxWidth: { xs: "100vw", sm: '300px', md: '100%' } }}>
                            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)} fullWidth >Оформить</Button>
                        </DialogActions>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}
export default DeliveryPopup;
