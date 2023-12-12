fetch('../js/data.json')
.then(response => response.json())
.then(data => {
  const section1 = document.querySelector('#gluten .product-content');
  const section2 = document.querySelector('#lacteo .product-content');
  const section3 = document.querySelector('#frutos .product-content');

  data.forEach(producto => {
    const nuevoProducto = document.createElement('div');
    nuevoProducto.classList.add('product');
    nuevoProducto.innerHTML = `
      <img src="${producto.img}" alt="Imagen de ${producto.name}">
      <div class="product-txt">
        <h3>${producto.name}</h3>
        <p class="precio">${producto.price}€</p>
        <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar</a>
      </div>
    `;

    if (producto.id === 4 || producto.id === 5 || producto.id === 6) {
      section1.appendChild(nuevoProducto);
    } else if (producto.id === 1 || producto.id === 2 || producto.id === 3 || producto.id === 7) {
      section2.appendChild(nuevoProducto);
    } else {
      section3.appendChild(nuevoProducto);
    }
  });
})
.catch(error => {
  console.error('Se ha producido un error al obtener los datos del archivo JSON', error);
});