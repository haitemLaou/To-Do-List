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


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ToDo({todo}){
    const [showDeleteAlert,setShowDeleteAlert ]= useState(false);
    const [showUpdateAlert,setShowUpdateAlert ]= useState(false);
    const [updatedTodo,setUpdatedTodo] = useState({title:todo.title,details:todo.detail})

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
    function deleteTask(){
        const UpdateTodos = todos.filter((t)=>{
            return t.id != todo.id
        })
        setTodos(UpdateTodos);
        localStorage.tasks = JSON.stringify(UpdateTodos) ; 
    }
    
    function handleDeleteClick(){
        setShowDeleteAlert(true);
    }
    function handleDeleteDialogClose(){
        setShowDeleteAlert(false);

    }
    function handleEditDialogClose(){
        setShowUpdateAlert(false);
    }
    function handleEditClick(){
        setShowUpdateAlert(true);
    }
    function EditTask(){
        const UpdateTodos = todos.map((t)=>{
            if(t.id === todo.id){
                t.title = updatedTodo.title;
                t.detail = updatedTodo.details;
            }
            return t
        })
        setTodos(UpdateTodos); 
        localStorage.tasks = JSON.stringify(UpdateTodos) ;
        setShowUpdateAlert(false);
    }
    const open = showDeleteAlert;
    const openEdit = showUpdateAlert;
    return(
        <>
        
         <Dialog
        open={open}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, this action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button  autoFocus onClick={deleteTask}>
            Delete
          </Button>
        </DialogActions>
         </Dialog>
         <Dialog
        open={openEdit}
        onClose={handleEditDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit the task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="task title"
              value={updatedTodo.title}
              onChange={(e)=>{setUpdatedTodo({...updatedTodo,title:e.target.value})}}
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Task details"
              value={updatedTodo.details}
              onChange={(e)=>{setUpdatedTodo({...updatedTodo,details:e.target.value})}}

              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button  autoFocus onClick={EditTask}>
            Confirm
          </Button>
        </DialogActions>
         </Dialog>
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