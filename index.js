const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://dbUser:Aud6A3sHKmtWSem3@cluster0.e04nu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const userCollection = client.db("warehouse").collection("items");
        const user = { name: "sayed", email: "saiyadul77@gmail.com" };
        const result = await userCollection.insertOne(user);
        console.log(`The userlist is : ${result.insertedId}`)

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
