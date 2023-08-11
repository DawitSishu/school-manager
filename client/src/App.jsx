 import './App.css'
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LogIn from './Components/Login';
import Student from './Components/Student';
import Teacher from './Components/Teacher';
import Spinner from './Components/Spinner/Spinner';
import Director from './Components/Director';

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
        <Route path='/' element={<Spinner />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/profile' element={<Student />} />
        <Route path='/teacher' element={<Teacher />} />
        <Route path='/director' element={<Director />} />
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
