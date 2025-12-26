import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // или 'dark'
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#f5f5f5',
    },
    warning: {
      main: '#FF7020',
      light: '#FFAB08',
    },
    info: {
      main: '#F2F2F3',
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    h1: {
      fontSize: '30px',
      fontWeight: 800,
      '@media (min-width:768px)': {
        fontSize: '36px',
      },
      '@media (min-width:1024px)': {
        fontSize: '50px',
      },
    },
    h2: {
      fontSize: '28px',
      fontWeight: 600,
      '@media (min-width:1024px)': {
        fontSize: '40px',
      },
    },
    h3: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '16px',
      '@media (min-width:1024px)': {
        fontSize: '24px',
        lineHeight: '24px',
      },
    },
    subtitle1: {
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '16px',
      '@media (min-width:1024px)': {
        fontSize: '24px',
      },
    },
    subtitle2: {
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: 'inherit',
      '@media (min-width:1024px)': {
        fontSize: '12px',
      },
    },
    body1: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '16px',
      '@media (min-width:1024px)': {
        fontSize: '16px',
      },
    },
  },
  components: {
    MuiToggleButtonGroup: {
      styleOverrides: {
        firstButton: {
          borderRadius: '50px',
        },
        lastButton: {
          borderRadius: '50px',
        },
        middleButton: {
          borderRadius: '50px',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: '1px solid transparent',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          padding: '2px 8px',
          backgroundColor: '#fff',
          '@media (min-width:1024px)': {
            padding: '8px 14px',
            '&:hover': {
              border: '1px solid #F86310',
              backgroundColor: '#fff',
            },
          },
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
          '&.Mui-selected': {
            backgroundColor: '#FFAB08',
            color: '#000', '&:hover': {
              border: '1px solid #FFAB08',
              backgroundColor: '#FFAB08',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '9px 0',
          '@media (min-width:900px)': {
            padding: '12px 0',
            fontSize: "16px",
            lineHeight: "16px",
            borderRadius: "12px"
          },
          justifyContent: 'center',
          alignItems: 'center',
          textTransform: 'none',
          boxShadow: 'none',
          fontSize: '12px',
          lineHeight: '12px',
        },
        containedPrimary: {
          backgroundColor: '#FF7020',
          '&:hover': {
            backgroundColor: '#FFAB08',
          },
          color: '#fff',
        },
        containedSecondary: {
          backgroundColor: '#F2F2F3',
          '&:hover': {
            backgroundColor: '#FFAB08',
            color: '#000',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 12px',
          borderColor: '#F2F2F3',
          fontSize: '10px',
          width: '100%',
          // Focused state: highlight outline
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFAB08',
            borderWidth: 1,
          },
          // Error state: default MUI error color
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d32f2f',
          },
          // Filled (has value) state: highlight outline as on focus
          '&:has(input:not(:placeholder-shown)) .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFAB08',
            borderWidth: 1,
          },
          // Remove autofill background on WebKit
          '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #fff inset',
            boxShadow: '0 0 0 1000px #fff inset',
            WebkitTextFillColor: '#000',
            caretColor: '#000',
            transition: 'background-color 9999s ease-out 0s',
          },
          '& input:-webkit-autofill:focus': {
            WebkitBoxShadow: '0 0 0 1000px #fff inset',
            boxShadow: '0 0 0 1000px #fff inset',
          },
          '& input:-webkit-autofill:hover': {
            WebkitBoxShadow: '0 0 0 1000px #fff inset',
            boxShadow: '0 0 0 1000px #fff inset',
          },
        },
        input: {
          padding: 0,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontSize: "10px",
          marginLeft: "0px"
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        disableRipple: true,
        disableFocusRipple: true,
      },
      styleOverrides: {
        root: {

          color: '#F2F2F3',
          '&.Mui-checked': {
            color: '#000',
          },
          transition: 'none',
          '& .MuiSvgIcon-root': {
            transition: 'none',
            fontSize: '12px',
            width: 12,
            height: 12,
          },
          '& .MuiTouchRipple-root': { display: 'none' },
          padding: 0,
          margin: 0,
        },
      },
    },
  },
});


export default theme;
