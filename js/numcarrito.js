const btnCart = document.querySelector('.container-cart-icon');/*para que no desaparezca el pichar solo cuando pinchemos en la cesta*/
const containerCartProducts = document.querySelector(
'.container-cart-products');
/*click en boton cesta */
btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');/*toggle quita y pone la cesta*/
});

/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');


productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {/* e.target nos muestra en el inspector de la pag cada elemento cuando lo pulsamos */
		const product = e.target.parentElement; 

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h3').textContent,
			price: product.querySelector('.precio').textContent,
		};

		const exits = allProducts.some( /*some si existe el producto pone uno mas, 2,3 etc..*/
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {/*some si existe el producto pone uno mas, sino resta*/
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});
// Selecciona todos los botones de eliminación
const removeButtons = document.querySelectorAll('.btn-remove-product');

// Agrega un evento de clic a cada botón de eliminación
removeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Encuentra el contenedor del producto actual
        const productContainer = button.closest('.cart-product');

        // Encuentra el elemento que muestra la cantidad
        const quantityElement = productContainer.querySelector('.cantidad-producto-carrito');

        // Obtiene la cantidad actual del producto
        let quantity = parseInt(quantityElement.textContent);

        // Reduce la cantidad y actualiza el elemento
        quantity--;
    
        quantityElement.textContent = quantity;

        // Si la cantidad llega a cero, elimina el producto del carrito
        if (quantity === 0) {
            productContainer.remove();
        }

        // Actualiza el contador total de productos en el carrito
        updateCartTotal();
    });
});

// Función para actualizar el total del carrito
function updateCartTotal() {
    // ... (código para recalcular el total del carrito)
}

rowProduct.addEventListener('click', e => {/*para que al pulsa la x en cesta borre*/
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

// Funcion para mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;/*limpia la cesta*/
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts  = totalOfProducts + product.quantity;
		console.log(product.quantity)
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};