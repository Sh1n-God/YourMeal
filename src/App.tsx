import Layout from './components/Layout';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import theme from './theme';
import { defaultCategorySlug } from './store/categoryStore';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/400.css';
function App() {
  const defaultCategoryPath = `/${encodeURIComponent(defaultCategorySlug)}`;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={defaultCategoryPath} replace />} />
          <Route path="/:slug" element={<Layout />} />
          <Route path="*" element={<Navigate to={defaultCategoryPath} replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
