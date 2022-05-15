const express=require('express');
const cors= require('cors');
const app= express();
const port= process.env.PORT||5000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Hello world')
})
app.get('/inventory',(req, res)=>{
    res.send('Hello Warehouse...Please submit assignment')
})

app.listen(port, ()=>{
    console.log('This is Book Warehouse!', port)
})