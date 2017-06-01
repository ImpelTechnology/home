app.detalleservicio = kendo.observable({
	onInit: function (e) { },
	afterShow: function () { },
	onShow: function () { },
	datos: []
});
var map;
var lat1, lat2, long1, long2;
var directionsDisplay;
var directionsService;
var geocoder;
var idavuelta;
var tramite;
var distancia1, distancia2;
function buildMap() {
	try {
		var servicio = sessionStorage.getItem("servicio");
		servicio = JSON.parse(servicio);

		if (servicio.RProductos == "Documentos") {
			var x = document.getElementById("docs");
			x.style.display = "";
			var x = document.getElementById("paqu");
			x.style.display = "none";
		} else if (servicio.RProductos == "Paquete") {
			var x = document.getElementById("paqu");
			x.style.display = "";
			var x = document.getElementById("docs");
			x.style.display = "none";
		}

		idavuelta = servicio.Ida_y_Vuelta;
		tramite = servicio.Incluye_Trmite;

		var fecha1 = new Date(servicio.Fecha);
		fecha1 = ("00" + (fecha1.getMonth() + 1)).slice(-2) + "/" + ("00" + fecha1.getDate()).slice(-2) + "/" + fecha1.getFullYear() + " " + ("00" + fecha1.getHours()).slice(-2) + ":" + ("00" + fecha1.getMinutes()).slice(-2) + ":" + ("00" + fecha1.getSeconds()).slice(-2);

		document.getElementById('fecha').innerHTML = "Fecha: " + fecha1;
		document.getElementById('origen').innerHTML = servicio.Dorigen;
		document.getElementById('destino').innerHTML = servicio.Ddestino;
		//document.getElementById('responsable').innerHTML = servicio.ResponsableD;
		document.getElementById('precio').innerHTML = "Costo envío: " + servicio.precio;
		document.getElementById('tipoProd').innerHTML = servicio.RProductos;
		document.getElementById('estado').innerHTML = servicio.status;

		if (tramite) {
			document.getElementById('tramite').innerHTML = "Incluye Trámite";
		} else {
			document.getElementById('tramite').innerHTML = "No incluye trámite";
		}
		var origen = servicio.Dorigen;
		//***************************************
		var mapOptions = {
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		directionsDisplay = new google.maps.DirectionsRenderer;
		directionsService = new google.maps.DirectionsService;

		map = new google.maps.Map(document.getElementById("map2"), mapOptions);
		directionsDisplay.setMap(map);
		geocoder = new google.maps.Geocoder;

		var destino = servicio.Ddestino;
		DibujarRuta(directionsService, directionsDisplay, origen, destino);
		calculardistancia(origen, destino, idavuelta);



		/*
				origen = origen.replace(/\s/g, "%20");
		
				var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + origen;
		
				$.ajax({
					url: url,
					success: function (e) {
						try {
							if (e.status == "ZERO_RESULTS") {
								mens(" Es posible que la dirección de origen no exista", "warning");
								window.location = "index.html#components/Servicios/servicios.html";
								return;
							}
							var resp = e;
							lat1 = resp.results[0].geometry.location.lat;
							long1 = resp.results[0].geometry.location.lng;
		
							var myLatLng = { lat: lat1, lng: long1 };
		
							var mapOptions = {
								center: myLatLng,
								zoom: 15,
								mapTypeId: google.maps.MapTypeId.ROADMAP
							};
							directionsDisplay = new google.maps.DirectionsRenderer;
							directionsService = new google.maps.DirectionsService;
		
							map = new google.maps.Map(document.getElementById("map2"), mapOptions);
							directionsDisplay.setMap(map);
							geocoder = new google.maps.Geocoder;
		
							var destino = servicio.Ddestino;
							destino = destino.replace(/\s/g, "%20");
		
							var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + destino;
							$.ajax({
								url: url,
								success: function (e) {
									try {
										if (e.status == "ZERO_RESULTS") {
											mens(" Es posible que la dirección de destino no exista", "warning");
											window.location = "index.html#components/Servicios/servicios.html";
											return;
										}
										var resp = e;
										lat2 = resp.results[0].geometry.location.lat;
										long2 = resp.results[0].geometry.location.lng;
		
										var destino = { lat: lat2, lng: long2 };
		
										calculateAndDisplayRoute(directionsService, directionsDisplay, lat1, long1, lat2, long2);
										//if (idavuelta) {
										//   calculateAndDisplayRoute(directionsService, directionsDisplay, lat2, long2, lat1, long1);
										// }
										calculardistancia(lat1, long1, lat2, long2, idavuelta);
									} catch (h) {
										alert("h2 " + h);
									}
								},
								error: function (d) { }
							});
		
						} catch (h) {
							alert("h " + h);
						}
					},
					error: function (d) {
						alert(d);
					}
				});
		
		*/

	} catch (s) {
		alert("s " + s);
	}
}
function calculateAndDisplayRoute(directionsService, directionsDisplay, lat1, long1, lat2, long2) {
	try {
		var selectedMode = "DRIVING";

		if (idavuelta) {
			var parada = lat2 + "," + long2;
			var waypts = [];
			waypts.push({
				location: parada,
				stopover: true
			});
			var request = {
				origin: { lat: lat1, lng: long1 },
				destination: { lat: lat1, lng: long1 },
				waypoints: waypts,
				travelMode: google.maps.TravelMode.DRIVING
			};
			directionsService.route(request, function (result, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					//autoRefresh(map, result.routes[0].overview_path);
					directionsDisplay.setDirections(result);
				} else {
					alert('Directions request failed due to ' + status);
				}
			});

		} else {

			var request = {
				origin: { lat: lat1, lng: long1 },
				destination: { lat: lat2, lng: long2 },
				travelMode: google.maps.TravelMode.DRIVING
			};
			directionsService.route(request, function (result, status) {
				if (status == google.maps.DirectionsStatus.OK) {

					// autoRefresh(map, result.routes[0].overview_path);
					directionsDisplay.setDirections(result);
				} else {
					alert('Directions request failed due to ' + status);
				}
			});
		}

	} catch (k) {
		alert("k " + k);
	}
}
function calculardistancia(origen, destino, idavuelta) {
	try {
		var origin1 = origen;
		var destinationA = destino;
		var origens = [origin1];
		var destins = [destinationA];
		if (idavuelta) {
			var origens = [origin1, destinationA];
			var destins = [destinationA, origin1];
		}
		var service = new google.maps.DistanceMatrixService;
		service.getDistanceMatrix({
			origins: origens,
			destinations: destins,
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC,
			avoidHighways: false,
			avoidTolls: false
		}, function (response, status) {
			if (status !== google.maps.DistanceMatrixStatus.OK) {
				alert('Error: ' + status);
			} else {
				var originList = response.originAddresses;
				var destinationList = response.destinationAddresses;
				var outputDiv = document.getElementById('distancia');

				var distancia = response.rows[0].elements[0].distance.text;
				var duracion = response.rows[0].elements[0].duration.text;
				if (idavuelta) {
					var distancia2 = response.rows[1].elements[1].distance.text;
					var duracion2 = response.rows[1].elements[1].duration.text;

					outputDiv.innerHTML = "Ida: " + distancia + ", Vuelta: " + distancia2;
				} else {
					outputDiv.innerHTML = "Trayecto: " + distancia;
				}
			}
		});
	} catch (s) {
		alert("s " + s);
	}
}

function autoRefresh(map, pathCoords) {
	var i, route, marker;
	route = new google.maps.Polyline({
		path: [],
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2,
		editable: false,
		map: map
	});

	var icon = {
		url: "components/Graph/mto.png", // url
		scaledSize: new google.maps.Size(30, 28)// scaled size
	};

	marker = new google.maps.Marker({
		map: map,
		icon: icon
	});

	for (i = 0; i < pathCoords.length; i++) {
		setTimeout(function (coords) {
			route.getPath().push(coords);
			moveMarker(map, marker, coords);
		}, 400 * i, pathCoords[i]);
	}
}
function moveMarker(map, marker, latlng) {
	marker.setPosition(latlng);
	map.panTo(latlng);
}