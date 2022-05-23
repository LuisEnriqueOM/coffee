//-------CHECA SI YA EXISTE UN CARRITO EN LOCALSTORAGE Y SI NO ES ASI LO CREA
let existeCarrito = localStorage.getItem("carrito") || null;
//console.log(existeCarrito);
if(existeCarrito == null){
    let newCarrito = [];
    localStorage.setItem("carrito",JSON.stringify(newCarrito)); 
}


//------------------------------------------------------------------------------------------------------------------------------------------------------------

//--------------------------CHECA SI LOS PRODUCTOS YA EXISTEN Y SI NO LOS CREA--------------/
/* -Dentro de esta validacion tambien agrega un inventario que se tiene ya en tienda pero que no esta en venta a publico
para que el administrador pueda agregarlos a venta  
------Se agrega tambien los dos usuarios predeterminados que podemos utilizar enviando toda esta informacion al LOCALSTORAGE */
let articulos = localStorage.getItem("productos") || null;
//console.log(operador);
if(articulos == null){
    let articulos = [
        {id: 1, name:"Cafe colombiano" , peso: "500gr",precio: 300 },
        {id: 2, name:"Cafe americano" , peso: "600gr",precio: 400 },
        {id: 3, name:"Cafe cubano" , peso: "800gr",precio: 600 }
    ];
    localStorage.setItem("productos",JSON.stringify(articulos));

    let inventario = [
        {id: 1, name:"Café colombiano" , peso: "500gr",precio: 300 },
        {id: 2, name:"Café americano" , peso: "600gr",precio: 400 },
        {id: 3, name:"Café cubano" , peso: "800gr",precio: 600 },
        {id: 4, name:"Café Alpont Gourmet Café Espresso" , peso: "250gr",precio: 89 },
        {id: 5, name:"Café Bola de Oro" , peso: "1000gr",precio: 403 },
        {id: 6, name:"Café de Altura Gran Reserva" , peso: "250gr",precio: 79 },
        {id: 7, name:"Café de La Parroquia de Veracruz" , peso: "430gr",precio: 114 },
        {id: 8, name:"Café Ave de Fuego" , peso: "500gr",precio: 246 },
        {id: 9, name:"Café OCIXEM" , peso: "454gr",precio: 124 },
        {id: 10, name:"Café En Grano Italiano - Attibassi Miscela 1918" , peso: "1000gr",precio: 795 },
        {id: 11, name:"Café Honey de Especialidad, Tresso", peso: "380gr",precio: 139 },
        {id: 12, name:"Café Garat Espresso Entero" , peso: "454gr",precio: 127 },
        {id: 13, name:"Café Gila Café Gila Master Blend" , peso: "900gr",precio: 250 },
        {id: 14, name:"Café Tostado y Molido Espresso Nescafé TasterS Choice, Nescafé Tasters Choice" , peso: "300gr",precio: 125 },
        {id: 15, name:"Café Veracruz Tresso" , peso: "500gr",precio: 143 },
        {id: 16, name:"Café en Granos Arábica, Selection Brasil, Illy" , peso: "250gr",precio: 409 },
        {id: 17, name:"Café Momoto café mexicano" , peso: "200gr",precio: 155 },
        {id: 18, name:"Café Internacional Internacional Americano" , peso: "908gr",precio: 198 },
        {id: 19, name:"Café Punta del Cielo" , peso: "200gr",precio: 215 },
        {id: 20, name:"Café Tostado y Molido Intenso, Los portales " , peso: "400gr",precio: 105 }
    ];
    localStorage.setItem("inventario",JSON.stringify(inventario));

    let usuarios = [{id:1, correo:"123@gmail.com",name: "Luis",password: "123",usuario: "administrador", status: "activo",pin: "4321"},
                {id:2, correo:"hola@gmail.com",name: "Kike",password: "123",usuario: "cliente", status: "activo",pin: ""}];

    localStorage.setItem("objeto",JSON.stringify(usuarios));

    location.href ="../views/index.html";
}else{
    //--------------------------------AQUI SE CREAN LAS TARJETAS EN INDEX-----------------
    let productos = JSON.parse(localStorage.getItem("productos"));
    for(let producto of productos){
        let stock = document.getElementById("stockAdmin");
        let card = document.createElement("div");
        card.className = "col"
        card.innerHTML = `
        <div id="card${producto.id}" class="card shadow-sm">
        <img src="../img/productos/${producto.id}.jpg" alt=""> 
            <div class="card-body">
                <h5 class="card-title">${producto.name}</h5>
                <p class="card-text">Peso: ${producto.peso} </p>
                <p class="card-text">Precio: $ ${producto.precio} </p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group visually-hidden">
                        <button type="button" class="btn btn-sm btn-primary ">View</button>
                    </div>
                    <button type="button" class="btn btn-sm btn-success" onclick="compra(${producto.id})">Agregar</button>
                </div>
            </div>
        </div>`;
        stock.prepend(card);
    }
}


