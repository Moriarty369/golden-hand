const carrito = new Map();
let cantidadProductos = 0; // Inicializar el contador para agregar a pagina de carrito
let cantidadProductosSeleccionada = 0; // contador para agregar numero de productos a icono de carrito
const contadorProductos = document.getElementById('contador-productos');

// Función para actualizar el contador de productos en el icono de carrito
function actualizarContadorProductos() {
  contadorProductos.textContent = cantidadProductosSeleccionada;
  // También puedes actualizar localStorage aquí si es necesario
  // localStorage.setItem('cantidadEnLocalStorage', cantidadProductosSeleccionada);
}


document.addEventListener('DOMContentLoaded', () => {
  let section1, section2, section3;
  // Realizar una solicitud para obtener datos del archivo JSON
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
      const contenedordiv = document.querySelector("#contenedordiv")
      const botones = document.getElementById('contenedorboton')


      // Agregar evento al botón "Ver Todo"
      verTodo.addEventListener('click', () => {
        if (section1.style.display === 'none') {
          contenedordiv.style.display = 'flex'
          botones.style.display = 'flex'
          tituloCeliaco.style.display = 'none'
          tituloLacteos.style.display = 'none'
          tituloFrutos.style.display = 'none'
          section1.style.display = 'none';
          section2.style.display = 'none';
          section3.style.display = 'none';
        } else {
          contenedordiv.style.display = 'flex'
          botones.style.display = 'flex'
          tituloCeliaco.style.display = 'none'
          tituloLacteos.style.display = 'none'
          tituloFrutos.style.display = 'none'
          section1.style.display = 'none';
          section2.style.display = 'none';
          section3.style.display = 'none';
        }
        let paginaActual = 1;
        const tarjetasPorPagina = 3;
        let data = [];

        function renderizarProductos(paginaActual, tarjetasPorPagina, data) {
          const container = document.querySelector('#contenedordiv');
          container.innerHTML = ''; // Limpiar el contenedor antes de añadir nuevos productos

          const inicio = (paginaActual - 1) * tarjetasPorPagina;
          const final = inicio + tarjetasPorPagina;
          const paginadoTarjetas = data.slice(inicio, final);

          paginadoTarjetas.forEach(producto => {
            const nuevoProducto = document.createElement('div');
            nuevoProducto.classList.add('product');
            nuevoProducto.innerHTML = `
            <a href="#"><img  src="${producto.img}" alt="Imagen de ${producto.name}"></a>
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
            container.appendChild(nuevoProducto);

            const cantidadSpan = nuevoProducto.querySelector('.cantidad');
            const restarBtn = nuevoProducto.querySelector('.restar-cantidad');
            const sumarBtn = nuevoProducto.querySelector('.sumar-cantidad');
            const agregarBtn = nuevoProducto.querySelector('.agregar-carrito');

            let cantidad = 0;
            restarBtn.addEventListener('click', () => {
              if (cantidad > 0) {
                cantidad -= 1;
                cantidadSpan.textContent = cantidad;
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
        }

        fetch('../js/data.json')
          .then(respuesta => respuesta.json())
          .then(json => {
            data = json
            renderizarProductos(paginaActual, tarjetasPorPagina, json);
          });
        // Agregar eventos para la paginación
        document.getElementById('anterior').addEventListener('click', () => {
          if (paginaActual > 1) {
            paginaActual--;
            renderizarProductos(paginaActual, tarjetasPorPagina, data);
          }
        });

        document.getElementById('siguiente').addEventListener('click', () => {
          // Necesitarás calcular el total de páginas basado en los datos totales
          let totalPaginas = Math.ceil(data.length / tarjetasPorPagina);
          if (paginaActual < totalPaginas) {
            paginaActual++;
            renderizarProductos(paginaActual, tarjetasPorPagina, data);
          }
        });
      });


      // Agregar eventos para cambiar la visibilidad de las secciones
      btnCeliaco.addEventListener('click', () => {
        if (section1.style.display === 'none') {
          contenedordiv.style.display = 'none'
          botones.style.display = 'none'
          tituloCeliaco.style.display = 'flex'
          tituloLacteos.style.display = 'none'
          tituloFrutos.style.display = 'none'
          section1.style.display = 'flex';
          section2.style.display = 'none';
          section3.style.display = 'none';
        } else {
          contenedordiv.style.display = 'none'
          botones.style.display = 'none'
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
          contenedordiv.style.display = 'none'
          botones.style.display = 'none'
          tituloCeliaco.style.display = 'none'
          tituloLacteos.style.display = 'flex'
          tituloFrutos.style.display = 'none'
          section1.style.display = 'none';
          section2.style.display = 'flex';
          section3.style.display = 'none';
        } else {
          contenedordiv.style.display = 'none'
          botones.style.display = 'none'
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
          contenedordiv.style.display = 'none'
          botones.style.display = 'none'
          tituloCeliaco.style.display = 'none'
          tituloLacteos.style.display = 'none'
          tituloFrutos.style.display = 'flex'
          section1.style.display = 'none';
          section2.style.display = 'none';
          section3.style.display = 'flex';
        } else {
          contenedordiv.style.display = 'none'
          botones.style.display = 'none'
          tituloCeliaco.style.display = 'none'
          tituloLacteos.style.display = 'none'
          tituloFrutos.style.display = 'flex'
          section1.style.display = 'none';
          section2.style.display = 'none';
          section3.style.display = 'flex';
        }
      });
      // Iterar sobre los productos y agregarlos a las secciones correspondientes
      data.forEach(producto => {
        const nuevoProducto = document.createElement('div');
        nuevoProducto.classList.add('product');
        nuevoProducto.innerHTML = `
        <a href="#"><img  src="${producto.img}" alt="Imagen de ${producto.name}"></a>
        <div class="product-txt">
          <h3>${producto.name}</h3>
          <p class="precio">${producto.price}€</p>
          <div class="cantidad-controles">
            <button class="restar-cantidad" data-id="${producto.id}">-</button>
            <span class="cantidad" id="cantidad">0</span>
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
        // Agregar el producto a la sección correspondiente según la categoría
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
        // Inicializar la cantidad para cada producto
        let cantidad = 0;
        restarBtn.addEventListener('click', () => {
          if (cantidad > 0) {
            cantidad -= 1;
            cantidadSpan.textContent = cantidad;
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
        /// LOCAL STORAGE ES IGUAL A LA PIZARRA DE NATALIA
        agregarBtn.addEventListener('click', (event) => {
          event.preventDefault();

          if (cantidad > 0) {
            const productoEncontrado = data.find(item => item.id === producto.id);

            if (productoEncontrado) {
              carrito.set(productoEncontrado.id, { producto: productoEncontrado, cantidad });
              // Actualizar localStorage
              localStorage.setItem('carrito', JSON.stringify(Array.from(carrito.entries())));
              console.log(carrito);
            }

          }
           // PRINCIPIO CONTADOR DE CESTA EL NUMERO
          // Seleccionar todos los botones de "agregar al carrito"
          const btnContador = document.querySelectorAll('.agregar-carrito');
          const contadorProductos = document.querySelector('#contador-productos');
          
          contadorProductos.textContent = cantidad;
          
          // Agregar un e ent listener a cada botón para escuchar los clics
          btnContador.forEach(boton => {
            boton.addEventListener('click', () => {
            
              // Incrementar la cantidad de productos
              productoEncontrado;
               
              contadorProductos.textContent = productoEncontrado;
            });
          });

        // FIN CONTADOR DE CESTA EL NUMERO 
        });
        
        
      });
      


    })
    .catch(error => {
      console.error('Se ha producido un error al obtener los datos del archivo JSON', error);
    });


});