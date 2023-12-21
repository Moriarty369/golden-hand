const carrito = new Map();
let cantidadProductos = 0; // Inicializar el contador
let contadorProductos = document.getElementById('contador-productos');


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
      const contenedordiv = document.querySelector("#contenedordiv")
      const botones = document.getElementById('contenedorboton')


      //// ESTO ES PARA MOSTRAR EN "VER TODO" LOS PRODUCTOS PAGINADOS
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
            <a id="open-modal" href="#"><img  src="${producto.img}" alt="Imagen de ${producto.name}"></a>
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

      /// AQUI TERMINA LOS PRODUCTOS PAGINADOS

      /// AQUI EMPIEZA LOS PRODUCTOS POR CATEGORIAS SEGUN SUS BOTONES

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

      /// AQUI TERMINA LOS PRODUCTOS POR BOTONES DE CATEGORIA

      data.forEach(producto => {
        const nuevoProducto = document.createElement('div');
        nuevoProducto.classList.add('product');
        nuevoProducto.innerHTML = `
        <a id="open-modal" href="#"><img  src="${producto.img}" alt="Imagen de ${producto.name}"></a>
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

      // contadorProductos.textContent = cantidadProductos;
      function actualizarContadorProductos() {
        contadorProductos.textContent = cantidadProductos;
        console.log(contadorProductos);
        // Actualizar localStorage con el nuevo estado del carrito
        localStorage.setItem('carrito', JSON.stringify(Array.from(carrito.entries())));
      }
      // Agregar un event listener a cada botón para escuchar los clics
      btnContador.forEach(boton => {
        boton.addEventListener('click', () => {
          // Obtener el valor asociado al botón
          let cantidadSeleccionada = 0;

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


  //// MODAL 
  // Obtener todas las imágenes con la clase "open-modal"
  var images = document.querySelectorAll('.product img#open-modal');
  var modal = document.getElementById('myModal');
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");

  images.forEach(img => {
    img.onclick = function () {
      var imageSrc = this.src;
      var productName = this.alt.replace('Imagen de ', '');
      var productPrice = this.nextElementSibling.querySelector('.precio').textContent;

      modal.style.display = "block";
      modalImg.src = imageSrc;
      captionText.innerHTML = `<h3>${productName}</h3><p>${productPrice}</p>`;
    }
  });
  ///////// FIN MODAL

});