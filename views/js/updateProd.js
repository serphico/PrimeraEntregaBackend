function updateProd(id){
    let formId = "update"+id.toString();
    let btnId = "X"+id.toString();
    let formUpdate = document.getElementById(formId);
    let Xcerrar = document.getElementById(btnId);

    formUpdate.style.display="block"
    Xcerrar.style.display="block"
}

function closeUpdate(id){
    let formId = "update"+id.toString();
    let btnId = "X"+id.toString();
    let formUpdate = document.getElementById(formId);
    let Xcerrar = document.getElementById(btnId);

    formUpdate.style.display="none"
    Xcerrar.style.display="none"
}

function updateProduct(e,id){
    let upProduct = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        SKU: document.getElementById('SKU').value,
        stock: document.getElementById('stock').value,
        description: document.getElementById('description').value,
        thumbnail: document.getElementById('thumbnail').files[0].name,
        id: id
    }
    console.log(upProduct)

    fetch('http://localhost:8080/api/productos/'+id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(upProduct)
 })
.then(res => res.json())
.then(res=> {
      console.log(res);
});
}