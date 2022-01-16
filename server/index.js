const path=require('path')
const express=require('express')
const dotenv = require('dotenv')
const connectDB =require('./db.js')
const Todo=require('./models/todo')


dotenv.config()

connectDB()

const app = express()



app.use(express.json())


app.post('/add',async(req,res)=>{
try{
    await Todo.create({
        name:req.body.todo
    })
res.status(200).json({result:"success"})
}
catch(e){
res.status(400).json({result:"error"})
}


})


app.get('/all',async(req,res)=>{
    try{
       const result= await Todo.find({
        })
    res.status(200).json({result})
    }
    catch(e){
    res.status(400).json({result:"error"})
    }
    
    
    })

  app.put('/update',async(req,res)=>{
      console.log(req.body)
      
    try{
    const r=await Todo.findOneAndUpdate({name:req.body.todo.name},{
          completed:req.body.completed
      })
      console.log(r)
      res.status(200).json({result:'success'})
    }
    catch(e){
        res.status(400).json({result:"error"})
    }


  })  

  app.post('/delete',async(req,res)=>{
    console.log(req.body)
    
  try{
  const r=await Todo.findOneAndDelete({name:req.body.todo.name})
    console.log(r)
    res.status(200).json({result:'success'})
  }
  catch(e){
      res.status(400).json({result:"error"})
  }


})  

app.delete('/delete',async(req,res)=>{
    console.log(req.body)
    
  try{
  await Todo.remove({completed:true})
    res.status(200).json({result:'success'})
  }
  catch(e){
      res.status(400).json({result:"error"})
  }


})  



app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}


const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)