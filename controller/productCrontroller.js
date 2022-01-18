import fs from 'fs';
import path from 'path'

const dataPath = path.resolve('./data/products.txt')


class Productos{
    
    constructor(){
        this.prod = [];
    }

    save(obj){
        let timestamp = new Date().toLocaleDateString();

        if(!fs.existsSync(dataPath)){
            fs.writeFileSync(dataPath, '')
            let dataFile = fs.readFileSync(dataPath, 'utf-8');
            let newId = dataFile.length + 1;
            this.prod = obj[0];
            let newObj = {...this.prod, timestamp: timestamp, id: newId};
            fs.writeFileSync(dataPath, JSON.stringify([newObj]));
        }else{
            let newDataFile = fs.readFileSync(dataPath, 'utf-8');

            if(newDataFile.length <= 0){
                let dataFile =  fs.readFileSync(dataPath, 'utf-8');
                let newId = dataFile.length + 1;
                this.prod = obj[0];
                let newObj = {...this.prod, timestamp: timestamp, id: newId};
                console.log(newObj)
                fs.writeFileSync(dataPath, JSON.stringify([newObj]));
            }else{
                let dataFile =  JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
                let newId = dataFile.length + 1;
                this.prod = obj;
                let newObj = {...this.prod, timestamp: timestamp, id: newId};
                dataFile.push(newObj);
                fs.writeFileSync(dataPath,JSON.stringify(dataFile));
            }
         }        
    }

    getById(id){
        
        let idFinal = parseInt(id) - 1;
        
        let data = JSON.parse(fs.readFileSync(dataPath,'utf-8'));

        if(data[idFinal] !== undefined){
            return data[idFinal]
        }else if(id === undefined){
            return data
        }else if(data[idFinal] == undefined && id > 0){
            return {mensaje:"No existe el producto"}
        }
        
    }

    putData(obj,id){
        let newId = id - 1;
        console.log(id)
        console.log(newId)
        let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        console.log(data)
        if(!data[newId]){
            let error = {"error": "El elemento no existe"}
            return error
        }else{
            data[newId] = obj;
            fs.writeFileSync(dataPath,JSON.stringify(data))
            return data
        }

    }

    deleteData(id){
        let newId = id - 1;
        let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        

        if(data.length < id){
            let error = {error: "El elemento no existe"}
            return error
        }else{
            data.splice(newId,1)
            fs.writeFileSync(dataPath,JSON.stringify(data))
            return data

        }
    }
}

let products = new Productos();
export default products;