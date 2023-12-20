const carrito = new Map();
let cantidadProductos = 0; // Inicializar el contador
const contadorProductos = document.getElementById('contador-productos');


document.addEventListener('DOMContentLoaded', () => {
  let section1, section2, section3;

  fetch('../js/data.json')
    .then(response => response.json())
    .then(data => {
      section1 = document.querySelector('#gluten');
      section2 = document.querySelector('#lacteo');
      section3 = document.querySelector('#frutos');
      const btnCeliaco = document.querySelector("#btnCeliaco")
      const btnLacteos = document.querySelector("#btnLacteos")
      const btnFrutos = document.querySelector("#btnFrutos")
      const verTodo = document.querySelector("#verTodo")
      const tituloCeliaco = document.querySelector("#tituloCeliaco")
      const tituloLacteos = document.querySelector("#tituloLacteo")
      const tituloFrutos = document.querySelector("#tituloFrutos")

    verTodo.addEventListener('click', () => {
      if (section1.style.display === 'none') {
        tituloCeliaco.style.display = 'none'
        tituloLacteos.style.display = 'none'
        tituloFrutos.style.display = 'none'
        section1.style.display = 'flex';
        section2.style.display = 'flex';
        section3.style.display = 'flex';
      } else {
        tituloCeliaco.style.display = 'none'
        tituloLacteos.style.display = 'none'
        tituloFrutos.style.display = 'none'
        section1.style.display = 'flex';
        section2.style.display = 'flex';
        section3.style.display = 'flex';
      }
      const productosPorPagina = 3;
      let paginaActual = 1;

      function mostrarProductos() {
        const inicio = (paginaActual - 1) * productosPorPagina;
        const fin = inicio + productosPorPagina;
        const productosPagina = data.slice(inicio, fin);

        // Mostrar los productos en la página
        const productosContainer = document.querySelector('.productos');
        productosContainer.innerHTML = '';
        productosPagina.forEach(producto => {
          // Aquí debes mostrar cada producto en la página
        });
      }

      function irPaginaAnterior() {
        if (paginaActual > 1) {
          paginaActual--;
          mostrarProductos();
        }
      }
      function irPaginaSiguiente() {
        if (paginaActual < Math.ceil(data.length / productosPorPagina)) {
          paginaActual++;
          mostrarProductos();
        }
      }

        // Agregar event listeners a los botones de paginación
      document.querySelector('.pagina-anterior').addEventListener('click', irPaginaAnterior);
      document.querySelector('.pagina-siguiente').addEventListener('click', irPaginaSiguiente);

      // Mostrar los productos en la página al cargar
      mostrarProductos();
      });

      btnCeliaco.addEventListener('click', () => {
        if (section1.style.display === 'none') {
          tituloCeliaco.style.display = 'flex'
          tituloLacteos.style.display = 'none'
          tituloFrutos.style.display = 'none'
          section1.style.display = 'flex';
          section2.style.display = 'none';
          section3.style.display = 'none';
        } else {
          tituloCeliaco.style.display = 'flex'
          tituloLacteos.style.display = 'none'
          tituloFrutos.style.display = 'none'
          section1.style.display = 'flex';
          section2.style.display = 'none';
          section3.style.display = 'none';
        }
      });

      btnLacteos.addEventListener('click', () => {
        if (section2.style.display === 'none') {
          tituloCeliaco.style.display = 'none'
          tituloLacteos.style.display = 'flex'
          tituloFrutos.style.display = 'none'
          section1.style.display = 'none';
          section2.style.display = 'flex';
          section3.style.display = 'none';
        } else {
          tituloCeliaco.style.display = 'none'
          tituloLacteos.style.display = 'flex'
          tituloFrutos.style.display = 'none'
          section1.style.display = 'none';
          section2.style.display = 'flex';
          section3.style.display = 'none';
        }
      });

      btnFrutos.addEventListener('click', () => {
        if (section3.style.display === 'none') {
          tituloCeliaco.style.display = 'none'
          tituloLacteos.style.display = 'none'
          tituloFrutos.style.display = 'flex'
          section1.style.display = 'none';
          section2.style.display = 'none';
          section3.style.display = 'flex';
        } else {
          tituloCeliaco.style.display = 'none'
          tituloLacteos.style.display = 'none'
          tituloFrutos.style.display = 'flex'
          section1.style.display = 'none';
          section2.style.display = 'none';
          section3.style.display = 'flex';
        }
      });

      data.forEach(producto => {
        const nuevoProducto = document.createElement('div');
        nuevoProducto.classList.add('product');
        nuevoProducto.innerHTML = `
        <img href="" src="${producto.img}" alt="Imagen de ${producto.name}">
        <div class="product-txt">
          <h3>${producto.name}</h3>
          <p class="precio">${producto.price}€</p>
          <div class="cantidad-controles">
            <button class="restar-cantidad" data-id="${producto.id}">-</button>
            <span class="cantidad">0</span>
            <button class="sumar-cantidad" data-id="${producto.id}">+</button>
          </div>
        </div>
        <div class="wishlist-container">
          <button class="wishlist-button" onclick="addToWishlist()">
            <span class="wishlist-text" id="wishlist-text">Agregar a Favoritos</span>
            <img class="heart-icon" src="../images/heart-solid.svg" alt="">
          </button>
        </div>
        <div>
          <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar</a>
        </div>
      `;

        if (producto.category === "celiaco") {
          section1.appendChild(nuevoProducto);
          section1.style.display = 'flex'
        } else if (producto.category === "lacteos") {
          section2.appendChild(nuevoProducto);
          section2.style.display = 'flex'
        } else {
          section3.appendChild(nuevoProducto);
          section3.style.display = 'flex'
        }

        const cantidadSpan = nuevoProducto.querySelector('.cantidad');
        const restarBtn = nuevoProducto.querySelector('.restar-cantidad');
        const sumarBtn = nuevoProducto.querySelector('.sumar-cantidad');
        const agregarBtn = nuevoProducto.querySelector('.agregar-carrito');

        let cantidad = 0;
        restarBtn.addEventListener('click', () => {
          if (cantidad > 0) {
            cantidad -= 1;
            // Actualizar el contador de productos
            actualizarContadorProductos();
          }
        });

        sumarBtn.addEventListener('click', () => {
          cantidad += 1;
          cantidadSpan.textContent = cantidad;
          // Actualizar el contador de productos
          actualizarContadorProductos();
        });

        agregarBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (cantidad > 0) {
            const productoEncontrado = data.find(item => item.id === producto.id);

            if (productoEncontrado) {
              carrito.set(productoEncontrado.id, { producto: productoEncontrado, cantidad });
              // Actualizar localStorage
              localStorage.setItem('carrito', JSON.stringify(Array.from(carrito.entries())));
              console.log(carrito);
              // Reiniciar la cantidad después de agregar al carrito
              cantidad = 0;
              cantidadSpan.textContent = cantidad;
              // Actualizar el contador de productos
              cantidadProductos += 1;
              actualizarContadorProductos();
            }
          }
        });
      });
     
      
      // agregando cantidad seleccionada al icono de la cesta
      const btnContador = document.querySelectorAll('.agregar-carrito');

      contadorProductos.textContent = cantidadProductos;
      console.log(contadorProductos);
       function actualizarContadorProductos() {
        contadorProductos.textContent = cantidadProductos;
        // Actualizar localStorage con el nuevo estado del carrito
        localStorage.setItem('carrito', JSON.stringify(Array.from(carrito.entries())));
      }
      // Agregar un event listener a cada botón para escuchar los clics
      btnContador.forEach(boton => {
        boton.addEventListener('click', () => {
          // Obtener el valor asociado al botón
          const cantidadSeleccionada = parseInt(boton.dataset.cantidad, 10);

          console.log(cantidadSeleccionada);
          // Sumar la cantidad seleccionada a la cantidad total de productos
          cantidadProductos += cantidadSeleccionada;

          // Actualizar el contador con la nueva cantidad
          contadorProductos.textContent = cantidadProductos;
        });
      });
    })
    .catch(error => {
      console.error('Se ha producido un error al obtener los datos del archivo JSON', error);
    });
});
