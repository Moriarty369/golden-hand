// const carrito = JSON.parse(localStorage.getItem('carrito')) || { items: [], total: 0 };

document.addEventListener('DOMContentLoaded', () => {
    const carroLista = document.querySelector('#carro-lista');

    // Obtener el carrito almacenado en localStorage
    const carritoAlmacenado = JSON.parse(localStorage.getItem('carrito')) || [];

    // Mostrar los productos del carrito en la nueva página
    carritoAlmacenado.forEach(item => {
        const nuevoElementoCarro = document.createElement('div');
        nuevoElementoCarro.textContent = `${item.cantidad}x ${item.producto.name} - $${(item.producto.price * item.cantidad).toFixed(2)}`;
        carroLista.appendChild(nuevoElementoCarro);
    });
});
