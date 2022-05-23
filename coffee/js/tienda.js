//------------------------------------------------------------------------------------------------------------------------------------------------------------
//----se llaman los Items con los que trabajaremos que ya se generaron en "default.js"-----
let user = JSON.parse(localStorage.getItem("user"));
let articulos = JSON.parse(localStorage.getItem("productos"));
let inventario = JSON.parse(localStorage.getItem("inventario"));
let obtenerCliente = JSON.parse(localStorage.getItem("objeto"));
//------------------------------------------------------------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------------------------------------------------------------
    let {id,name,usuario} = user[0];
//---------------SE CREA EL MODULO DE USUARIO AL IGUAL QUE EN ARCHIVO '"default.js"' -------   
    if(usuario == "administrador"){
        //----contenUser hace referencia a la caja superior derecha en donde se pinta el nombre del cliente
        let contenUser = document.getElementById("contenUser");
        contenUser.innerHTML = `
        <button  type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ${name}
        </button>
        <ul class="dropdown-menu">
        <li><a onclick="borrarCuenta(${id})" class="dropdown-item" href="#">Borrar cuenta</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><button type="submit" class="dropdown-item" value="1">Cerrar sesion</button></li>`;
        contenUser.className = "btn-group dropstart";
        let accion = document.getElementById("acciones");

        
        accion.innerHTML = `<button class="btn btn-info me-md-2" type="button" onclick="crearInventario()" data-bs-toggle="modal" data-bs-target="#exampleModal2">Agregar a venta</button>  
                            <button id="btnTienda" class="btn btn-success me-md-2" type="button">Tienda</button> `; 
        

        accion.className = "d-grid gap-2 d-md-flex justify-content-md-end";
        //----Boton para movernos de Clase.html a Index.html
        let btnEdit = document.getElementById("btnTienda");
        btnEdit.addEventListener("click",()=> location.href = "../views/index.html");
        //----Aqui se indica una accion por si el usuario sale de sesion, lo cual lo llevara a la vista principal
        contenUser.addEventListener("submit",function(e){
            e.preventDefault();
            localStorage.removeItem("user");
            contenUser.className = "visually-hidden";
            location.href = "../views/index.html"
        });
        
        //---EN ESTE APARTADO SE PINTA LA TABLA CON LAS FUNCIONES QUE PUEDA HACER EL ADMINISTRADOR, en este caso 'éditar','eliminar','agregar'
        for(let producto of articulos){
            let stock = document.getElementById("stock");
            let tr = document.createElement("tr");
            tr.innerHTML = `
                            <th scope="row">${producto.id}</th>
                            <td>${producto.name}</td>
                            <td>${producto.peso}</td>
                            <td>$${producto.precio}</td>
                            <td class="text-center">
                            <button type="button" class="btn btn-warning btn-sm" onclick="editar(${producto.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
                            <button type="button" class="btn btn-danger btn-sm" onclick="eliminar(${producto.id})">Eliminar</button>
                            </td>`;
            stock.prepend(tr);
        }

    }else if(usuario == "cliente"){
        //-----POR OTRO LADO TENEMOS LA PARTE DEL CLIENTE CON SUS BOTONES---------
        let contenUser = document.getElementById("contenUser");
        contenUser.innerHTML = `
        <button  type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ${name}
        </button>
        <ul class="dropdown-menu">
        <li><a onclick="borrarCuenta(${id})" class="dropdown-item" href="#">Borrar cuenta</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><button type="submit" class="dropdown-item" value="1">Cerrar sesion</button></li>`;
        contenUser.className = "btn-group dropstart";

        contenUser.addEventListener("submit",function(e){
            e.preventDefault();
            localStorage.removeItem("user");
            localStorage.removeItem("carrito");
            contenUser.className = "visually-hidden";
            location.href = "../views/index.html"
        });
    }
//------------------------------------------------------------------------------------------------------------------------------------------------------------




//------------------------------------------------------------------------------------------------------------------------------------------------------------
/*------------ESTE APARTADO ES POR SI EL USUARIO QUIERE BORRAR SU CUENTA.
La funcion se llama a travez de un "onclick" asignado en la construccion 
dinamica de la caja de usuario--------*/
function borrarCuenta(id){
    Swal.fire({
        title: 'Estas seguro/a?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si, eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'Su usuario ha sido eliminado.',
            'success',
            1000
          );
          setTimeout(()=>{
            let newUsers = obtenerCliente.filter(elemento => elemento.id != id);
            localStorage.setItem("objeto",JSON.stringify(newUsers));
            localStorage.removeItem("user");
            location.href = "../views/index.html";},1000)
        }
      })
}
//----------------------------------------------------------------


