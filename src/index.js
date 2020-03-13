require('dotenv').config();

const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const ProdutoDao = require('./controllers/ProdutoDao');
const app = express();

mongoose.connect(process.env.MONGOL_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send('Servidor rodando');
});

app.post('/adicionar', async(req,res)=>{
    try {
        const response =  await ProdutoDao.adicionar(req.body);    
        res.json(response);
    } catch (error) {res.json(error)}
    
});

app.post('/listar', async(req,res)=>{
    try {
        const response =  await ProdutoDao.listar();    
        res.json(response);
    } catch (error) {res.json(error)}
    
});

app.listen(process.env.PORT,()=>{
    console.log('Servidor rodando');
})