import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


import { TodosContext } from './TodosContext.js';

import ToDo from './ToDo.js';
import { justifyContent } from '@mui/system';







export default function ToDoList() {
    const [titleInp,SettitleInp]= useState("");
    const {todos,setTodos}= useContext(TodosContext)
    const [display,setDisplay]=useState("all");
    const completedTodos = todos.filter((t)=>{
        return t.isCompleted
    })
    const notCompletedTodos = todos.filter((t)=>{
        return !t.isCompleted
    })

    let displayList = todos;
    if(display=="completed"){
        displayList = completedTodos;
    }else if(display == "non-completed"){
        displayList = notCompletedTodos;
    }else{
        displayList = todos;
    }

    const todolist = displayList.map((t)=>{
    return <ToDo key={t.id} todo={t} />
    })

    function handleAddClick(){
    const newElement={
        id:uuidv4(),
        title:titleInp,
        detail:"",
        isCompleted:false,

    }
    const updatedTodos = [...todos,newElement]
    setTodos(updatedTodos);
    localStorage.tasks = JSON.stringify(updatedTodos) ;
    SettitleInp("");
    }
    
            
    function handleDisplayedType(e){
        setDisplay(e.target.value)
        
    }


    useEffect(()=>{
        setTodos(JSON.parse(localStorage.tasks));
    },[]) 

  return (
      <Container maxWidth="sm" >
                <Card sx={{ minWidth: 275 }} style={{
                    maxHeight:"80vh",
                    overflow:"auto",
                }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary'}} variant="h2">
                   My Tasks
                </Typography>
                <hr></hr>
                <ToggleButtonGroup
                    color="primary"
                     value={display}
                    exclusive
                    onChange={handleDisplayedType}
                    aria-label="Platform"
                    style={{display:"flex" , justifyContent:"center"}}
                >
                    <ToggleButton value="all" >All</ToggleButton>
                    <ToggleButton value="completed">Done</ToggleButton>
                    <ToggleButton value="non-completed">Undone</ToggleButton>
                </ToggleButtonGroup>
                    {todolist}
                <Grid container style={{marginTop:"20px"}} spacing={2}>
                    <Grid size={8} >
                        <TextField 
                        onChange={(e)=>{
                            SettitleInp(e.target.value)
                        }}
                        value={titleInp}
                        id="outlined-basic" 
                        label="Title of task" 
                        variant="outlined" 
                        style={{width:"100%"}}/>
                    </Grid>
                    <Grid size={4} display="flex" justifyContent="space-around" alignItems="center" >
                        <Button 
                        variant="contained" 
                        style={{width:"100%" , height:"100%"}} 
                        onClick={handleAddClick}
                        disabled={titleInp=="" }
                         >Add</Button>
                    </Grid>
                
                </Grid>

            </CardContent>
            </Card>
      </Container>
  );
}
