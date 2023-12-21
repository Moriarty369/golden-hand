function initMap() {
    var map = new google.maps.Map(document.getElementById('parallax-map'), {
        center: { lat: 40.39680634551337, lng: -3.6995415288354443 },
        zoom: 18,
        mapId: '47dafbb6434643c7'
    });
    

    const mapIcon = {
        url: "../images/manos.png",
        scaledSize: new google.maps.Size(30, 48),
        // origin: new google.maps.Point(0, 0),
        // anchor: new google.maps.Point(24, 20.5)
    };
    // Crea un marcador para tu tienda
    new google.maps.Marker({
        position: { lat: 40.39680634551337, lng: -3.6995415288354443 },
        map: map,
        title: "Visítanos!",
        icon: mapIcon
    });
    console.log(mapIcon)
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        panel: document.getElementById('directions-panel'),
        suppressMarkers: true // Oculta los marcadores predeterminados de Google Maps
    });
    
  // ...

    userLocationMarker = new google.maps.Marker({
        position: null, // Se actualizará con la ubicación del usuario
        map: map,
        title: "Tu ubicación",
        icon: {
            url: "../images/abuelos.png", // Ruta de la imagen personalizada del usuario
            scaledSize: new google.maps.Size(30, 30),
        },
    });

// ...


    // Obtiene la ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Actualiza la posición del marcador del usuario
                userLocationMarker.setPosition(userLocation);

                // Calcula y muestra las indicaciones para llegar a tu tienda
                const request = {
                    origin: userLocation,
                    destination: { lat: 40.39680634551337, lng: -3.6995415288354443 }, // Cambia por las coordenadas de tu tienda
                    travelMode: google.maps.TravelMode.DRIVING
                };

                directionsService.route(request, (response, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsRenderer.setDirections(response);
                    } else {
                        console.error("Error al calcular la ruta:", status);
                    }
                });
            },
            (error) => {
                console.error("Error al obtener la ubicación del usuario:", error);
            }
        );
    } else {
        console.error("La geolocalización no está soportada por el navegador.");
    }



    // Añade los controles de dirección al mapa
    const directionsControls = document.getElementById('directions-controls');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(directionsControls);
}
function calculateRoute(travelMode) {
    const request = {
        origin: userLocationMarker.getPosition(),
        destination: { lat: 40.39680634551337, lng: -3.6995415288354443 },
        travelMode: google.maps.TravelMode[travelMode],
    };

    directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);
        } else {
            console.error("Error al calcular la ruta:", status);
        }
    });
}




