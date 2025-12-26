import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Categories from "./Categories";
import Basket from "./Basket";
import { useProductStore } from "../store/productStore";
import { products } from "../data/products";
import ProductsList from "./ProductsList";
import {
  defaultCategory,
  defaultCategorySlug,
  getCategoryBySlug,
} from "../store/categoryStore";
import DeliveryPopup from "./DeliveryPopup";
import Footer from "./Footer";
import { Navigate, useParams } from "react-router-dom";


const Layout: React.FC = () => {
  const { setProducts } = useProductStore();
  const { slug } = useParams<{ slug?: string }>();
  const activeCategory = React.useMemo(() => {
    if (!slug) return defaultCategory;
    try {
      const decoded = decodeURIComponent(slug);
      return getCategoryBySlug(decoded)?.label ?? defaultCategory;
    } catch {
      return defaultCategory;
    }
  }, [slug]);
  const [open, setOpen] = useState(false)
  const onCloseDelivery = () => {
    setOpen(false)
  }
  const onOpenDelivery = () => {
    setOpen(true)
  }
  React.useEffect(() => {
    setProducts(products);
  }, [setProducts]);
  const filteredProducts = React.useMemo(() => {
    return products.filter((p: { category: string }) => p.category === activeCategory);
  }, [activeCategory]);
  const activeSlug = slug ?? defaultCategorySlug;
  if (!getCategoryBySlug(activeSlug)) {
    return <Navigate to={`/${encodeURIComponent(defaultCategorySlug)}`} replace />;
  }
  return (
    <Stack
      direction="column"
      minHeight="100vh"
      bgcolor="#F9F9F9"
      overflow="hidden"
    >
      <Box component="header">
        <Header />
      </Box>
      <Box component="main" flexGrow={1}
        sx={{
          position: "relative",
          mt: { xs: 3.75, md: 5 },
          px: { xs: 1.25, sm: 8, md: 4 },
          boxSizing: "border-box",
          width: "100vw",
        }}>
        <Categories activeCategory={activeSlug} />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3.75}
          mt={{ xs: 3.75, md: 6.25 }}
        >
          <Basket openDelivery={onOpenDelivery} />
          <ProductsList products={filteredProducts} activeCategory={activeCategory} />
        </Stack>
      </Box>
      <Box component="footer">
        <Footer />
      </Box>
      <DeliveryPopup open={open} onClose={onCloseDelivery} />
    </Stack>
  );
};

export default Layout;
