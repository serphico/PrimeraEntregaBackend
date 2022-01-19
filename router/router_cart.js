import { Router } from "express";
import cart from "../controller/cartController.js";

const routerCart = Router();

routerCart.get('/:id?',(req, res) => {
    let data = cart.listProducts(req.params.id)
    res.render('layouts/cart.pug', {data})
})

routerCart.post('/', (req, res) => {
    res.send(cart.createCart(req.body))
})

routerCart.delete('/:id', (req, res) => {
    res.send(cart.deleteCart(req.params.id))
})

routerCart.get('/:id/productos', (req, res) => {
    res.send(cart.listProducts(req.params.id))
})

routerCart.post('/:id/productos', (req, res) => {
    res.send(cart.addProductsCart(req.body, req.params.id))
})

routerCart.delete('/:id/productos/:id_prod', (req, res) =>{
    res.send(cart.deleteProductsCart(req.params.id, req.params.id_prod))
})

export default routerCart;