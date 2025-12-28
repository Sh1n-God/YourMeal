import React, { useState } from "react";
import { Product, useProductStore } from "../store/productStore";
import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import ItemPopup from "./ItemPopup";

interface ProductsListProps {
  products: Product[];
  activeCategory: string;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  activeCategory,
}) => {
  const { addToCart } = useProductStore();
  const [selected, setSelected] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const openPopup = (product: Product) => {
    setSelected(product);
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
    setSelected(null);
  };
  return (
    <Stack gap={2}>
      <Typography variant="h2">{activeCategory}</Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid size={{ xs: 6, sm: 3, md: 6, lg: 4 }} key={product.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: { xs: 0.5, md: 1.5 },
                borderRadius: { xs: 3, md: 4.5 },
                backgroundColor: "#FFFFFF",
                cursor: "pointer",
              }}
              onClick={() => openPopup(product)}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  borderRadius: { xs: 2, md: 3 },
                  mb: { xs: 1.25, md: 2 },
                }}
              />
              <Typography variant="h3" sx={{ mb: { xs: 0.5, md: 1 } }}>
                {product.price} ₴
              </Typography>
              <Typography variant="body1" sx={{ mb: { xs: 2, md: 3.625 } }}>
                {product.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: { xs: 1 }, color: "#B1B1B1" }}>
                {product.weight}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                Добавить
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      <ItemPopup product={selected} open={open} onClose={closePopup} />
    </Stack>
  );
};

export default ProductsList;
