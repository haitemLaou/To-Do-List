import './App.css';
import ToDoList from './ToDoList';
import { TodosContext } from './TodosContext.js';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MySnackBar from './MySnackBar.js';
import { ToastContext } from './ToastContext.js';

const theme = createTheme({
  palette: {
    primary:{
      main: '#dd2c00',
    }
    
  },
});



const initialtodos = [
    {
        id:uuidv4(),
        title:"first",
        detail:"jkhdkjdhkjdh",
        isCompleted:true,

    },
    {
        id:uuidv4(),
        title:"second",
        detail:"jkhdkjjrhehjtdhkjdh",
        isCompleted:true,

    },
    {
        id:uuidv4(),
        title:"third",
        detail:"jkhdkjdlmtkmkezùmhkjdh",
        isCompleted:false,

    }
]

function App() {
  const [todos,setTodos] = useState(initialtodos);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  function showHideToast(mess){
    setOpen(true);
    setMessage(mess);
    setTimeout(() => {
      setOpen(false)
    }, 2000);
  }
  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={{showHideToast}} >
        <div className="App"style={{backgroundColor:"black" ,display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
          <MySnackBar open={open} message={message}/>
          <TodosContext.Provider value={{todos,setTodos}}>
            <ToDoList/>
          </TodosContext.Provider>
        
        </div>
      </ToastContext.Provider>
      
    </ThemeProvider>
    
  );
}

export default App;
