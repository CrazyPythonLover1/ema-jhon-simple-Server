const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fgaci.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser)
const port = 5000


const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const products = client.db("Ema-Ecommerce-Store").collection("products");
  // console.log('database connected')
  app.post('/addProduct', (req, res) => {
    const product = req.body;
    products.insertOne(product)
    .then(result=> {
      console.log(result);
    })
  })

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})