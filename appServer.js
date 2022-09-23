const express = require('express');
const app = express();
const Contenedor = require('./index');
const productos = new Contenedor ("productos.txt");
const PORT = process.env.PORT || 8080

//PRODUCTOS
const producto1 = {
    title: "Iphone",
    price: 8999.5,
    id: 1,
}
const producto2 = {
    title: "Imac",
    price: 91500.5,
    id: 2,
}
const producto3 = {
    title: "Macbook",
    price: 90000.5,
    id: 3,
}
const producto4 = {
    title: "Ipad",
	price: 29000.5,
	id: 4,
}

//SAVE PRODUCTOS
const usarContenedor = async () => {
    await productos.save(producto1)
    await productos.save(producto2)
    await productos.save(producto3)
    await productos.save(producto4)
}

usarContenedor()

const getProduct = async ()=>{
    let listProduct = JSON.stringify(await productos.getAll());
    return listProduct;
    
}
const getProductRandom = async () =>{
    let length = await productos.getLength()
    let random = Math.floor(Math.random() * length)
    let productRandom = await productos.getAll();
    console.log(length, random, productRandom)
    return JSON.stringify(productRandom[random]);
}

app.get('/', (req, res) => {
    res.send(`GET`);
})
app.get('/productos',async (req, res) => {
    res.send(`Lista General: ${await getProduct()}`);
})
app.get('/productoRandom',async (req, res) => {
    res.send(`Producto Random ${await getProductRandom()}`);
})

const server = app.listen(PORT,()=>{console.log('Server Running on port 8080')});
server.on('error',error => console.log(`Error ${error}`));