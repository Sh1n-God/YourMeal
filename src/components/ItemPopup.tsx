import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    IconButton,
    Typography,
    Box,
    Button,
    Stack,
    styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SxProps, Theme } from '@mui/material/styles';
import { Product, useProductStore } from '../store/productStore';

interface ItemPopupProps {
    open: boolean;
    onClose: () => void;
    product?: Product | null;
    paperSx?: SxProps<Theme>;
}

const StyledImage = styled('img')({
    objectFit: 'cover',
    borderRadius: '16px'
});

const ItemPopup: React.FC<ItemPopupProps> = ({ open, onClose, product, paperSx }) => {
    const { addToCart } = useProductStore();
    const [count, setCount] = useState(1);

    const handleAdd = () => {
        if (!product) return;
        for (let i = 0; i < count; i += 1) {
            addToCart(product);
        }
        setCount(1);
        onClose();
    };
    const handleInc = () => setCount((c) => c + 1);
    const handleDec = () => setCount((c) => (c > 1 ? c - 1 : c));
    const handleClose = () => { setCount(1); onClose(); };
    const getPrice = () => {
        if (!product) return 0;
        return product.price * count;
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            // full screen only on small screens (<= 600px)
            fullScreen={typeof window !== 'undefined' && window.matchMedia('(max-width:600px)').matches}
            slotProps={{
                paper: {
                    sx: [
                        {
                            boxSizing: 'border-box',
                            height: { xs: '100dvh', sm: 'auto' },
                            borderRadius: { xs: 0, sm: 6 },
                            p: { xs: "32px 10px", sm: "16px 16px 24px", md: "24px 24px 36px" },
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            m: 0,
                            width: { xs: "100%", sm: "calc(100% - 2*(100vw / 6.3))" },
                            maxHeight: '100dvh',
                            maxWidth: '684px',
                        },
                        paperSx,
                    ] as SxProps<Theme>,
                },
            }}
        >
            <DialogTitle sx={{ p: 0, mb: { xs: 1.5, sm: 2, md: 3 } }}>
                <Typography variant="h2">{product ? product.name : 'Товар'}</Typography>
                <IconButton
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: { xs: 10, sm: 16, md: 24 }, top: { xs: 10, sm: 16, md: 24 }, p: 0 }}
                    aria-label="Закрыть"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0, flex: 1, overflow: 'auto', mb: { sm: 3, md: 5 } }}>
                {product ? (
                    <Stack direction={{ xs: "column", sm: "row" }} gap={{ xs: 2, sm: 1, md: 2 }}>
                        <StyledImage
                            src={product.image}
                            alt={product.name}
                            sx={{ width: { xs: '100%', sm: '100%' }, maxWidth: { sm: 'calc(100% - 50px)' } }}
                        />
                        <Box>

                            {product.description && (
                                <Typography variant="body1">
                                    {product.description}
                                </Typography>
                            )}
                            {product.ingridient && (
                                <Box sx={{ mt: 1.25 }}>
                                    <Typography variant="subtitle2">
                                        Состав:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 0.5 }}>
                                        {product.ingridient.split(',').map((ing, idx) => {
                                            const clean = ing.trim();
                                            const capped = clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : clean;
                                            return (
                                                <Typography key={idx} variant="subtitle2">{capped}</Typography>
                                            );
                                        })}
                                    </Box>
                                </Box>
                            )}
                            <Typography variant="subtitle2" sx={{ color: '#B1B1B1', mt: 0.5 }} >
                                {product.weight}
                                {typeof product.kkall === 'number' ? `, ккал ${product.kkall}` : ''}
                            </Typography>
                        </Box>
                    </Stack>
                ) : (
                    <Typography variant="body1">Товар не найден</Typography>
                )}
            </DialogContent>
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "inherit", sm: 'center' }}>
                <DialogActions sx={{ p: 0, mb: { xs: 2, sm: 0 }, maxWidth: { xs: "300px", md: "376px" }, flexGrow: 1 }} >
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleAdd}
                        disabled={!product}
                    >
                        Добавить
                    </Button>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            bgcolor: '#F2F2F3',
                            flexShrink: 0,
                            borderRadius: 2,
                            px: 0.375,
                            width: { xs: 68, md: 74 },
                            height: { xs: 30, md: 40 },
                        }}
                    >
                        <Button
                            onClick={handleDec}
                            size="small"
                            disabled={count <= 1}
                            sx={{
                                minWidth: 'inherit',
                                px: 0.625,
                                color: 'text.primary',
                                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                            }}
                        >
                            <Typography variant="body1">-</Typography>
                        </Button>
                        <Typography variant="body1">{count}</Typography>
                        <Button
                            onClick={handleInc}
                            size="small"
                            sx={{
                                minWidth: 'inherit',
                                px: 0.625,
                                color: 'text.primary',
                                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                            }}
                        >
                            <Typography variant="body1">+</Typography>
                        </Button>
                    </Stack>
                </DialogActions>
                <Typography variant='h3' align='right'>{getPrice()}₴</Typography>
            </Stack>
        </Dialog >
    );
};

export default ItemPopup;
