const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: 'unauthorized access' });
    }
  
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: 'forbidden access' });
      }
      console.log('decoded', decoded);
      req.decoded = decoded;
      next();
    })
    // console.log('inside verifier', authHeader);
    
  }


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e04nu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db("warehouse").collection("items");
        const userCollection = client.db("warehouse").collection("users");

        //AUTH

        app.post('/login', async (req, res) => {
            const user = req.body;
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            res.send({ accessToken });
        })

        // multiple data get
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })
        // single data get
        app.get('/service/:id', verifyJWT, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        // POST USER
        app.post('/service', async (req, res) => {
            const newUser = req.body;
            console.log('adding new user', newUser);
            const result = await serviceCollection.insertOne(newUser);
            res.send(result)
        })

        // Delete 
        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        })

        // Data decrease and update

        

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
