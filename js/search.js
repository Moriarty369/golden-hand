// desplegando y escondiendo el div contenedor search input      
function toggleSearch() {
    const searchContainer = document.getElementById('search-container');
    // const searchResults = document.getElementById('search-results');
    // Cambia la condición para comprobar si el estilo display es '' o 'none'
    searchContainer.style.display = (searchContainer.style.display === '' || searchContainer.style.display === 'none') ? 'block' : 'none';
    // searchResults.style.display = (searchContainer.style.display === '' || //////searchResults.style.display === 'none') ? 'block' : 'none';
}

async function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    // imprimiendo dinamicamente el input
    // console.log(searchTerm);
    const response = await fetch('../js/data.json');
    const productos = await response.json();
    // imprimiendo json de productos para supervisar sugerencias dinámicas
    // console.log(productos)
    const resultados = productos.filter(producto =>
        producto.name.toLowerCase().startsWith(searchTerm)
    );
    // OJO imprimiendo dinamicamente json comparado con busqueda (por cualquier caracter) 
    console.log(resultados)
    displaySearchResults(resultados);
}

function displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.classList.add('show-search');
    // Limpiamos el contenido actual
    resultsContainer.innerHTML = '';

    // Iterando sobre los resultados
    results.forEach(result => {
        //  un elemento div para contener cada resultado
        const resultContainer = document.createElement('div');
        resultContainer.classList.add('search-result'); // Agregamos una clase para aplicar estilos si es necesario


        //  div para la imagen y le aplicamos una clase
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('search-img-container');
        resultsContainer.appendChild(imageContainer);
        //  elemento img para la imagen
        const imageElement = document.createElement('img');
        imageElement.classList.add('search-img');
        imageElement.src = result.img; // Supongo que tienes una propiedad img en tu objeto resultado
        imageElement.alt = result.name; // Asignamos el nombre como el texto alternativo de la imagen
        imageContainer.appendChild(imageElement);
        // Creamos un elemento para el nombre
        const nameElement = document.createElement('div');
        nameElement.classList.add('search-name');
        nameElement.textContent = result.name;
        resultContainer.appendChild(nameElement);

        // Creamos un elemento para el precio
        const priceElement = document.createElement('div');
        priceElement.classList.add('search-price');
        priceElement.textContent = `Precio: $${result.price}`;
        resultContainer.appendChild(priceElement);

        // Añadimos el contenedor de resultados al contenedor principal
        resultsContainer.appendChild(resultContainer);
    });
}


// Agregar un evento al input de búsqueda para llamar a searchProducts cuando haya cambios
document.getElementById('search-input').addEventListener('input', searchProducts);
