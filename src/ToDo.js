import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CheckIcon from '@mui/icons-material/CheckCircleRounded';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useContext , useState} from 'react';
import { TodosContext } from './TodosContext.js';


export default function ToDo({todo,showDeleteDialog,showEditDialog}){
    
    

    const {todos,setTodos}=useContext(TodosContext);
    function handleCheckClick(){
        const UpdateTodos = todos.map((t)=>{
            if(t.id === todo.id){
                t.isCompleted = !t.isCompleted;
            }
            return t
        })
        setTodos(UpdateTodos);
        localStorage.tasks = JSON.stringify(UpdateTodos) ;
    }
    
    
    
    function handleDeleteClick(){
        showDeleteDialog(todo);

    }
    function handleEditClick(){
        showEditDialog(todo);
    }
    

    return(
        <>
        
         
         
        <Card 
        className="ToDoCard"
        sx={{ minWidth: 200 , backgroundColor:"#283593" , color:"white", marginTop:"10px" }}>
            <CardContent>
                
                <Grid container style={{height:"40px"}}>
                <Grid size={8} >
                    <Typography gutterBottom sx={{textAlign:"left", padding:"0px 10px", textDecoration: todo.isCompleted ? "line-through" : "none" }}  variant="h5">
                       {todo.title} 
                    </Typography>
                    <Typography gutterBottom sx={{textAlign:"left", padding:"0px 10px" , fontSize:"12px"}} >
                        {todo.detail}
                    </Typography>
                </Grid>
                <Grid size={4} display="flex" justifyContent="space-around" alignItems="center" >
                  <IconButton 
                  onClick={handleCheckClick} 
                  className="btn"
                  aria-label="delete" 
                  style={{
                    color: todo.isCompleted ? "white" : "#8bc34a",
                    backgroundColor:todo.isCompleted ? "#8bc34a" : "white",
                    border:"solid 3px #8bc34a"}}>
                        <CheckIcon />
                  </IconButton>
                  <IconButton 
                  onClick={handleEditClick}
                  className="btn"
                  aria-label="delete" 
                  style={{color:"#180882ff", backgroundColor:"white", border:"solid 3px #180882ff"}}>
                        <EditOutlinedIcon />
                  </IconButton>
                  <IconButton 
                  onClick={handleDeleteClick} 
                  className="btn"
                  aria-label="delete" 
                  style={{color:"#c50d0dff", backgroundColor:"white", border:"solid 3px #c50d0dff"}}>
                        <DeleteIcon />
                  </IconButton>
                </Grid>
                
            </Grid>
                </CardContent>
            </Card>
        </>
    )
}