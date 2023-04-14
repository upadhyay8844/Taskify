import React from 'react';
import './App.css'
import InputField from './Components/InputField';
import { useState} from 'react';
import { Todo } from './model';
import TodoList from './Components/TodoList'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

// let name: string;
// name = "Piyush"
// let age: number | string;
// let isStudent: boolean;
// let hobbies:number[];
// let role:[number,string];
// role = [5,"Piyush"]
// age = 456

// let printName: (name: string) => never;
// let personName: unknown;
// type Person = {
//   name: string;
//   age?: number;
// };

// let person: Person = {
//   name : "Piyush",
//   // age:15,
// };

// let lotsOfPeople:Person[];
// interface Person {
//   naem: string;
//   age?: number;
// };

// interface Guy extends Person{
//   profession: string;
// };

// type X = {
//   a: string;
//   b: number;
// };

// type Y = Person & {
//   c: string;
//   d: number;
// };

// let y:Y = {

//   c: "ab"
// d: 23

// }
const App:React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo) {
      setTodos([...todos, {id: Date.now(), todo, isDone:false }])
      setTodo("");
    }
  };
  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;
    // console.log(result);
    if (!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add, 
    active =todos,
    complete = completedTodos; 
    if (source.droppableId === "TodosList") {
      add = active[source.index]
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1)
    }
    if (destination.droppableId === "TodosList" ) {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}> 
  <div className="App">
    <span className = "heading">Taskify</span>
    <InputField todo = {todo} setTodo = {setTodo} handleAdd = {handleAdd}/>
    <TodoList todos = {todos} setTodos = {setTodos}
    completedTodos ={completedTodos} setCompletedTodos={setCompletedTodos}/>
  </div> 
  </DragDropContext>
  );
}

export default App;
