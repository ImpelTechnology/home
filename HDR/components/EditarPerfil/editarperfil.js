'use strict';
var perfil;
app.editarperfil = kendo.observable({
	onInit: function (e) { },
	afterShow: function () { },
	onShow: function () {
		try {
			perfil = JSON.parse(sessionStorage.getItem("perfil"));

			document.getElementById('nombreed').value = perfil.name;
			document.getElementById('identied').value = perfil.Identificacion;
			document.getElementById('emailed').value = perfil.email;
			document.getElementById('telefonoed').value = perfil.Telefono;
			document.getElementById('celulared').value = perfil.Celular;
			document.getElementById('direccionve').value = perfil.Direccin_Registrada;

			document.getElementById("fotover").src = imagenfoto;

			document.getElementById('imgperfil').onchange = function (e) {
				var files = document.getElementById('imgperfil').files;
				if (files.length > 0) {
					getbasemostrar(files[0]);
				}
			}

		} catch (r) {
			alert("r " + r);
		}
	},
	guardarPerfil: function () {
		try {
			var files = document.getElementById('imgperfil').files;
			if (files.length > 0) {
				getBase64(files[0]);
			}
			var nombre = document.getElementById("nombreed").value;
			var identi = document.getElementById("identied").value;
			var correo = document.getElementById("emailed").value;
			var telefono1 = document.getElementById("telefonoed").value;
			var telefono2 = document.getElementById("celulared").value;
			var direccion2 = document.getElementById("direccionve").value;

			var cliente = [{
				Nombre: nombre,
				Identificacion: identi,
				Email: correo,
				TelFijo: telefono1,
				Celular: telefono2,
				Direccion: direccion2
			}];
			if ((cliente[0].Direccion).indexOf("#") != -1) {
				cliente[0].Direccion = (cliente[0].Direccion).replace("#", "No. ");
			}
			var actcliente = "https://www.impeltechnology.com/rest/api/update2?output=json&useIds=true&objName=Cliente1&sessionId=" + idsesion + "&id=" + perfil.id;
			var params = "&Identificacion=" + cliente[0].Identificacion + "&email=" + cliente[0].Email + "&Telefono=" + cliente[0].TelFijo + "&Celular=" + cliente[0].Celular + "&Direccin_Registrada=" + cliente[0].Direccion;
			actcliente = actcliente + params;

			$.ajax({
				url: actcliente,
				success: function (e) {
					try {
						if (e.status == "ok") {
							alert("Actualizacion correcta");

							perfil.name = cliente[0].Nombre;
							perfil.Identificacion = cliente[0].Identificacion;
							perfil.email = cliente[0].Email;
							perfil.Telefono = cliente[0].TelFijo;
							perfil.Celular = cliente[0].Celular;
							perfil.Direccin_Registrada = cliente[0].Direccion;

							sessionStorage.setItem("perfil", JSON.stringify(perfil));

							kendo.mobile.application.navigate("components/Perfil/perfil.html");
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
		} catch (l) {
			alert(l);
		}
	}
});
var sesion = idsesion;
function subirfoto(picture, nombre, tipo, tamano) {
	try {
		document.getElementById('porcentaje').innerHTML = "Subiendo imagen";
		var test_str = picture;
		var start_pos = test_str.indexOf('base64,') + 7;
		var end_pos = test_str.length;
		var text_to_send = test_str.substring(start_pos, end_pos);

		var tam = (parseFloat(tamano)) / 1024;
		if (tam > 2048) {
			alert("Error: El archivo cargado excede 2048 KB");
			return;
		}

		var xhr = new XMLHttpRequest();
		var url = "https://www.impeltechnology.com/rest/api/setBinaryData?sessionId=";

		var sessionId = idsesion;

		var content = {
			"id": perfil.id,
			"fieldName": "Foto",
			"fileName": nombre,
			"contentType": tipo,
			"value": text_to_send
		};

		var params = buildUrlParams(content);
		xhr.open("POST", url + sessionId, true);

		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.setRequestHeader("Content-length", params.length);
		xhr.setRequestHeader("Connection", "close");

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				document.getElementById('porcentaje').innerHTML = "Foto cargada satisfactoriamente";
			}
		}
		var eqd = encodeQueryData(content);

		xhr.onprogress = function (e) {
			try {
				if (e.lengthComputable) {
					var percentComplete = (e.loaded / e.total) * 100;
					document.getElementById('porcentaje').innerHTML = percentComplete + '% uploaded';
				}
			} catch (f) {
				alert("f " + f);
			}
		};

		xhr.onload = function () {
			try {
				if (this.status == 200) {
					document.getElementById('porcentaje').innerHTML = "Imagen cargada satisfactoriamente";
				};
			} catch (m) {
				alert("m " + m);
			}
		};
		xhr.onerror = function () {
			alert("error");
		};
		xhr.onabort = function () {
			alert("abort");
		};
		xhr.ontimeout = function () {
			alert("timeout");
		};
		xhr.onloadstart = function () {
			document.getElementById('porcentaje').innerHTML = 'Cargando imagen';
		};
		xhr.onloadend = function () {
			document.getElementById('porcentaje').innerHTML = 'Imagen cargada';
		};
		function encodeQueryData(data) {
			try {
				var ret = [];
				for (var d in data)
					ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
				return ret.join('&');
			} catch (s) {
				alert("s " + s);
			}
		}
		xhr.send(eqd);

	} catch (h) {
		alert("h " + h);
	}
}
function getBase64(file) {
	try {
		var nombre = file.name;
		var tipo = file.type;
		var tamaño = file.size;
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			subirfoto(reader.result, nombre, tipo, tamaño);
		};
		reader.onerror = function (error) {
			alert('Error: ', error);
		};
	} catch (s) {
		alert(s);
	}
}
function getbasemostrar(file) {
	try {
		var nombre = file.name;
		var tipo = file.type;
		var tamaño = file.size;
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			imagenfoto = reader.result;
			document.getElementById("fotover").src = imagenfoto;
		};
		reader.onerror = function (error) {
			alert('Error: ', error);
		};
	} catch (p) {
		alert(p);
	}
}
function buildUrlParams(object) {
	try {
		var urlParams = [];
		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				urlParams.push(key + "=" + object[key]);
			}
		}
		return urlParams.join('&');
	} catch (r) {
		alert(r);
	}
}