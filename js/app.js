window.onload=function(){
const task_input=document.getElementById("task-input")
const date_input=document.getElementById("date-input")
const alert_message=document.getElementById("alert-message")
const add_input=document.getElementById("add-button")
const edit_input=document.getElementById("edit-button")
const Delete_all=document.getElementById("delet-all-b")
const filter_buttons=document.querySelectorAll(".filter-todos")
const filter_handler =(event)=>{
    let filter_todos
    const filter=event.target.dataset.filter
    switch (filter) {
        case "pending":
            filter_todos=todos.filter((todo)=>todo.completed===false)
            break;
        case "completed":
            filter_todos=todos.filter((todo)=>todo.completed===true)
            break;
        
    
        default:
            filter_todos=todos
            break;
    }
    display_tasks(filter_todos)
}
filter_buttons.forEach( (button )=>{
    button.addEventListener("click",filter_handler)
})


console.log(filter_buttons)
let todos= JSON.parse(localStorage.getItem("todos")) || []

todos_body=document.querySelector("tbody")
const generate_id=()=>{
    return Math.round(Math.random() * Math.random()* Math.pow(10,15)).toString()
}

const save_to_localstorage= ()=>(
    localStorage.setItem("todos",JSON.stringify(todos))
)
const show_alert =(message,type)=>{
    alert_message.innerHTML="";
    const alert=document.createElement("p")
    alert.innerText=message
    alert.classList.add("alert")
    alert.classList.add(`alert-${type}`)
    alert_message.append(alert)
    setTimeout(()=>{
        alert.style.display="none";
    },2000);
}


const display_tasks=(data)=>{
    const todo_list=data? data :todos
    todos_body.innerHTML=""
    if(!todo_list.length){
     todos_body.innerHTML="<tr><td colspan='4'>You have no task yet !!</td></tr>"
     return
    }
    
    todo_list.forEach(todo => {
        todos_body.innerHTML+=`<tr> <td>${todo.task}</td>
                                    <td>${todo.date || "No date"} </td>
                                    <td>${todo.completed ? "Completed" :"Pending"} </td>
                                    <td> <button onclick="edit_handler('${todo.id}')">Edit</button>
                                         <button onclick="change_handler('${todo.id}')">${todo.completed ? "Undo" : "Do"}</button>
                                         <button onclick="delete_handler('${todo.id}')" >Delete</button>
                                    </td>
                                    
                               </tr>`
    });

}
const delete_handler=(id)=>{
    const new_todos=todos.filter(todo=>todo.id!==id)
    todos=new_todos;
    save_to_localstorage()
    display_tasks()
    show_alert("task deleted successfuly","success")
}
const change_handler=(id)=>{
 console.log(todos)
 const todo = todos.find((todo)=>todo.id===id)
 current_status=todo.completed
 todo.completed=!todo.completed
 save_to_localstorage()
 display_tasks()
 if(current_status){
 show_alert("Task status changed successully","success")
 }
 else{
    show_alert("Great job !! you do your task" , "success")
 }
}
const edit_handler=(id)=>{
 const todo=todos.find((todo)=>todo.id===id)
 task_input.value=todo.task;
 date_input.value=todo.date;
 add_input.style.display="none";
 edit_input.style.display="inline-block";
 edit_input.dataset.id=id;
}
const apply_edit=(event)=>{
 const id=event.target.dataset.id;
 const todo=todos.find((todo)=>todo.id===id)
 todo.task=task_input.value;
 todo.date=date_input.value;
 save_to_localstorage()
 display_tasks()
 task_input.value=""
 date_input.value=""
 edit_input.style.display="none";
 add_input.style.display="inline-block";

}
window.edit_handler=edit_handler
window.delete_handler=delete_handler
window.change_handler=change_handler
const add_handler =()=>{
    const task=task_input.value;
    const date=date_input.value;
    const todo={
        id: generate_id(),
        task :task,
        date :date,
        completed:false,
    }
    if(task){
    todos.push(todo)
    display_tasks()
    save_to_localstorage()
    task_input.value="";
    date_input.value="";
    show_alert("to do added successfully","success")
    }
    else{
        show_alert("Pleas add a to do","error")
    }
}

const delet_all_handler=()=>{
    if(todos.length){
        todos=[]
        save_to_localstorage()
        display_tasks()
        show_alert("Tasks deleted successfully","success")
    }
    else{
        show_alert("No task to delete !","error")
    }
}

display_tasks()

edit_input.addEventListener("click",apply_edit)
add_input.addEventListener("click",add_handler)
Delete_all.addEventListener("click",delet_all_handler)
}