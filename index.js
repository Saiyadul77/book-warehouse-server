const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e04nu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const userCollection = client.db("warehouse").collection("items");
        

        app.get('/user', async(req,res)=>{
            const query={};
            const cursor= userCollection.find(query);
            const users= await cursor.toArray();
            res.send(users);
        })

        app.get('/service/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    })
        // POST USER
        app.post('/user', async(req,res)=>{
            const newUser= req.body;
            console.log('adding new user',newUser);
            const result= await userCollection.insertOne(newUser);
            res.send(result)
        })

    }
    finally {

    }
}


run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello world')
})
app.get('/inventory', (req, res) => {
    res.send('Hello Warehouse...Please submit assignment')
})

app.listen(port, () => {
    console.log('This is Book Warehouse!', port)
})