//------------------------------------------------------------------------------------------------------------------------------------------------------------
/*-----------------SE MANDA A TRAER objeto que es el nombre con el cual guardamos a
 los usuarios ya predestinados ESTO CON EL FIN DE UTILIZARLO A LO LARGO DE NUESTO CODIGO*/
let obtenerCliente = JSON.parse(localStorage.getItem("objeto"));

//------------------------------------------------------------------------------------------------------------------------------------------------------------





//------------------------------------------------------------------------------------------------------------------------------------------------------------

/*------------------SE MANDA A TRAER EL ID DEL MODAL DE LOGGING que se encuentra en 
index.html en la ultima parte PARA VALIDAR NUESTRO USUARIO-------------------*/
let modalUser = document.getElementById("modalLoggin");
modalUser.addEventListener("submit",function(e){
    e.preventDefault();
    let email = document.getElementById("email").value; 
    let password = document.getElementById("password").value;
    //Una vez que tenemos la informacion del formulario la mandamos como parametro a la funcion acceder
    acceder(email,password);
})



/*------------------------SE CREA UN NUEVO ITEM EN LOCALSTORAGE LLAMADA USER, ALMACENANDO EL----- 
---------------------------USUARIO EXISTENTE CON LA INFORMACION OBTENIDA-------------------------*/
function acceder(email,password){
    /*Se crea una nueva variable para almacenar nuestro nuevo arreglo con la informacion que se 
    obtuvo del formulario, verificando que existe en "obtenerCliente"(la cual es la variable que 
        contiene el arreglo con los usuarios predeterminados y se crea un nuevo ITEM para asi solo trabajar 
        con este mientras que el usuario esta activo----*/
    let usu = obtenerCliente.filter((e)=> (e.correo == email || e.name == email) && e.password == password);
    localStorage.setItem("user",JSON.stringify(usu));

    /*--------Al detectar que el arreglo es mayor que 0 en logitud entra a la condicion asignada
     ya que indica que el arreglo tiene un cliente o esta vacio*/
    if(usu.length !== 0){
        let {name} = usu[0];
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: `Bienvenido ${name}`,
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            timer: 1500
          });
          setTimeout(()=>{
            location.href = "../views/index.html";
          },1500)
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: '¡Usuario o contraseña no existen!',
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: true,
            timer: 3000
          });
    }
    
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------AQUI VA EL REGISTRO DE NUEVO USUARIO-------------------------------
    /*Primero se crea una variable vacia, seguida de un ciclo for para que dentro de 
    este se le asigna la variable al "id" de los usuarios y poder asignarle ese nuevo "id al cliente nuevo"*/
let newId;
for(let i of obtenerCliente){
    newId = i.id;
   }
   //Ahora se manda a traer el formulario de registro seguido de su respectivo "submit" y poder obtener los datos de este nuevo registro
let modalNewUser = document.getElementById("newUsuario");
modalNewUser.addEventListener("submit",(e)=>{
    e.preventDefault();
    let name = document.getElementById("newNameUser").value;
    let email = document.getElementById("newEmail").value;
    let password = document.getElementById("newPassword").value;
    let pinAdmin = document.getElementById("newPin").value;

    //Una vez que tenemos la informacion se compara el email con el nuevo usuario y se valida si ya existe o es nuevo
    let yaEsta = obtenerCliente.find((e)=> e.correo == email) || null;

    /*ESTA PARTE ES IMPORTANTE ya que se valida que pinAdmin sea igual a "4321" para que asi 
    se pueda registrar como ADMINISTRADOR de lo contrario se asignara como CLIENTE*/
    //Y se agrega el nuevo usuario al ITEM existente que contiene los usuarios que ya estan registrados
    if(pinAdmin === "4321" && yaEsta == null){
        let newUser = {id:newId+1, correo:email ,name:name ,password: password,usuario: "administrador", status: "activo",pin: pinAdmin};
        obtenerCliente.push(newUser);
        localStorage.setItem("objeto",JSON.stringify(obtenerCliente));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro exitoso \nStatus: Administrador',
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            timer: 1000
          });
          setTimeout(()=>{
            location.href = "../views/index.html";
          },1000)
    }else if(yaEsta == null){
        let newUser = {id:newId+1, correo:email ,name:name ,password: password,usuario: "cliente", status: "activo",pin: pinAdmin};
        obtenerCliente.push(newUser);
        localStorage.setItem("objeto",JSON.stringify(obtenerCliente));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro exitoso \nStatus: Cliente',
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            timer: 1000
          });
          setTimeout(()=>{
            location.href = "../views/index.html";
          },1000)
    }
    if(yaEsta != null){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: '!Este correo ya existe¡',
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: false,
            timer: 1000
          });
    }
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------





