let shows = [];

fetch("./data/stock.json")
    .then(response=> response.json())
    .then(data => {
        shows = data;
        cargarShows(shows);
    })


const contenedorShows = document.querySelector("#contenedorShows");
let botonesAgregar = document.querySelectorAll(".agregarEntrada");
const numerito = document.querySelector("#numerito");


function cargarShows() {
    contenedorShows.innerHTML = "";
    shows.forEach(shows =>{
        const div = document.createElement("div");
        div.classList.add("tarjetaShows");
        div.innerHTML =`
        <img class="showImagen" src="${shows.imagen}" alt="${shows.nombre}">
            <ul>
                <p class="showTitulo">${shows.nombre}</p>
                <p class="showPrecio">Precio: $${shows.precio}</p>
                <p class="showDescripcion">Descripcion: ${shows.desc}</p>
                <button class="agregarEntrada" id=${shows.id}>Agregar una Entrada</button>
            </ul>
        `;
        contenedorShows.append(div);
        
    })
    actualizarBotonesAgragar();
}



function actualizarBotonesAgragar() {
    botonesAgregar = document.querySelectorAll(".agregarEntrada");

    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito); 
    });
}


let entradasEnCarrito;

let entradasEnCarritoLS = localStorage.getItem("entradas-en-carrito");

if (entradasEnCarritoLS){
    entradasEnCarrito = JSON.parse(entradasEnCarritoLS);
    contadorDeEntradas();
} else {
    entradasEnCarrito = [];
}


function agregarAlCarrito(e) {
    Toastify({
        text: "Agregaste una entrada al carrito, sigue asi!!!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(82deg, rgba(5,5,5,1) 2%, rgba(178,3,3,1) 5%, rgba(178,3,3,1) 95%, rgba(5,5,5,1) 99%)",
            fontFamily: "'roboto', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif",
            fontSize: "1.2rem",
            fontWeigth: "800",
            borderRadius:"1rem",
        },
        offset: {
            x: "2rem", 
            y: "12rem" 
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const showsAgregado = shows.find(shows => shows.id === idBoton );

    if(entradasEnCarrito.some(shows => shows.id === idBoton)){
        const index = entradasEnCarrito.findIndex(shows => shows.id === idBoton);
        entradasEnCarrito[index].cantidad++;
    }else{
        showsAgregado.cantidad = 1;
        entradasEnCarrito.push(showsAgregado);
    }
    contadorDeEntradas();

    localStorage.setItem("entradas-en-carrito", JSON.stringify(entradasEnCarrito))
}

function contadorDeEntradas() {
    let contador = entradasEnCarrito.reduce((acc,shows) => acc + shows.cantidad, 0);
    numerito.innerText = contador;
}
