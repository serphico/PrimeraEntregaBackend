import fs from 'fs';
import path from 'path'

const dataCartPath = path.resolve('./data/cart.txt')

class Cart{
    constructor(){
        this.cart = [];
    }

    createCart(obj){
        if(!fs.existsSync(dataCartPath)){
            let id =1;
            let timeStamp = new Date().toLocaleDateString();
            this.cart = {...this.cart,id,timeStamp, products:[obj]};            
            fs.writeFileSync(dataCartPath, JSON.stringify([this.cart]));
            return this.cart;
        }else{
            let dataCart = JSON.parse(fs.readFileSync(dataCartPath,'utf-8'));
            console.log(dataCart.length)
            if(dataCart.length <= 0){
                let id =1;
                let timeStamp = new Date().toLocaleDateString();
                this.cart = {...this.cart,id,timeStamp, products:[obj]};            
                fs.writeFileSync(dataCartPath, JSON.stringify([this.cart]));
                return this.cart;
            }else{
                let id = dataCart.length + 1;
                let timeStamp = new Date().toLocaleDateString();
                this.cart = {...this.cart,id,timeStamp, products:[obj]};            
                dataCart.push(this.cart);
                fs.writeFileSync(dataCartPath, JSON.stringify(dataCart));
                return dataCart;
            }
        }
    }
    
    deleteCart(id){

        if(fs.existsSync(dataCartPath)){
            let newId = id - 1;
            let data = JSON.parse(fs.readFileSync(dataCartPath, 'utf-8'));
            data.splice(newId,1)
            fs.writeFileSync(dataCartPath,JSON.stringify(data))
            return data            
        }
    }

    listProducts(id){
        let newID = id-1;
        if(fs.existsSync(dataCartPath)){
            if(id != undefined){
                let data = JSON.parse(fs.readFileSync(dataCartPath,'utf-8'));
                let allProductsCart = data[newID].products;
                console.log(allProductsCart)
                return allProductsCart
            }else{
                let data = JSON.parse(fs.readFileSync(dataCartPath,'utf-8'));
                for (let i = 0; i < data.length; i++) {
                    let allProductsCart = data[i].products;
                    console.log(allProductsCart)
                    return allProductsCart;
                    break;                    
                }
                let allProductsCart = data[newID].products;
                console.log(allProductsCart)
                return allProductsCart
            }

        }
    }

    addProductsCart(obj,id){
        console.log(obj)
        let newID = id-1;
        if(fs.existsSync(dataCartPath)){
            let data = JSON.parse(fs.readFileSync(dataCartPath,'utf-8'));
            let getProductsCart = data[newID].products;
            for (let i = 0; i < getProductsCart.length; i++) {
                if(getProductsCart.id != obj.id){
                    getProductsCart.push(obj)
                    fs.writeFileSync(dataCartPath,JSON.stringify(data))
                    return data
                    break;
                }else{
                    let err = {mensaje:"ese producto ya existe"}
                    return err
                }
                
            }


         }
    }

    deleteProductsCart(id, id_prod){
        let newID = id-1;
        let newIDProd = id_prod-1;
        if(fs.existsSync(dataCartPath)){
            let data = JSON.parse(fs.readFileSync(dataCartPath, 'utf-8'));
            
            data[newID].products.splice(newIDProd,1)
            fs.writeFileSync(dataCartPath,JSON.stringify(data))
            return data            
        }
    }

}

const cart = new Cart();

export default cart;