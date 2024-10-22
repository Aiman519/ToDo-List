import { useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit  } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";



function App() {
   
    const [todoTask , setTodoTask] = useState("");
    const [todoTaskArray , setTodoTaskArray] = useState( [ ]
    )
    const [showFinishedToDo , setshowFinishedToDo] = useState(true);


    
    // Load tasks from localStorage on component mount
    useEffect(() => {
      const storedTasks = localStorage.getItem("todoTaskArray");
      if (storedTasks) {
        setTodoTaskArray(JSON.parse(storedTasks));
      }
    }, []);
    
    
    useEffect(() => {
      if (todoTaskArray.length > 0) {
          localStorage.setItem("todoTaskArray", JSON.stringify(todoTaskArray));
      }
  }, [todoTaskArray]);


      const  userTodoTask = (event)=>{
      setTodoTask(event.target.value);

    }


   function handleAdd()
    {
        setTodoTaskArray([...todoTaskArray , {id:uuidv4() , todoTask , isCompleted : false}])
        setTodoTask("");
        saveToLs();

    }



    const handleDelete=(e , id)=>
    {
         console.log(`The id is ${id}`)
         let newtodos = todoTaskArray.filter(item=>{
           return    item.id !== id
         })

         setTodoTaskArray(newtodos);    
       
       
    }

     
     const handleEdit = (e , id )=>{
      console.log( `The id in Edit function is ${id}`);
      let index = todoTaskArray.findIndex(item=>{
          return item.id === id;
      })
        setTodoTask(todoTaskArray[index].todoTask) 

        let newtodos = todoTaskArray.filter(item=>{
          return    item.id !== id
        })

        setTodoTaskArray(newtodos); 
       
        
      
    }


    const handleCheckbox=(e)=>
    {
    
       let id =  e.target.name;
       
       let index = todoTaskArray.findIndex(item=>{
           return  item.id === id;
       })
       console.log(index);
       let newtodos = [...todoTaskArray]
       newtodos[index].isCompleted = !newtodos[index].isCompleted;
       setTodoTaskArray(newtodos);
    

       };

       const toggleShowFinished=(e)=>{
          setshowFinishedToDo(!showFinishedToDo);
       }
      
    
   

  return (
    <>
    <Navbar/>
      <div className=' mx-auto  my-5 rounded-xl text-purple-950  bg-violet-300 min-h-[80vh]  w-3/4 md:p-10 p-3'>
        <div className='addTodo mb-4'>
            <h2 className='text-2xl font-bold'>Add To-Do </h2> 
            <input  type="text" className='mt-2 text-xs w-[70%] md:w-1/2 rounded-md p-2 outline-none border-purple-950 ' value = {todoTask} onChange={userTodoTask} />
            <button onClick={handleAdd} className='bg-purple-900 hover:bg-purple-950 text-white px-4 py-1 md:mx-3 mx-1 rounded-lg font-bold
            ' disabled={todoTask.length==0}>Add</button>
        </div>
      <input type="checkbox"   checked={showFinishedToDo} onChange={toggleShowFinished}/>  Show Finished 
            <h2 className='my-4 text-purple-950 font-bold text-xl'>TO-DO List</h2>
        <div className='yourtodo'>

          {
          todoTaskArray.map((item , index)=>{
            return( (showFinishedToDo || !item.isCompleted)&&
          
             <div key={index} className='flex md:w-1/2 justify-between my-3 '>
                   <div className='flex gap-4 flex-grow items-center'>
                  <input type="checkbox" name={item.id} onChange={handleCheckbox} checked={item.isCompleted} />
                  <div className={`${item.isCompleted ? "line-through" : ""} break-words break-all`}
                    style={{ maxWidth: "70%" }}>
                       {item.todoTask}
                    </div>-
                  </div>
                   <div className='button flex h-full'>
                    <button onClick={ (e)=>{handleEdit(e, item.id)}} className='bg-purple-900 hover:bg-purple-950 text-white px-4 py-2 mx-1 rounded-lg font-bold' ><FaEdit /></button>
                    <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-purple-900 hover:bg-purple-950 text-white px-4 py-2 mx-1 rounded-lg font-bold'> <MdAutoDelete /></button>
                   </div>
                </div> 
           

            
              
            )
            
          })
          }

        </div>
      </div>
    </>
  )
}

export default App



