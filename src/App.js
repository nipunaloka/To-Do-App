import './App.css';
import React,{useEffect, useState} from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import { BsCheckLg } from "react-icons/bs";


function App() {
  const[isCompletScreen, setIsCompteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completeTodos, setCompleteTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title:newTitle,
      description:newDescription
    };

    let updatedTodoArr = [...allTodos];

    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);

    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

  };

  const handleDeletodo = (index) => {
    let redusedTodo = [...allTodos];
    redusedTodo.splice(index);

    localStorage.setItem('todolist', JSON.stringify(redusedTodo));
    setTodos(redusedTodo);
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = "   " + dd + '-' + mm  + '-' + yyyy + ' at ' +  h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completeTodos];
    updatedCompletedArr.push(filteredItem);
    setCompleteTodos(updatedCompletedArr);
    handleDeletodo(index);
    localStorage.setItem('compeledTodos', JSON.stringify(updatedCompletedArr));
  }

  const handleDeleCompeltedtodo = (index)=> {
    let redusedTodo = [...completeTodos];
    redusedTodo.splice(index);

    localStorage.setItem('completeTodos', JSON.stringify(redusedTodo));
    setCompleteTodos(completeTodos);
  }

  useEffect(() => {
    let saveTodo = JSON.parse(localStorage.getItem('todolist'));
    let saveCompletedTodo = JSON.parse(localStorage.getItem('compeledTodos'));
    if(saveTodo){
      setTodos(saveTodo);
    }

    if(saveCompletedTodo){
      setCompleteTodos(saveCompletedTodo);
    }
  },[])

  return (
    <div className="App">
      <h1>My Todo APP</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Task.."/>
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Your description.."/>
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button 
          className={`secondaryBtn ${isCompletScreen === false && 'active'}`} 
          onClick={() => setIsCompteScreen(false)}>
            Todo
          </button>

          <button 
          className={`secondaryBtn ${isCompletScreen === true && 'active'}`} 
          onClick={()=>setIsCompteScreen(true)}>
            Completed
          </button>
        </div>
        <div className="todo-list">
          
          { isCompletScreen === false && allTodos.map((item, index) => {
            return(
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                
                <div>
                <AiOutlineDelete className='icon' onClick={() => handleDeletodo(index)}/>
                <BsCheckLg className='check-icon' onClick={() => handleComplete(index)} />
                </div>
              </div>
            )
          })}

          { isCompletScreen === true && completeTodos.map((item, index) => {
            return(
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on:{item.completedOn}</small></p>
                </div>
                
                <div>
                <AiOutlineDelete className='icon' onClick={() => handleDeleCompeltedtodo(index)} title='Delete'/>
                <BsCheckLg className='check-icon' onClick={() => handleComplete(index)} />
                </div>
              </div>
            )
          })}
          
        </div>
      </div>
    </div>
  );
}

export default App;