//------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------SE CREA EL APARTADO SUPERIOR DERECHO DEL CLIENTE EN EL NAVBAR-------------------
    //Primero se obtiene el ITEM "user" que es el que contiene nuestro usuario activo en el momento
let user = JSON.parse(localStorage.getItem("user"));

    //Se hace una destructuracion con las variables que vamos a utilizar
const {id,name,usuario} = user[0];

    //Con la variable "usuario" la cual contiene si es ADMINISTRADOS o CLIENTE se asignara a una condicion-----------------
    if(usuario == "administrador"){
        /*se llama al contenedor de sesion y se modifica dinamicamente, dentro de esta creacion 
        podremos ver que se trabajara con "onclick" en los botones creados para asi poder asignarles variables directas*/
        //Nota: El id "contenUser" esta en index.html
        let contenUser = document.getElementById("contenUser");
        contenUser.innerHTML = `
        <button  type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ${name}
        </button>
        <ul class="dropdown-menu">
        <li><a onclick="borrarCuenta(${id})" class="dropdown-item">Borrar cuenta</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><button type="submit" class="dropdown-item">Cerrar sesion</button></li>`;
        contenUser.className = "btn-group dropstart";
        //--------------------------------------------------------

        //--------------------------------------------------------
        //----Mediante a tu usuario se crearan los botones, en este caso al ser "administrador" tenemos 'Editar Productos'
        //Nota: El id "acciones" esta en index.html
        let accion = document.getElementById("acciones");
        accion.innerHTML = '<button id="btnEdit" class="btn btn-warning me-md-2" type="button">Editar Productos</button>';
        accion.className = "d-grid gap-2 d-md-flex justify-content-md-end";
        let btnEdit = document.getElementById("btnEdit");
        btnEdit.addEventListener("click",()=> location.href = "../views/clase.html");
        //-------------------------------------------------------

        //-------------------------------------------------------
        /*-----Se utiliza 'contenUser' y se le asigna una accion submit 'cerrar sesion' para que asi se oculte el modulo
        y se remueva el ITEM "user" el cual solo contiene el usuario activo*/
        contenUser.addEventListener("submit",function(e){
            e.preventDefault();
            localStorage.removeItem("user");
            contenUser.className = "visually-hidden";
            location.href = "../views/index.html"
        });
        //------------------------------------------------------

        //------------------------------------------------------
        /*Al momento de iniciar sesion aparece un item en navbar que se llama recetas el cual estaba oculta pero al detectar 
        que el sistema tiene un usuario a este se le cambia su clase*/
        let linkRecetas = document.querySelector('#linkRecetas');
        linkRecetas.className = "nav-item";
        //------------------------------------------------------

        //------------------------------------------------------
        //Se oculta inicio de sesion y registro
        let iniciarSesion = document.querySelector('#iniciarSesion');
        iniciarSesion.className = "visually-hidden";

        let registro = document.querySelector('#registro');
        registro.className = "visually-hidden";

    }else if(usuario == "cliente"){
        //------Aqui esta la parte de cliente en el contenedor de acciones
        //En esta seccion tenemos lo mismo que lo anterior pero con unos cuantos cambios
        let contenUser = document.getElementById("contenUser");
        contenUser.innerHTML = `
        <button  type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            ${name}
        </button>
        <ul class="dropdown-menu">
        <li><a onclick="borrarCuenta(${id})" class="dropdown-item" href="#">Borrar cuenta</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><button type="submit" class="dropdown-item">Cerrar sesion</button></li>`;
        contenUser.className = "btn-group dropstart";
        //------------------------------------------------------

        //------------------------------------------------------
        contenUser.addEventListener("submit",function(e){
            e.preventDefault();
            localStorage.removeItem("user");
            //Al momento que cierra sesion el cliente este tambien remueve el ITEM "carrito" que se creo al inicio de este archivo
            localStorage.removeItem("carrito");
            contenUser.className = "visually-hidden";
            location.href = "../views/index.html"
        });
        //------------------------------------------------------

        //------------------------------------------------------
        //Se manda a traer el boton para viualizar el modal del carrito
        let btnCarrito = document.getElementById("btnCarrito");
        btnCarrito.className = 'btn btn-primary';

        /*Se obtien el ITEM "carrito" y se le asigna "forEach" para que recorra 
        nuestro arreglo y pinte en pantalla nuestras compras en una tabla*/
        let carro = JSON.parse(localStorage.getItem("carrito"));
        carro.forEach(producto => {
            console.log(producto);
            let stock = document.getElementById("stock");
            let tr = document.createElement("tr");
            tr.innerHTML = `
                            
                            <td>${producto.name}</td>
                            <td>${producto.peso}</td>
                            <td>$${producto.precio}</td>
                            <td class="text-center">
                            <button type="button" class="btn btn-danger btn-sm" onclick="eliminarCarrito(${producto.id})">Eliminar</button>
                            </td>`;
            stock.prepend(tr);
            
        });
        //------------------------------------------------------

        //------------------------------------------------------
        let linkRecetas = document.querySelector('#linkRecetas');
        linkRecetas.className = "nav-item";
        //------------------------------------------------------

        //------------------------------------------------------
        let iniciarSesion = document.querySelector('#iniciarSesion');
        iniciarSesion.className = "visually-hidden";
        //------------------------------------------------------

        //------------------------------------------------------
        let registro = document.querySelector('#registro');
        registro.className = "visually-hidden";
    }
