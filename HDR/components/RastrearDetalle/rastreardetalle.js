
app.mapaservicio = kendo.observable({
	onInit: function (e) { },
	afterShow: function () { }
});
var map;
var lat1, lat2, long1, long2;
var directionsDisplay;
var directionsService;
var geocoder;
var idavuelta;
var tramite;
var idservi;
var distancia1, distancia2;
function buildMap2() {
	try {
		setInterval('getLocation()', 2000);

		var servicio = sessionStorage.getItem("servicioRastreo");
		servicio = JSON.parse(servicio);

		idavuelta = servicio.Ida_y_Vuelta;
		tramite = servicio.Incluye_Trmite;
		idservi = servicio.id;

		var fecha1 = new Date(servicio.Fecha);
		fecha1 = ("00" + (fecha1.getMonth() + 1)).slice(-2) + "/" + ("00" + fecha1.getDate()).slice(-2) + "/" + fecha1.getFullYear() + " " + ("00" + fecha1.getHours()).slice(-2) + ":" + ("00" + fecha1.getMinutes()).slice(-2) + ":" + ("00" + fecha1.getSeconds()).slice(-2);

		var origen = servicio.Dorigen;
		var mapOptions = {
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		directionsDisplay = new google.maps.DirectionsRenderer;
		directionsService = new google.maps.DirectionsService;

		map = new google.maps.Map(document.getElementById("mapaRas"), mapOptions);
		icon = {
			url: "components/Graph/mto.png", // url
			scaledSize: new google.maps.Size(30, 28)// scaled size
		};
		marker = new google.maps.Marker({
			map: map,
			icon: icon
		});
		directionsDisplay.setMap(map);
		geocoder = new google.maps.Geocoder;

		var destino = servicio.Ddestino;
		DibujarRutaRast(directionsService, directionsDisplay, origen, destino);

		//origen = origen.replace(/\s/g, "%20");

		/*var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + origen;

		$.ajax({
			url: url,
			success: function (e) {
				try {
					if (e.status == "ZERO_RESULTS") {
						mens(" Es posible que la dirección de origen no exista", "warning");
						window.location = "index.html#components/Rastrear/rastrear.html";
						return;
					}
					var resp = e;
					lat1 = resp.results[0].geometry.location.lat;
					long1 = resp.results[0].geometry.location.lng;

					var myLatLng = { lat: lat1, lng: long1 };

					var mapOptions = {
						center: myLatLng,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					directionsDisplay = new google.maps.DirectionsRenderer;
					directionsService = new google.maps.DirectionsService;

					map = new google.maps.Map(document.getElementById("mapaRas"), mapOptions);
					icon = {
						url: "components/Graph/mto.png", // url
						scaledSize: new google.maps.Size(30, 28)// scaled size
					};
					marker = new google.maps.Marker({
						map: map,
						icon: icon
					});
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
									window.location = "index.html#components/Rastrear/rastrear.html";
									return;
								}
								var resp = e;
								lat2 = resp.results[0].geometry.location.lat;
								long2 = resp.results[0].geometry.location.lng;

								var destino = { lat: lat2, lng: long2 };

								calculateAndDisplayRouteras(directionsService, directionsDisplay, lat1, long1, lat2, long2);
								//calculardistanciaras(lat1, long1, lat2, long2, idavuelta);
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
		});*/
	} catch (s) {
		alert("s " + s);
	}
}

function calculardistanciaras(lat1, long1, lat2, long2, idavuelta) {
	try {
		var origin1 = { lat: lat1, lng: long1 };
		var destinationA = { lat: lat2, lng: long2 };
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


var arr = []; var arreglo = []; var icon;

function getLocation() {
	if (map) {
		var urlrastr = "https://www.impeltechnology.com/rest/api/getPage?output=json&startRow={startRow}&rowsPerPage={rowsPerPage}&viewId=s17ojRL4RY2KNwJzMoPwLw&objName=Rastreo";
		var datos = [{
			REnvio: idservi,
			sessionId: idsesion
		}];
		$.ajax({
			url: urlrastr,
			type: "GET",
			data: datos[0],
			dataType: "json",
			success: function (data) {
				$.each(data, function (index, item) {
					if ((arreglo.indexOf(item.Latitud + item.Longitud)) == -1) {
						var borraCords = "https://www.impeltechnology.com/rest/api/delete?output=json&objName=Rastreo";
						var ids = [{
							id: item.id,
							sessionId: idsesion
						}];
						$.ajax({
							url: borraCords,
							type: "GET",
							data: ids[0],
							dataType: "json",
							error: function (err) {
								var eror = JSON.parse(err.responseText);
								alert(eror.message);
							}
						});

						arreglo.push(item.Latitud + item.Longitud);
						var cordss = ({
							lat: parseFloat(item.Latitud),
							lng: parseFloat(item.Longitud)
						});
						dibujarcordss(cordss);
						//getDirections(item.Latitud + item.Longitud);
					}
				});
			},
			error: function (err) {
				var eror = JSON.parse(err.responseText);
				alert(eror.message);
			}
		});
	}
}
var marker;
function dibujarcordss(cordss) {
	try {
		cordss = new google.maps.LatLng(cordss.lat, cordss.lng);
		map.setZoom(15);
		if (marker == undefined) {
			marker = new google.maps.Marker({
				icon: icon,
				map: map,
				animation: google.maps.Animation.DROP
			});
		}
		else {
			marker.setPosition(cordss);
		}
		map.setCenter(cordss);
	} catch (k) {
		alert(k);
	}
}
var arregloaEnviar = [];
function showPosition(position) {
	try {
		var NuevasCordenadas = "https://www.impeltechnology.com/rest/api/create2?output=json&useIds=true&objName=Rastreo";
		var cords = (position.coords.latitude + position.coords.longitude);

		if (arregloaEnviar.indexOf(cords) == -1) {
			arregloaEnviar.push(cords);
			var parametros = [{
				Latitud: position.coords.latitude,
				Longitud: position.coords.longitude,
				REnvio: DetalleEnvioEntregar.id,
				sessionId: idsesion
			}];

			$.ajax({
				url: NuevasCordenadas,
				type: "POST",
				data: parametros[0],
				dataType: "json",
				error: function (err) {
					var eror = JSON.parse(err.responseText);
					alert(eror.message);
				}
			});
		}
	} catch (h) {
		alert(h);
	}
}




















function moveMarker(map, marker, latlng) {
	marker.setPosition(latlng);
	map.panTo(latlng);
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

	marker = new google.maps.Marker({ map: map, icon: "http://maps.google.com/mapfiles/ms/micons/blue.png" });

	for (i = 0; i < pathCoords.length; i++) {
		setTimeout(function (coords) {
			route.getPath().push(coords);
			moveMarker(map, marker, coords);
		}, 2000 * i, pathCoords[i]);
	}
}

function getDirections(Latitud, Longitud) {
	var directionsService = new google.maps.DirectionsService();

	var prevPosn = marker.getPosition();
	alert(inspeccionar(prevPosn));
	var start = new google.maps.LatLng(Latitud, Longitud);
	var end = new google.maps.LatLng(48.8583694, 2.2944796);

	var request = {
		origin: start,
		destination: end,
		travelMode: google.maps.TravelMode.DRIVING
	};
	directionsService.route(request, function (result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			autoRefresh(map, result.routes[0].overview_path);
		}
	});
}






function updateMarker(marker, latitude, longitude) {
	try {

		map.setCenter(new google.maps.LatLng(
			latitude,
			longitude
		));
		var prevPosn = marker.getPosition();
		marker.setPosition(
			new google.maps.LatLng(
				latitude,
				longitude
			)
		);
		marker.setIcon({
			url: "components/Graph/delivery.svg",
			scaledSize: new google.maps.Size(30, 28),
			rotation: google.maps.geometry.spherical.computeHeading(prevPosn, marker.getPosition())
		})
	} catch (s) {
		alert(s);
	}
}
function DibujarRutaRast(directionsService, directionsDisplay, origen, destino) {
	try {
		if (idavuelta) {
			var waypts = [];
			waypts.push({
				location: destino,
				stopover: true
			});
			directionsService.route({
				origin: origen,
				waypoints: waypts,
				destination: origen,
				travelMode: google.maps.TravelMode.DRIVING
			}, function (response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				} else if (status == google.maps.DirectionsStatus.NOT_FOUND) {
					kendo.mobile.application.navigate("#:back");
					alert('La dirección no puede ser encontrada.');
				}
			});
		} else {
			directionsService.route({
				origin: origen,
				destination: destino,
				travelMode: google.maps.TravelMode.DRIVING
			}, function (response, status) {
				if (status === google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				} else if (status == google.maps.DirectionsStatus.NOT_FOUND) {
					kendo.mobile.application.navigate("#:back");
					alert('La dirección no puede ser encontrada.');
				}
			});
		}

	} catch (k) {
		alert("Confirmacion k " + k);
	}
}

function calculateAndDisplayRouteras(directionsService, directionsDisplay, lat1, long1, lat2, long2) {
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
					//dibujar(map);
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
					//autoRefresh(map, result.routes[0].overview_path);
					directionsDisplay.setDirections(result);
					//dibujar(map);
				} else {
					alert('Directions request failed due to ' + status);
				}
			});
		}

	} catch (k) {
		alert("k " + k);
	}
}