//----------------------------------------------------------------
//------------FUNCION EDITAR (Administrador)-------------------
//--nota: las funciones las llaman los botones previamente creados y se llaman mediante un 'onclick'

function editar(id){
    let elemento = articulos.find(elemento => elemento.id === id);
    let acciones = document.getElementById("modalAcciones");
    acciones.addEventListener("submit",function(e){
        e.preventDefault();
        elemento.id = id;
        elemento.name = document.getElementById("nombre").value;
        elemento.precio =  parseInt(document.getElementById("precio").value);
        elemento.peso = document.getElementById("peso").value;
        
        //console.log(articulos);
        localStorage.setItem("productos",JSON.stringify(articulos));
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Modificacion exitosa',
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            timer: 1500
          });
          setTimeout(()=>{
            location.href = "../views/clase.html";
          },1500) 
    });
    /*Aqui se manda a traer el id="btnAcciones" el cual se encuentra
    en clase.html en el modal, se manda a traer para hacer los botones dinamicos*/
    let edit = document.getElementById("btnAcciones");
    edit.innerHTML = `
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> 
                    <button type="submit" class="btn btn-warning">Editar</button>
                        `;
    let titleModal = document.getElementById("exampleModalLabel");
    titleModal.innerText = `Editar`;
}
//----------------------------------------------------------------


//----------------------------------------------------------------
//-----------FUNCION ELIMINAR (Administrador)--------------------
function eliminar(id){
    let articulo = articulos.filter(elemento => elemento.id != id);
    localStorage.setItem("productos",JSON.stringify(articulo));
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Se elimino correctamente',
        showConfirmButton: false,
        allowOutsideClick : false,
        timer: 1000
      }); 
      setTimeout(()=>{
        location.href = "../views/clase.html"
      },1000);
}
//----------------------------------------------------------------
/* function eliminarCarrito(id){
    let carro = JSON.parse(localStorage.getItem("carrito"));
    let articulo = carro.filter(elemento => elemento.id != id);
    localStorage.setItem("carrito",JSON.stringify(articulo));
    //console.log(articulo);
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Se elimino correctamente',
        showConfirmButton: false,
        allowOutsideClick : false,
        timer: 1000
      }); 
      setTimeout(()=>{
        location.href = "../views/clase.html"
      },1000);
} */


//----------------------------------------------------------------
//---------FUNCION CREAR INVENTARIO (Administrador)--------------
/*Se hace la creacion de lo que se encuentra en el inventario
para enseñarle al administrador la gama de productos que
se tiene para ponerlos en venta, utilizando el Arreglo "inventario"
el cual obtuvimos al inicio del archivo siendo un ITEM */
function crearInventario(){
    for(let producto of inventario){
        let inventario = document.querySelector('#inventario');
        const div = document.createElement("div");
        div.className = "card mb-3";
        div.innerHTML = `
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="../img/productos/${producto.id}.jpg" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                </br>
                                <div class="card-body">
                                    <h5 class="card-title">${producto.name}</h5>
                                    <p class="card-text">Gamos en venta: ${producto.peso}</p>
                                    <p class="card-text">Precio actual: ${producto.precio}</p>
                                </div>
                                </br>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="button" onclick="ponerEnVenta(${producto.id})" class="btn btn-outline-success">Poner a la venta</button>
                                </div>
                            </div>
                        </div>
                        `;
        inventario.prepend(div);
        }
    
}
//----------------------------------------------------------------

//----------------------------------------------------------------
//----------------FUNCION PONER EN VENTA (Administrador)----------
/*Esta funcion se manda a llamar con el boton "Poner en venta",
 el cual se creo con nuestra funcion "crearInventario" la cual se 
 encuentra arriba de esta.*/ 
function ponerEnVenta(id){
    let almacen = inventario.find(elemento => elemento.id === id);
    let existeEnVenta = articulos.find(elemento => elemento.id === id) || null;
    if(existeEnVenta == null){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto agregado',
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            timer: 1000
          });
          setTimeout(()=>{
            articulos.push(almacen);
            localStorage.setItem("productos",JSON.stringify(articulos));
            location.href = "../views/clase.html";
          },1000)
    }else{
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Este producto ya esta en venta',
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            timer: 1000
          });
    }
}





