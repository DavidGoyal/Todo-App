import { AppBar, Button, Container, Stack, TextField, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import TodoItem from "./Components/TodoItem";

const getTodos=():TodoItemType[]=>{
  const todos=localStorage.getItem("todos");
  return todos?JSON.parse(todos):[];
}

const App = () => {
  const [todos,setTodos]=useState<TodoItemType[]>(getTodos());
  const [title,setTitle]=useState<string>("");

  const completeHandler=(id:string):void=>{
    setTodos((prev)=>prev.map((todo)=>(
      todo.id===id?{...todo,isCompleted:!todo.isCompleted}:todo
    )))
  }

  const deleteHandler=(id:string):void=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
  }

  const submitHandler=():void=>{
    if(title.trim().length===0) return;
    setTodos((prev)=>[...prev,{title,isCompleted:false,id:crypto.randomUUID()}])
    setTitle("");
  }

  const editHandler=(id:string,title:string):void=>{
    setTodos((prev)=>prev.map((todo)=>(
      todo.id===id?{...todo,title}:todo
    )))
  }

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])
  
  

  return (
    <Container maxWidth="sm" sx={{height:"100vh",maxHeight:"100%"}}>

      <AppBar position="static">
        <Toolbar>
          <Typography>Todo App</Typography>
        </Toolbar>
      </AppBar>

      <Stack direction="column" height={"80%"} spacing={"1rem"} p={"1rem"} sx={{overflowY:"auto"}}>
        {todos&&todos.map((todo)=>(
          <TodoItem key={todo.id} todo={todo} completeHandler={completeHandler} deleteHandler={deleteHandler} editHandler={editHandler}/>
        ))}
      </Stack>

      <TextField fullWidth label="New Task" value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <Button sx={{margin:"1rem 0"}} variant="contained" fullWidth onClick={submitHandler}>Add</Button>
    </Container>
  )
}

export default App
