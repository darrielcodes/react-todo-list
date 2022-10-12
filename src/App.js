import { useState } from "react";
import "./App.css";

const App = () => {
  // state variable inititalizing data, later used as prop in child components
  const [toDoList, setToDoList] = useState([{
    title: "Implement ToDo List",
    priority: "High",
    isComplete: false,
    description: "Implement the todo list application",
    creationDate: new Date().toString(),
    completedDate: null
  }]); 

  const handleAddToDo = (title, priority, description) => {
    // create new variable with key/value pairs for to do item
    const newToDo = {
      title,
      priority,
      isComplete: false,
      description,
      creationDate: new Date().toString(),
      completedDate: null
    };
    // create copy of toDoList state variable array 
    const toDoListCopy = [...toDoList];
    // push newToDo item into copied array
    toDoListCopy.push(newToDo);
    // call setter function to update array
    return setToDoList(toDoListCopy)
  };

	return (
		<div className="App-header">
      {/* add toDoForm above the container, pass in handleAddToDo function as prop */}
      <ToDoForm handleAddToDo={handleAddToDo}/>
      {/* add container here to display list as prop */}
      <ToDoListContainer toDoList={toDoList}/>
		</div>
	);
};

// receives todo list as prop to map thru and display an item for every one in list
const ToDoListContainer = (props) => {
  return (
    <div>
      <h1>To Do List</h1>
      {/* pass in toDoList as prop, map through array*/}
      {props.toDoList.map((toDo, index) => {
        // return an item for every toDo in array, gives us access to toDo
        return <ToDoItem toDo={toDo} key={index}/>
      })}
    </div>
  )
};

const ToDoItem = (props) => {
  // verify access to toDo prop here
  console.log(props.toDo)
  return (
    <div>
      {/* display properties of toDo */}
  <h2>{props.toDo.title}</h2>
  <p>Priority: {props.toDo.priority}</p>
  <p>Creation Date: {props.toDo.creationDate}</p>
  {/* verifies if completedDate is defined/truthy */}
  {props.toDo.completedDate && <p>Completed Date: {props.toDo.completedDate}</p>}
  <p>Description: {props.toDo.description}</p>
    </div>
  )
};

const ToDoForm = (props) => {
  // set state variables for items that require user input for new object
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <label>Title: </label>
      {/* onChange uses setter function to set title variable as whatever target value is */}
      <input type="text" onChange={(e) => {
        setTitle(e.target.value)
      }}></input>
      <br/>

      <label>Priority: </label>
      <select onChange={(e) => {
        setPriority(e.target.value)
      }}>
        <option value=""></option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <br/>

      <label>Description: </label>
      <textarea onChange={(e) => {
        setDescription(e.target.value)
      }}></textarea>
      <br/>

      {/* create button to call handleAddToDo function on and pass in state variables as arguments */}
      <button onClick={() => {
        props.handleAddToDo(title, priority, description)
      }}>Add To Do</button>
    </div>
  )
};

export default App;