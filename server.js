import app from './app.js'



/*Servidor*/

const PORT = 8080;

const server = app.listen(PORT, () =>{
    console.log('Server on');
})

server.on('error', error =>{
    console.log(`${error}`)
})

