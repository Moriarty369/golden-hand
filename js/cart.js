const productos = [
    { nombre: "harina", precio: 50 },
    { nombre: "galletitas", precio: 100 },
    { nombre: "pollo", precio: 150 },
    { nombre: "leche", precio: 400 },
    { nombre: "gaseosa", precio: 500 },
  ];

  let carrito = [];
  
  
  let seleccion = prompt("hola desea comprar algo si o no")

  /*mientras mi seleccion sea de si o no*/
  while (seleccion != "si" && seleccion != "no") {
    alert("por favor ingresa una de las opciones, si o no")
    seleccion = prompt("hola desea comprar algo si o no")
  }
  
  if (seleccion == "si") {
    alert("a continuación lista de productos")
    let todosLosProductos = productos.map((producto) => producto.nombre + " " + producto.precio + "$");
    
    /* con el metodo join recorro todo lo que esta dentro del array*/ 
    alert(todosLosProductos.join(" - "))
  } else if (seleccion == "no") {
    alert("gracias por venir al supermecado! hasta luego!")
  }
  
  /*mientas mi seleccion sea no*/
  while (seleccion != "no"){
    let producto = prompt("agrega un producto a tu carrito!")
    let precio = 0;

  /*si producto es igual a harina o galletitas o...*/
    if (
      producto == "harina" ||
      producto == "galletitas" ||
      producto == "pollo" ||
      producto == "leche" ||
      producto == "gaseosa"
    ) {
   
      switch (producto) {
        case "harina":
          precio = 50;
          break;
        case "galletitas":
          precio = 100;
          break;
        case "pollo":
          precio = 150;
          break;
        case "leche":
          precio = 400;
          break;
        case "gaseosa":
          precio = 500;
          break;
        default:
          break;
      }
      let unidades = parseInt(prompt("cuantas unidades de ese producto quieres llevar"))

  /*push para que tenga producto unidadesy  */
      carrito.push({ producto, unidades, precio })
      console.log(carrito);
    } else {
      alert("no tenemos ese prodcto");
    }
  
    
   seleccion = prompt("quiere seguir comprando si o no");
  
  
   while(seleccion === "no"){
    alert("Gracias Hasta pronto!")
    carrito.forEach((carritoFinal) => {
        console.log(`"producto:" ${carritoFinal.producto}, "unidades:" ${carritoFinal.unidades}, "total a pagar por producto:" ${carritoFinal.unidades * carritoFinal.precio}`)
      })
      break;
    }
  }
  
  /*reduce -coje todo lo q quiera y me da un resultado
  acc - acumulador
  el. - hace referncia a precio, etc..*/
  
  const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0);
  console.log(`el total a pagar por su compra es de:  ${total}`);  

      /*nnnnnnnnnnnnnnnnnnnnnnnnnnnnnn */

  function handleAFeedData({element_count, near_earth_objects}, afeedElement, afeedTable){


    afeedElement.innerHTML = Object.keys(near_earth_objects).map(date=>{
        return near_earth_objects[date].map(product=>{

            const img       = product.img
            const id        = product.id;
            const name      = product.name;
            const price     = product.price;
           
            return <div class="product">
                <img src="${path}" alt="imagen de bolsa de semillas de linaza">
                <div class="product-txt">
                    <h3>${title}</h3>
                    <p class="precio">${price}</p>
                    <a href="#" class="agregar-carrito btn-2" data-id="6">Agregar</a>
                </div>
            </div>

        }).join("");

    }).join("");

    if(afeedElement.innerHTML === ""){
        afeedTable.className = "striped hide"
    } else{
        afeedTable.className = "striped";
    }


}