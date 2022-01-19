import { Router } from "express";
import products from "../controller/productCrontroller.js";
import multer from "multer";
import adminMid from "../controller/middleware/admin.js";

const routerProd = Router()


    routerProd.get('/:id?', (req, res)=>{
        let data = products.getById(req.params.id);

        res.render(
            './index.pug',{data}
        )
    })


    /*-------------------------------------------------*/

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,`${file.originalname}`)
    }
})
const upload = multer({storage: storage})
/*-------------------------------------------------*/

    let test = [];

    routerProd.post('/agregar',upload.single('thumbnail'), adminMid, (req, res,next) =>{
        const file = req.file;
        
        
        if(!file){
            const error = new Error('please upload a file')
            error.httpStatuscode = 400
            return next(error)
        }
        test = {...req.body,thumbnail: file.filename}
        console.log(test)
        res.send(products.save(test))
        res.redirect('/')
    })

    routerProd.put('/:id',adminMid, (req, res,next) =>{
        res.send(products.putData(req.body, req.params.id))
        res.redirect('/')
    })

    routerProd.delete('/:id',adminMid,(req,res,next) =>{
        res.send(products.deleteData(req.params.id))
        res.redirect('/')
    })


export default routerProd;




