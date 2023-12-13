 Espera a que el DOM esté completamente cargado para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // Script para cargar productos y manipular el DOM
    fetch('../js/data.json')
      .then(response => response.json())
      .then(data => {
        // Seleccionar las secciones donde se mostrarán los productos
        const section1 = document.querySelector('#gluten');
        const section2 = document.querySelector('#lacteo');
        const section3 = document.querySelector('#frutos');
  
        // Iterar sobre cada producto en los datos
        data.forEach(producto => {
          // Crear un nuevo elemento div para representar el producto
          const nuevoProducto = document.createElement('div');
          nuevoProducto.classList.add('product');
          nuevoProducto.innerHTML = `
            <img src="${producto.img}" alt="Imagen de ${producto.name}">
            <div class="product-txt">
              <h3>${producto.name}</h3>
              <p class="precio">${producto.price}€</p>
              <div class="cantidad-controles">
                <button class="restar-cantidad" data-id="${producto.id}">-</button>
                <span class="cantidad">0</span>
                <button class="sumar-cantidad" data-id="${producto.id}">+</button>
              </div>
              <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar</a>
            </div>
          `;
  
          // Asignar el producto a la sección correspondiente según su categoría
          if (producto.id === 4 || producto.id === 5 || producto.id === 6) {
            section1.appendChild(nuevoProducto);
          } else if (producto.id === 1 || producto.id === 2 || producto.id === 3 || producto.id === 7) {
            section2.appendChild(nuevoProducto);
          } else {
            section3.appendChild(nuevoProducto);
          }
  
          // Obtener referencias a elementos relevantes dentro del nuevo producto
          const cantidadSpan = nuevoProducto.querySelector('.cantidad');
          const restarBtn = nuevoProducto.querySelector('.restar-cantidad');
          const sumarBtn = nuevoProducto.querySelector('.sumar-cantidad');
          const agregarBtn = nuevoProducto.querySelector('.agregar-carrito');
  
          // Variable para rastrear la cantidad de productos seleccionada
          let cantidad = 0;
  
          // Event listener para reducir la cantidad al hacer clic en el botón de restar
          restarBtn.addEventListener('click', () => {
            if (cantidad > 0) {
              cantidad -= 1;
              cantidadSpan.textContent = cantidad;
            }
          });
  
          // Event listener para aumentar la cantidad al hacer clic en el botón de sumar
          sumarBtn.addEventListener('click', () => {
            cantidad += 1;
            cantidadSpan.textContent = cantidad;
          });
  
          // Event listener para agregar el producto al carrito al hacer clic en el botón de agregar
          agregarBtn.addEventListener('click', (event) => {
            event.preventDefault();
  
            // Verificar que la cantidad seleccionada sea mayor que 0
            if (cantidad > 0) {
              // Buscar el producto en la lista de productos
              const productoEncontrado = data.find(item => item.id === producto.id);
  
              // Agregar el producto al carrito
              if (productoEncontrado) {
                carrito.agregarItem(productoEncontrado, cantidad);
              }
            }
          });
        });
      })
      .catch(error => {
        // Manejar errores en caso de que la carga de productos falle
        console.error('Se ha producido un error al obtener los datos del archivo JSON', error);
      });
  
    // ... (código posterior)
  });
  

  //nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn

/*document.addEventListener('DOMContentLoaded', () => {
  // Datos de productos (puedes cargarlos desde tu archivo JSON)
  const productsData = [
    { id: 1, name: 'Producto 1', price: 10, img: 'imagen1.jpg' },
    { id: 2, name: 'Producto 2', price: 20, img: 'imagen2.jpg' },
    // Agrega más productos según sea necesario
  ];

  const carrito = [];
  const carritoLista = document.getElementById('carrito-lista');
  const totalCarritoElement = document.getElementById('total-carrito');

  // Función para mostrar el carrito en el DOM
  function renderCarrito() {
    carritoLista.innerHTML = '';
    let totalCarrito = 0;

    carrito.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} - ${item.quantity} x ${item.price}€`;
      carritoLista.appendChild(listItem);

      totalCarrito += item.quantity * item.price;
    });

    totalCarritoElement.textContent = totalCarrito;
  }

  // Función para agregar un producto al carrito
  function addToCart(product) {
    const existingItem = carrito.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      carrito.push({ ...product, quantity: 1 });
    }

    renderCarrito();
  }

  // Cargar productos en las secciones correspondientes
  const section1 = document.querySelector('#gluten');
  const section2 = document.querySelector('#lacteo');
  const section3 = document.querySelector('#frutos');

  productsData.forEach(producto => {
    const nuevoProducto = document.createElement('div');
    nuevoProducto.classList.add('product');
    nuevoProducto.innerHTML = `
      <img src="${producto.img}" alt="Imagen de ${producto.name}">
      <div class="product-txt">
        <h3>${producto.name}</h3>
        <p class="precio">${producto.price}€</p>
        <div class="cantidad-controles">
          <button class="restar-cantidad" data-id="${producto.id}">-</button>
          <span class="cantidad">0</span>
          <button class="sumar-cantidad" data-id="${producto.id}">+</button>
        </div>
        <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar</a>
      </div>
    `;

    // Agregar evento de clic para agregar al carrito
    const agregarCarritoBtn = nuevoProducto.querySelector('.agregar-carrito');
    agregarCarritoBtn.addEventListener('click', () => addToCart(producto));

    if (producto.gluten) {
      section1.appendChild(nuevoProducto);
    } else if (producto.lacteo) {
      section2.appendChild(nuevoProducto);
    } else if (producto.frutos) {
      section3.appendChild(nuevoProducto);
    }
  });
});
*/