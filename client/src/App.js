import {Button, Container,InputGroup,FormControl}from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,useEffect} from 'react';
import axios from 'axios'
function App() {
  const [todo,setTodo]=useState('')
const [list,setList]=useState([])


 const HandleChange=(e)=>{ 

  setTodo(e.target.value)
 }
 const submitHandler=(e)=>{ 
 axios.post('/add',{
   todo
 })  
 setTodo('')
 }

useEffect(()=>{ 
axios.get('/all').then(res=>{ 
  setList(res.data.result)
})

},[todo])

const handleCheckbox=(v,e)=>{
 axios.put('/update',{ 
   todo:v,
   completed:e.target.checked 
 })
 axios.get('/all').then(res=>{ 
  setList(res.data.result)
})
}
const handleDelete=async(v)=>{

  await axios.post('/delete',{ 
    todo:v
  })
  await axios.get('/all').then(res=>{ 
    setList(res.data.result)
  })
}

const HandleCompletedRemove=async(v)=>{

  await axios.delete('/delete')
  await axios.get('/all').then(res=>{ 
    setList(res.data.result)
  })
}



  return (
    <div>
     <Container className='my-3 '>
       <center>
         <h3>Todo List</h3>
     <input onChange={HandleChange} placeholder="Enter todo" value={todo}/>
       <Button className='m-2' onClick={submitHandler}>Add new todo</Button>
       <Button variant='danger' className='m-2' onClick={HandleCompletedRemove}>Remove completed</Button>

        { 
          list.map((v)=>(
            <div>
            
           <InputGroup className="mb-2 bordered group" >
    <InputGroup.Checkbox checked={v.completed?true:false} onChange={(e)=>handleCheckbox(v,e)} aria-label="Checkbox for following text input" />
    <h5 className={v.completed?"p-2 strike":"p-2"}>{v.name} </h5>
    <Button variant='danger'  style={{marginLeft:'auto'}} onClick={()=>handleDelete(v)}>Delete</Button>
  </InputGroup>
  
           </div>
          )
          )

          
        }
       </center>
       
       
     </Container>
    </div>
  );
}

export default App;
