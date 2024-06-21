import { Button, Checkbox, Paper, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"

type PropsType={
    todo:TodoItemType,
    completeHandler:(id:string)=>void,
    deleteHandler:(id:string)=>void,
    editHandler:(id:string,title:string)=>void
}

const TodoItem = ({todo,completeHandler,deleteHandler,editHandler}:PropsType) => {
    const [edit,setEdit]=useState<boolean>(false);
    const [textVal,setTextVal]=useState<string>(todo.title)
  return (
    <Paper sx={{ padding: "1rem" }}>
      <Stack direction="row" alignItems="center">
        {edit ? (
          <TextField
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textVal !== ""){
                editHandler(todo.id, textVal);
                setEdit(false);
              }
            }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo.title}</Typography>
        )}
        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeHandler(todo.id)}
        />
        <Button onClick={() => setEdit((prev) => !prev)}>{edit?"Done":"Edit"}</Button>
        <Button onClick={() => deleteHandler(todo.id)}>🗑️</Button>
      </Stack>
    </Paper>
  );
}

export default TodoItem