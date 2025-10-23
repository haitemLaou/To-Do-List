import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useContext, useEffect , useMemo} from 'react';
import { v4 as uuidv4 } from 'uuid';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



import ToDo from './ToDo.js';
import { TodosContext } from './TodosContext.js';
import { ToastContext } from './ToastContext.js';






export default function ToDoList() {
    const [titleInp,SettitleInp]= useState("");
    const {todos,setTodos}= useContext(TodosContext)
    const [showDeleteAlert,setShowDeleteAlert ]= useState(false);
    const [display,setDisplay]=useState("all");
    const [deleteTask, setDeleteTask] = useState(null);
    const [updatedTodo,setUpdatedTodo] = useState({title:"", detail:""})
    const [showUpdateAlert,setShowUpdateAlert ]= useState(false);
    const {showHideToast} = useContext(ToastContext);
    const completedTodos = useMemo(()=>{
        return todos.filter((t)=>{
                return t.isCompleted
                }) 
    },[todos])
    const notCompletedTodos = useMemo(()=>{
        return todos.filter((t)=>{
                return !t.isCompleted
                }) 
    },[todos])

    let displayList = todos;
    if(display=="completed"){
        displayList = completedTodos;
    }else if(display == "non-completed"){
        displayList = notCompletedTodos;
    }else{
        displayList = todos;
    }

    const todolist = displayList.map((t)=>{
    return <ToDo key={t.id} todo={t} showDeleteDialog={handleDeleteClick} showEditDialog={handleEditClick} />
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
    showHideToast("Added successfully");
    }
    
    function handleDeleteClick(todo){
        setDeleteTask(todo);
        setShowDeleteAlert(true);
    }
    function handleDeleteDialogClose(){
        setShowDeleteAlert(false);
    }
    function deleteTaskfunction(){
        const UpdateTodos = todos.filter((t)=>{
            return t.id != deleteTask.id
        })
        setTodos(UpdateTodos);
        localStorage.tasks = JSON.stringify(UpdateTodos) ; 
        setShowDeleteAlert(false);
        showHideToast("Deleted successfully");
    }
    function handleEditDialogClose(){
        setShowUpdateAlert(false);
    }
    function handleEditClick(todo){
        setUpdatedTodo(todo);
        setShowUpdateAlert(true);
    }
    function EditTask(){
        const UpdateTodos = todos.map((t)=>{
            if(t.id === updatedTodo.id){
                return updatedTodo
            }
            return t
        })
        setTodos(UpdateTodos); 
        localStorage.tasks = JSON.stringify(UpdateTodos) ;
        setShowUpdateAlert(false);
        showHideToast("Edited successfully");
    }
            
    function handleDisplayedType(e){
        setDisplay(e.target.value)
        
    }


    useEffect(() => {
  const storageTodos = JSON.parse(localStorage.getItem("tasks") || "[]");
  setTodos(storageTodos);
  }, []);

  return (
    <>
        <Dialog
        open={showDeleteAlert}
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
          <Button  autoFocus onClick={deleteTaskfunction}>
            Delete
          </Button>
        </DialogActions>
        </Dialog>
        <Dialog
        open={showUpdateAlert}
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
              value={updatedTodo.detail}
              onChange={(e)=>{setUpdatedTodo({...updatedTodo,detail:e.target.value})}}

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
    </>
      
  );
}
