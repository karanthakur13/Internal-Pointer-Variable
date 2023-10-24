import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productsModel.js'
import { products } from '../products.js'

import { spawn } from 'child_process'

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(products);
    res.send({ createdProducts });
}))

productRouter.post('/addProduct', async (req, res) => {
    const product = req.body;
    console.log(product);
    let newProduct = new Product({
        name: product.name,
        image: "testing",
        brand: product.brand,
        greenRating: 0,
        category: product.category,
        description: product.description,
        price: parseInt(product.price),
        stock: parseInt(product.stock),
        rating: product.rating,
        numRev: product.numRev
    })
    const result = await newProduct.save();
    res.send({ result });
})
//TODO:add the product recommendation api (return an array of objects)
//TODO:add the greenRating calculator api
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ message: "Product not found." });
    }
}))

productRouter.get('/getsimilar/:id', expressAsyncHandler(async (req, res) => {
    const id = req.params.id;

    const pyProg = spawn('python3', ['/Users/newuser/Desktop/ipv/Internal-Pointer-Variable/amazon-backend/script.py', id]);

    pyProg.stdout.on('data', (data) => {
        res.send({ 'topSimilarItems': data.toString() });
    });

    pyProg.on('close', (code) => {
        if (code === 0) {
            console.log('Python script exited successfully!');
        } else {
            console.log('Python script exited with an error code:', code);
        }
    });

}))


export default productRouter;