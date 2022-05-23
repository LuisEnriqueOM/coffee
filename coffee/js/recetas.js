//------------------------------------------------------------------------------------------------------------------------------------------------------------
let obtenerCliente = JSON.parse(localStorage.getItem("objeto"));
let user = JSON.parse(localStorage.getItem("user"));
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
        <li><a onclick="borrarCuenta(${id})" class="dropdown-item">Borrar cuenta</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><button type="submit" class="dropdown-item" value="1">Cerrar sesion</button></li>`;
        contenUser.className = "btn-group dropstart";
        let accion = document.getElementById("acciones");
        contenUser.addEventListener("submit",function(e){
            e.preventDefault();
            localStorage.removeItem("user");
            contenUser.className = "visually-hidden";
            location.href = "../views/index.html"
        });
    }else if(usuario == "cliente"){
        //-----POR OTRO LADO TENEMOS LA PARTE DEL CLIENTE CON SUS BOTONES---------
        let contenUser = document.getElementById("contenUser");
        contenUser.innerHTML = `
        <button  type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ${name}
        </button>
        <ul class="dropdown-menu">
        <li><a onclick="borrarCuenta(${id})" class="dropdown-item">Borrar cuenta</a></li>
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
//----------------------------------------------------------
//--APARTADO PARA CREAR LAS CARTAS DE LAS RECETAS FRIAS

    //Se manda a traer el id desde recetas.html
let recetasfrias = document.querySelector('#nav-home');
    /*Se crea una funcion la cual contendra nuestra peticion
    a nuestra API  */
const cafeFrio = async() => {
    const res = await fetch("https://api.sampleapis.com/coffee/iced");
    const data = await res.json();
    //console.log(data);
    data.forEach(element => {
        const div = document.createElement("div");
        div.className = "card mb-3";
        div.innerHTML = `
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="../img/recetas/cafeFrio/${element.id}.jpg" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${element.title}</h5>
                                    <p class="card-text">${element.description}</p>
                                    <ul id="ingredientes" class="list-group">
                                        <li class="list-group-item active" aria-current="true">Ingredients</li>
                                        <li class="list-group-item">${element.ingredients}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        `;
        recetasfrias.prepend(div);
        
    });
}
//----------------------------------------------------------

//----------------------------------------------------------
//--APARTADO PARA CREAR LAS CARTAS DE LAS RECETAS CALIENTES

    //Se manda a traer el id desde recetas.html
let recetascalientes = document.querySelector('#nav-profile');
    /*Se crea una funcion la cual contendra nuestra peticion
    a nuestra API  */
const cafeCaliente = async() => {
    const res = await fetch("https://api.sampleapis.com/coffee/hot");
    const data = await res.json();
    //console.log(data);
    data.forEach(element => {
        const div = document.createElement("div");
        div.className = "card mb-3";
        div.innerHTML = `
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="../img/recetas/cafeCaliente/${element.id}.jpg" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${element.title}</h5>
                                    <p class="card-text">${element.description}</p>
                                    <ul id="ingredientes" class="list-group">
                                        <li class="list-group-item active" aria-current="true">Ingredients</li>
                                        <li class="list-group-item">${element.ingredients}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        `;
        recetascalientes.prepend(div);
    });
}

console.log(cafeCaliente());
console.log(cafeFrio());
//------------------------------------------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------ESTE APARTADO ES PARA QUE EL USUARIO BORRE SU CUENTA--------
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
            console.log(newUsers);
            localStorage.setItem("objeto",JSON.stringify(newUsers));
            localStorage.removeItem("user");
            location.href = "../views/index.html";},1000)
        }
      })
}


