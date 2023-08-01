import './App.css'
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SignUp from './Components/Signup';
import LogIn from './Components/Login';
import Student from './Components/Student';

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFFF00",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768, 
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
function App() {

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <BrowserRouter>
    <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/profile' element={<Student />} />
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
