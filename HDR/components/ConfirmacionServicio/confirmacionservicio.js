app.confirmaservicio = kendo.observable({
	onInit: function (e) { },
	afterShow: function () { },
	onShow: function () { }
});
function ConfirmarServC() {
	try {
		var urlconfirma = "https://www.impeltechnology.com/rest/api/update2?output=json&useIds=true&objName=Servicio&sessionId=" + idsesion + "&id=" + servcreado.id + "&status=Aceptado%20Cliente";

		$.ajax({
			url: urlconfirma,
			async: false,
			success: function (e) {
				try {
					if (e.status == "ok") {
						//kendo.mobile.application.navigate("#:back");
						//kendo.mobile.application.navigate("#:back");
						mens(" El envío se ha confirmado", "success");
						kendo.mobile.application.navigate("components/Servicios/servicios.html");
					}
				} catch (h) {
					alert("h " + h);
				}
			},
			error: function (d) {
				try {
					var mensaje = JSON.parse(d.responseText);
					if (mensaje.message == "El campo \"Cliente\" debe tener un valor") {
						var urlconfirma = "https://www.impeltechnology.com/rest/api/update2?output=json&useIds=true&objName=Servicio&sessionId=" + idsesion + "&id=" + servcreado.id + "&status=Aceptado%20Cliente" + "&RCliente=" + info.id;
						$.ajax({
							url: urlconfirma,
							async: false,
							success: function (e) {
								try {
									if (e.status == "ok") {
										//	kendo.mobile.application.navigate("#:back");
										//	kendo.mobile.application.navigate("#:back");
										kendo.mobile.application.navigate("components/Servicios/servicios.html");
										mens(" El envío se ha confirmado", "success");
									}
								} catch (h) {
									alert("h " + h);
								}
							},
							error: function (d) {
								try {
									var mensaje = JSON.parse(d.responseText);
									alert(mensaje.message);
								} catch (i) {
									alert("i " + i);
								}
							}
						});
					}
				} catch (i) {
					alert("i " + i);
				}
			}
		});
	} catch (s) {
		alert("Confirmar " + s);
	}
}
var mapconf;
var lat1N, lat2N, long1N, long2N;
var directionsDisplay21;
var directionsService21;
var geocoder2;
var idavuelta;
var tramite;
var distancia1, distancia2, servicio;
var servcreado;
var info;
function buildMapconf2() {
	try {
		sessionStorage.setItem("terminosA", "Confirma");
		servicio = sessionStorage.getItem("InfoServicioCreado");
		servicio = JSON.parse(servicio);
		servicio = servicio[0];

		idavuelta = servicio.IdaVuelta;
		tramite = servicio.Tramite;

		var fecha1 = new Date(servicio.Fecharecoge);
		fecha1 = ("00" + (fecha1.getMonth() + 1)).slice(-2) + "/" + ("00" + fecha1.getDate()).slice(-2) + "/" + fecha1.getFullYear() + " " + ("00" + fecha1.getHours()).slice(-2) + ":" + ("00" + fecha1.getMinutes()).slice(-2) + ":" + ("00" + fecha1.getSeconds()).slice(-2);

		//document.getElementById('fechac').innerHTML = "Hora de recogida: " + servicio.Fecharecoge;
		document.getElementById('origenc').innerHTML = "Origen: " + servicio.LugarOrigen;
		document.getElementById('destinoc').innerHTML = "Destino: " + servicio.LugarDestino;
		//document.getElementById('responsablec').innerHTML = servicio.Recibe;
		//document.getElementById('precioc').innerHTML = "";

		document.getElementById('observacionesNu').innerHTML = "Observaciones: " + servicio.Observacion;

		if (tramite) {
			document.getElementById('tramitec').innerHTML = "Incluye Trámite";
			//document.getElementById("tramitec").checked = true;
		} else {
			document.getElementById('tramitec').innerHTML = "No incluye trámite";
			//document.getElementById("tramitec").checked = "";
		}

		var origen = servicio.LugarOrigen;
		var mapOptions21 = {
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		directionsDisplay21 = new google.maps.DirectionsRenderer;
		directionsService21 = new google.maps.DirectionsService;

		var divmapaconf = document.getElementById("mapconfirma");

		mapconf = new google.maps.Map(divmapaconf, mapOptions21);
		directionsDisplay21.setMap(mapconf);
		geocoder2 = new google.maps.Geocoder;

		var destino = servicio.LugarDestino;
		DibujarRuta(directionsService21, directionsDisplay21, origen, destino);

		CalculateDistancia(origen, destino, idavuelta);
		info = JSON.parse(sessionStorage.getItem("perfil"));

		var urlcreaserv = "https://www.impeltechnology.com/rest/api/create2?output=json&useIds=true&objName=Servicio&sessionId=" + idsesion;
		var params =
			[{
				RCliente: info.id,
				RProveedor: servicio.Proveedor,
				RProductos: servicio.Producto,
				Fecha: servicio.Fecharecoge,
				Dorigen: servicio.LugarOrigen,
				Ddestino: servicio.LugarDestino,
				ResponsableO: servicio.Entrega,
				ResponsableD: servicio.Recibe,
				Observaciones: servicio.Observacion,
				Incluye_Trmite: servicio.Tramite,
				Ida_y_Vuelta: servicio.IdaVuelta
			}];

		$.ajax({
			url: urlcreaserv,
			type: "POST",
			data: params[0],
			dataType: "json",
			success: function (servici) {
				try {
					var servicioreciente = "https://www.impeltechnology.com/rest/api/getRecord?objName=Servicio&output=json&sessionId=" + idsesion + "&id=" + servici.id;
					$.ajax({
						url: servicioreciente,
						success: function (valor) {
							try {
								if (valor.precio) {
									//cmbiar el formato de numero a dinero
									document.getElementById('precioc').innerHTML = kendo.toString(parseInt(valor.precio), "c0");
								}
							} catch (h) {
								alert("h " + h);
							}
						},
						error: function (d) {
							try {
								var mensaje = JSON.parse(d.responseText);
								alert(JSON.stringify(d));
							} catch (i) {
								alert("i " + i);
							}
						}
					});
					servcreado = servici;
				} catch (h) {
					alert("h " + h);
				}
			},
			error: function (err) {
				alert(JSON.stringify(err));
			}
		});

		//******************************************************************************************************************


		/*
		
		origen = origen.replace(/\s/g, "%20");
		
		var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + origen;
		
		$.ajax({
		url: url,
		success: function (e) {
		try {
		if (e.status == "ZERO_RESULTS") {
		mens(" Es posible que la dirección de origen no exista", "warning");
		window.location = "index.html#components/NuevoServicio/nuevoservicio.html";
		return;
		}
		var resp = e;
		lat1N = resp.results[0].geometry.location.lat;
		long1N = resp.results[0].geometry.location.lng;
		
		var myLatLng2 = { lat: lat1N, lng: long1N };
		
		var mapOptions21 = {
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		directionsDisplay21 = new google.maps.DirectionsRenderer;
		directionsService21 = new google.maps.DirectionsService;
		
		var divmapaconf = document.getElementById("mapconfirma");
		
		mapconf = new google.maps.Map(divmapaconf, mapOptions21);
		directionsDisplay21.setMap(mapconf);
		geocoder2 = new google.maps.Geocoder;
		
		var destino = servicio.LugarDestino;
		destino = destino.replace(/\s/g, "%20");
		
		var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + destino;
		$.ajax({
		url: url,
		success: function (e) {
		try {
			if (e.status == "ZERO_RESULTS") {
				mens(" Es posible que la dirección de destino no exista", "warning");
				window.location = "index.html#components/NuevoServicio/nuevoservicio.html";
				return;
			}
			var resp = e;
			lat2N = resp.results[0].geometry.location.lat;
			long2N = resp.results[0].geometry.location.lng;
		
			calculateAndDisplayRoute2(directionsService21, directionsDisplay21, lat1N, long1N, lat2N, long2N);
			calculardistanciaconf(lat1N, long1N, lat2N, long2N, idavuelta);
		
			info = JSON.parse(sessionStorage.getItem("perfil"));
		
			var urlcreaserv = "https://www.impeltechnology.com/rest/api/create2?output=json&useIds=true&objName=Servicio&sessionId=" + idsesion;
			var params =
				[{
					RCliente: info.id,
					RProveedor: servicio.Proveedor,
					RProductos: servicio.Producto,
					Fecha: servicio.Fecharecoge,
					Dorigen: servicio.LugarOrigen,
					Ddestino: servicio.LugarDestino,
					ResponsableO: servicio.Entrega,
					ResponsableD: servicio.Recibe,
					Observaciones: servicio.Observacion,
					Incluye_Trmite: servicio.Tramite,
					Ida_y_Vuelta: servicio.IdaVuelta
				}];
		
			$.ajax({
				url: urlcreaserv,
				type: "POST",
				data: params[0],
				dataType: "json",
				success: function (servici) {
					try {
						var servicioreciente = "https://www.impeltechnology.com/rest/api/getRecord?objName=Servicio&output=json&sessionId=" + idsesion + "&id=" + servici.id;
						$.ajax({
							url: servicioreciente,
							success: function (valor) {
								try {
									if (valor.precio) {
										var valor = (valor.precio).toString();
										var num = (valor).replace(/\./g, "");
										num = num.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g, '$1.');
										num = num.split("").reverse().join("").replace(/^[\.]/, "");
										document.getElementById('precioc').innerHTML = "$" + num;
									}
								} catch (h) {
									alert("h " + h);
								}
							},
							error: function (d) {
								try {
									var mensaje = JSON.parse(d.responseText);
									alert(JSON.stringify(d));
								} catch (i) {
									alert("i " + i);
								}
							}
						});
						servcreado = servici;
					} catch (h) {
						alert("h " + h);
					}
				},
				error: function (err) {
					alert(JSON.stringify(err));
				}
			});
		
		} catch (h) {
			alert("Confirmacion h2 " + h);
		}
		},
		error: function (d) {
		alert("error");
		}
		});
		
		} catch (h) {
		alert("Confirmacion h " + h);
		}
		},
		error: function (d) {
		alert("error");
		}
		});*/
	} catch (s) {
		alert("Confirmacion s " + s);
	}
}
/*function calculateAndDisplayRoute2(directionsService, directionsDisplay, lat1, long1, lat2, long2) {
	try {
		var selectedMode = "DRIVING";
		if (idavuelta) {
			var parada = lat2 + "," + long2;
			var waypts = [];
			waypts.push({
				location: parada,
				stopover: true
			});
			directionsService.route({
				origin: { lat: lat1, lng: long1 },
				waypoints: waypts,
				destination: { lat: lat1, lng: long1 },
				travelMode: google.maps.TravelMode[selectedMode]
			}, function (response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				} else {
					alert('Confirmacion Directions request failed due to ' + status);
				}
			});
		} else {
			directionsService.route({
				origin: { lat: lat1, lng: long1 },
				destination: { lat: lat2, lng: long2 },
				travelMode: google.maps.TravelMode[selectedMode]
			}, function (response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				} else {
					alert('Confirmacion Directions request failed due to ' + status);
				}
			});
		}

	} catch (k) {
		alert("Confirmacion k " + k);
	}
}
function calculardistanciaconf(lat1, long1, lat2, long2, idavuelta) {
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
				alert('Confirmacion Error: ' + status);
			} else {
				try {
					var originList = response.originAddresses;
					var destinationList = response.destinationAddresses;
					var Distancia = document.getElementById('distanciac');
					var fechae = document.getElementById('fechae');

					var distancia = response.rows[0].elements[0].distance.text;
					var duracionsec = response.rows[0].elements[0].duration.value;
					var duraciontext = response.rows[0].elements[0].duration.text;

					if (idavuelta) {
						var distancia2 = response.rows[1].elements[1].distance.text;
						var duracionsec2 = response.rows[1].elements[1].duration.value;
						var duraciontext2 = response.rows[0].elements[0].duration.text;

						Distancia.innerHTML = "Ida: " + distancia + " en " + duraciontext + ", Vuelta: " + distancia2 + " en " + duraciontext2;

						var fecharecogida = new Date(servicio.Fecharecoge);

						fecharecogida.setSeconds(fecharecogida.getSeconds() + duracionsec);
						fecharecogida.setSeconds(fecharecogida.getSeconds() + duracionsec2);

						var fecha = ("00" + (fecharecogida.getMonth() + 1)).slice(-2) + "/" + ("00" + fecharecogida.getDate()).slice(-2) + "/" + fecharecogida.getFullYear() + " " + ("00" + fecharecogida.getHours()).slice(-2) + ":" + ("00" + fecharecogida.getMinutes()).slice(-2) + ":" + ("00" + fecharecogida.getSeconds()).slice(-2);
						//fechae.innerHTML = "Hora estimada de entrega: " + fecha;

					} else {
						Distancia.innerHTML = "Trayecto: " + distancia + " en " + duraciontext;
						var fecharecogida = new Date(servicio.Fecharecoge);
						fecharecogida.setSeconds(fecharecogida.getSeconds() + duracionsec);

						var fecha = ("00" + (fecharecogida.getMonth() + 1)).slice(-2) + "/" + ("00" + fecharecogida.getDate()).slice(-2) + "/" + fecharecogida.getFullYear() + " " + ("00" + fecharecogida.getHours()).slice(-2) + ":" + ("00" + fecharecogida.getMinutes()).slice(-2) + ":" + ("00" + fecharecogida.getSeconds()).slice(-2);
						// fechae.innerHTML = "Hora estimada de entrega: " + fecha;
					}
				} catch (f) {
					alert("Confirmacion f " + f);
				}
			}
		});
	} catch (s) {
		alert("Confirmacion s " + s);
	}
}
*/




function DibujarRuta(directionsService, directionsDisplay, origen, destino) {
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
function CalculateDistancia(origen, destino, idavuelta) {
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
				alert('Confirmacion Error: ' + status);
			} else {
				try {
					var originList = response.originAddresses;
					var destinationList = response.destinationAddresses;
					var Distancia = document.getElementById('distanciac');
					var fechae = document.getElementById('fechae');

					var distancia = response.rows[0].elements[0].distance.text;
					var duracionsec = response.rows[0].elements[0].duration.value;
					var duraciontext = response.rows[0].elements[0].duration.text;

					if (idavuelta) {
						var distancia2 = response.rows[1].elements[1].distance.text;
						var duracionsec2 = response.rows[1].elements[1].duration.value;
						var duraciontext2 = response.rows[0].elements[0].duration.text;

						Distancia.innerHTML = "Ida: " + distancia + " en " + duraciontext + ", Vuelta: " + distancia2 + " en " + duraciontext2;

						var fecharecogida = new Date(servicio.Fecharecoge);

						fecharecogida.setSeconds(fecharecogida.getSeconds() + duracionsec);
						fecharecogida.setSeconds(fecharecogida.getSeconds() + duracionsec2);

						var fecha = ("00" + (fecharecogida.getMonth() + 1)).slice(-2) + "/" + ("00" + fecharecogida.getDate()).slice(-2) + "/" + fecharecogida.getFullYear() + " " + ("00" + fecharecogida.getHours()).slice(-2) + ":" + ("00" + fecharecogida.getMinutes()).slice(-2) + ":" + ("00" + fecharecogida.getSeconds()).slice(-2);
						//fechae.innerHTML = "Hora estimada de entrega: " + fecha;

					} else {
						Distancia.innerHTML = "Trayecto: " + distancia + " en " + duraciontext;
						var fecharecogida = new Date(servicio.Fecharecoge);
						fecharecogida.setSeconds(fecharecogida.getSeconds() + duracionsec);

						var fecha = ("00" + (fecharecogida.getMonth() + 1)).slice(-2) + "/" + ("00" + fecharecogida.getDate()).slice(-2) + "/" + fecharecogida.getFullYear() + " " + ("00" + fecharecogida.getHours()).slice(-2) + ":" + ("00" + fecharecogida.getMinutes()).slice(-2) + ":" + ("00" + fecharecogida.getSeconds()).slice(-2);
						// fechae.innerHTML = "Hora estimada de entrega: " + fecha;
					}
				} catch (f) {
					if (f == "TypeError: Cannot read property 'text' of undefined") {

					} else {
						alert("Confirmacion f " + f);
					}
				}
			}
		});
	} catch (s) {
		alert("Confirmacion s " + s);
	}
}