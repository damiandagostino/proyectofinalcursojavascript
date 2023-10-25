let entradasEnCarrito = localStorage.getItem("entradas-en-carrito");
entradasEnCarrito = JSON.parse(entradasEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carritoVacio");
const contenedorCarritoEntrada = document.querySelector("#contenedorCarritoEntrada");
const contenedorCarritoAcciones = document.querySelector("#carritoAcciones");
const contenedorCarritoComprado = document.querySelector("#carritoComprado");
let botonesEliminar = document.querySelectorAll(".carritoEntradaEliminar");
const botonVaciar = document.querySelector("#carritoAccionesVaciar");
const total = document.querySelector("#total");
const botonComprar = document.querySelector("#checkout-btn");

function cargarEntradasCarrito(){
    
    if (entradasEnCarrito && entradasEnCarrito.length >0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoEntrada.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoEntrada.innerHTML = "";
    
        entradasEnCarrito.forEach(shows => {
    
            const div = document.createElement("div");
            div.classList.add("carritoEntrada");
            div.innerHTML = `
        <img class= "carritoEntradasimagen"src="${shows.imagen}" alt="${shows.nombre}">
        <div class="carritoEntradaTitulo">
            <small>Show</small>
            <h3>${shows.nombre}</h3>
        </div>
        <div class="carritoEntradaCantidad">
            <small>Cantidad</small>
            <p>${shows.cantidad}</p>
        </div>
        <div class="carritoEntradaPrecio">
            <small>Precio</small>
            <p>$${shows.precio}</p>
        </div>
        <div class="carritoEntradaSubtotal">
            <small>Subtotal</small>
            <p>$${shows.precio * shows.cantidad}</p>
        </div>
            <button class="carritoEntradaEliminar" id="${shows.id}"><i class="bi bi-trash-fill"></i></button>
        </div>
        `
        contenedorCarritoEntrada.append(div);
        });
    } else {
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoEntrada.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
    }
    actualizarBotonesEliminar();
    actualizarTotal(); 
}

cargarEntradasCarrito();



function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carritoEntradaEliminar");

    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito); 
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = entradasEnCarrito.findIndex(shows => shows.id === idBoton);

    entradasEnCarrito.splice(index,1);
    cargarEntradasCarrito();

    localStorage.setItem("entradas-en-carrito", JSON.stringify(entradasEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito (){
    Swal.fire({
        title: '<strong>Estas seguro que quieres vaciar el carrito?</strong>',
        icon: 'question',
        color: "#b20303",
        background: "#fafafa",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'<i class="fa fa-thumbs-down"></i> Si',
        confirmButtoncolor: "#fafafa",
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:'<i class="fa fa-thumbs-up"></i>No, me voy a divertir',
        cancelButtonAriaLabel: 'Thumbs down',
        cancelButtonColor: "#b20303"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Carrito Vacio', '', 'success')
          entradasEnCarrito.length = 0;
          localStorage.setItem("entradas-en-carrito", JSON.stringify(entradasEnCarrito));
          cargarEntradasCarrito();
        }
      })

}

function actualizarTotal(){
    const totalCalculado = entradasEnCarrito.reduce((acc, shows) => acc +(shows.precio * shows.cantidad),0);
    total.innerText = `$${totalCalculado}`;
}

// botonComprar.addEventListener("click", comprarCarrito);

// function comprarCarrito (){
//     entradasEnCarrito.length = 0;
//     localStorage.setItem("entradas-en-carrito", JSON.stringify(entradasEnCarrito));

//     contenedorCarritoVacio.classList.add("disabled");
//     contenedorCarritoEntrada.classList.add("disabled");
//     contenedorCarritoAcciones.classList.add("disabled");
//     contenedorCarritoComprado.classList.remove("disabled");
// }