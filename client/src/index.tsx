import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import Store from './store/store';

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
})

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      primary: {
        light:string,
        main:string,
        contrastText:string,
      },
      secondary: {
        main:string,
        light:string,
      },
  
    },
    typography: {
      body1: {
        fontWeight:number,
        fontSize:string
      },
      body2: {
        fontSize:string,
      },
      fontFamily: string[],
    },
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#42a5f5',
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
    },
    info: {
      main: '#ffffff'
    }
  },
  typography: {
    body1: {
      
      fontWeight: 700,
      fontSize: '1.1rem'
    },
    body2: {
      fontSize: '1.35rem',
      '@media (max-width:576px)': {
        fontSize: '0.875rem',
      },
    },
    fontFamily: [
      'Axiforma',
      'Nunito',
      'sans-serif'
    ].join(','),
  },

})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      store
    }}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Context.Provider>
  </React.StrictMode>
);

