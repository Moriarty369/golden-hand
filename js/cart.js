// Agregar un event listener al body para escuchar los clicks en los botones
document.body.addEventListener('click', function(event) {
  // Verificar si el elemento clickeado es un botón con la clase 'agregar-carrito'
  if (event.target.classList.contains('agregar-carrito')) {
    const idProducto = event.target.getAttribute('data-id');
    // Usar fetch para obtener el archivo JSON
    fetch('../js/data.json')
      .then(response => response.json())
      .then(data => {
        // Encontrar el producto con el id correspondiente
        const productoEncontrado = data.find(producto => producto.id === idProducto);
        // Trabajar con el producto encontrado
        console.log(productoEncontrado);
      })
      .catch(error => {
        console.error('Error al obtener los datos del archivo JSON', error);
      });
  }
});


// console.log("HOLA MUNDO")
// document.addEventListener('DOMContentLoaded', function () {
//   // Objeto principal que representa el carrito de compras
//   function Carrito() {
//     this.items = [];

//     // Método para cargar los productos desde un archivo JSON
//     this.cargarProductos = function () {
//       fetch('./data.json') // Ajusta la ruta según la ubicación de tu archivo JSON
//         .then(response => response.json())
//         .then(shopItemsData => {
//           // Asignar los productos cargados al carrito
//           this.items = shopItemsData.map(item => ({ producto: new Producto(item.id, item.name, item.price), cantidad: 0 }));

//           // Actualizar la interfaz del carrito después de cargar los productos
//           actualizarCarrito();
//         })
//         .catch(error => {
//           console.error('Error al cargar los productos:', error);
//         });
//     };

//     // Método para agregar un producto al carrito
//     this.agregarItem = function(producto) {
//       const itemExistente = this.items.find(item => item.producto.id === producto.id);

//       if (itemExistente) {
//         itemExistente.cantidad += 1;
//       } else {
//         const nuevoItem = { producto: producto, cantidad: 1 };
//         this.items.push(nuevoItem);
//       }

//       actualizarCarrito();
//     };
// // Método para calcular el total del carrito
//     this.calcularTotal = function() {
//       return this.items.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
//     };

//     // Función para actualizar la interfaz del carrito
//     function actualizarCarrito() {
//       // Lógica para actualizar el contenido del carrito en la interfaz
//       // Puedes acceder al carrito y sus propiedades aquí
//       console.log(carrito);
//     }
//   }

//   // Objeto para representar un producto
//   function Producto(id, nombre, precio) {
//     this.id = id;
//     this.nombre = nombre;
//     this.precio = precio;
//   }

//   // Crear una instancia del carrito
//   const carrito = new Carrito();

//   // Obtener los botones de agregar al carrito
//   const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');

//   // Manejar clics en los botones de agregar al carrito
//   botonesAgregarCarrito.forEach(boton => {
//     boton.addEventListener('click', function (event) {
//       event.preventDefault();

//       // Obtener el ID del producto desde el atributo data-id
//       const idProducto = parseInt(boton.getAttribute('data-id'));

//       // Buscar el producto en tu lista de productos (puedes extender esta lista)
//       const productoEncontrado = carrito.items.find(item => item.producto.id === idProducto);

//       // Agregar el producto al carrito
//       if (productoEncontrado) {
//         carrito.agregarItem(productoEncontrado.producto);
//       }
//     });
//   });

//   // Llamar al método para cargar productos cuando se inicie la aplicación
//   carrito.cargarProductos();
// });