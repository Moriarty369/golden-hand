const carrito = new Map();
document.addEventListener('DOMContentLoaded', () => {
  let section1, section2, section3;

  fetch('../js/data.json')
    .then(response => response.json())
    .then(data => {
      section1 = document.querySelector('#gluten');
      section2 = document.querySelector('#lacteo');
      section3 = document.querySelector('#frutos');

      data.forEach(producto => {
        const nuevoProducto = document.createElement('div');
        nuevoProducto.classList.add('product');
        nuevoProducto.innerHTML = `
          <img id="open-modal" class="open-modal"  src="${producto.img}" alt="Imagen de ${producto.name}">
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

        if (producto.category === "celiaco" ) {
          section1.appendChild(nuevoProducto);
        } else if (producto.category === "lacteos" )  {
          section2.appendChild(nuevoProducto);
        } else {
          section3.appendChild(nuevoProducto);
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
          }
        });

        sumarBtn.addEventListener('click', () => {
          cantidad += 1;
          cantidadSpan.textContent = cantidad;
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
            }
          }
        });
      });
    })
    .catch(error => {
      console.error('Se ha producido un error al obtener los datos del archivo JSON', error);
    });

});

//Modal

const windowBackground = document.getElementById('window-background')
const windowContainer = document.getElementById('window-container')
const openModal = nuevoProducto.querySelector('.open-modal');
const closeModal = document.getElementById('close-modal')


// Hacer forEach para seleccionar cada producto
// openModal.addEventListener('click', () => 
//   windowBackground.style.display = 'flex'
// );

const closeWindow = () => {
  windowContainer.classList.add('close')

  setTimeout(() => {
  windowContainer.classList.remove('close')
  windowBackground.style.display = 'none' }, 1000);
  }

  closeModal.addEventListener('click',() => closeWindow())

  window.addEventListener('click', e=> e.target == windowBackground && closeWindow())