//------------------------------------------------------------------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------FUNCIONES-------------------------------------


/*Funcion "borrarCeunta", sirve para borrar 
nuestro usuario de los ya existentes, almacenando el 
"id" del usuario en cuestion*/ 
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
            1000,
            false
          );
          setTimeout(()=>{
        //Se obtiene todos los usuarios distindo al que vamos a borrar y se vuelve a meter en el arreglo de usuarios existentes
            let newUsers = obtenerCliente.filter(elemento => elemento.id != id);
            console.log(newUsers);
            localStorage.setItem("objeto",JSON.stringify(newUsers));
            localStorage.removeItem("user");
            location.href = "../views/index.html";},1000)
        }
      })
}
//------------------------------------------------------

//------------------------------------------------------   
//----AQUI VA LA FUNCION DE CLIENTE 'AGREGAR A: CARRITO'---

function compra(id){
    //Se obtinenen los ITEMs con los cuales trabajaremos
    let articulo = JSON.parse(localStorage.getItem("productos"));
    let compra = JSON.parse(localStorage.getItem("carrito"));

    //Se busca en los productos en venta si existe y se almacena el arreglo del producto
    let carrito = articulo.find((e) => e.id === id);

    /*Se busca si en nuestro carrito de compra no existe el articulo seleccionada, 
    de ser null se agrega a carrito, de lo contar se le asigna una nueva condicion */
    let carro = compra.find(elemento => elemento.id === id) || null;

    //---Se asegura que el usuario sea "cliente", de lo contrario te manda un error
    //Nota: esta variable "usuario" se 
    if(usuario == "cliente" && carro == null){
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
                compra.push(carrito);
                localStorage.setItem("carrito",JSON.stringify(compra));
                location.href = "../views/index.html";
            },1000)
    }
    if(usuario == "administrador"){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: '¡Usted no es un cliente!',
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: true,
            timer: 3000
          });
    }
    if(carro != null){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: '¡Este producto ya existe en carrito!',
            showConfirmButton: false,
            timerProgressBar: true,
            allowOutsideClick: true,
            timer: 3000
          });
    }
}
//------------------------------------------------------

//------------------------------------------------------
//----AQUI VA LA FUNCION DE CLIENTE PARA ELIMINAR DEL CARRITO---
function eliminarCarrito(id){
    let carro = JSON.parse(localStorage.getItem("carrito"));
    let articulo = carro.filter(elemento => elemento.id != id);
    localStorage.setItem("carrito",JSON.stringify(articulo));
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Se elimino correctamente',
        showConfirmButton: false,
        allowOutsideClick : false,
        timer: 1000
      });
      setTimeout(()=>{
        location.href = "../views/index.html";
      },1000)
}
//------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------LLAMADO PARA CREAR TICKET-------------------------------
    //Se llama el id del boton "Comprar carrito" que esta en index
let compraCarrito = document.getElementById("compraCarrito");
compraCarrito.addEventListener("click",()=>{

    //Se llama al ITEM "carrito" para hacer una suma de la variable 'precio', esto siendo posible por 'reduce'
    let compra = JSON.parse(localStorage.getItem("carrito"));
    let suma = compra.reduce((contador,suma) =>  contador + suma.precio ,0);

    //Este pequeño for se crea con la finalidad de contar los productos que tiene carrito hasta ahora
    let objetosCompra;
    for(let i = 0; i<=compra.length;i++){objetosCompra = i;}

    //Se llama un div de index.html con el id='newticket' para que asi podamos crear el ticket
    let newticket = document.getElementById("newticket");
    let div = document.createElement("div");
    div.innerHTML = `
                    <div id="ticket">
                    <h1>Gracias por tu compra!</h1>
                        <table>
                            <tfoot>
                                <tr>
                                <th>Total</th>
                                <th >$${suma}</th>
                                </tr>
                                <tr>
                                <th># Productos</th>
                                <th>#${objetosCompra}</th>
                                </tr>
                                <th class="text-center">Esperamos que vuelvas pronto ${name}</th>
                            </tfoot>
                        </table>
                    </div>
    `;
    newticket.prepend(div);
})
