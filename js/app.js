//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventos();
function cargarEventos() {
    //Agrega el evento al dar click al boton de "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito con el boton
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    })
}

function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatos(cursoSeleccionado);
    }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoID = e.target.getAttribute('data-id');

        //Elimina del arreglo de articuloCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);
        mostrarCarrito();
    }
}

//Leer el contenido del HTML del curso seleccionado
function leerDatos(curso) {

    //Crear objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('H4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un articulo ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //Actualizar la cantida
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna el resto de objetos en la lista
            }
        });

        articulosCarrito = [...cursos];
    } else {
        //Agrega los elementos al arreglo del Carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }



    console.log(articulosCarrito);

    mostrarCarrito();

}

//Muestra el Carrito de compras en el HTML
function mostrarCarrito() {

    //Limpiar HTML
    limpiarHTML();


    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('TR');
        row.innerHTML = `
            <td> <img src="${imagen}" width=100 > </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        //Agrega el HTML del carrito en el TBODY
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    // *Forma lenta
    // contenedorCarrito.innerHTML = '';

    // ?Forma optima de limpiar carrito
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}