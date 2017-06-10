var oculta = 1;
app.Menu = kendo.observable({
	onInit: function () {
	},
	afterShow: function () { },
	listViewClick: function (e) { },
	onShow: function () {
		try {
			kendo.ui.progress($("#menulist"), false);
			var products = "https://www.impeltechnology.com/rest/api/getPage?output=json&startRow={startRow}&rowsPerPage={rowsPerPage}&viewId=5npWXdzlT--e69yxIbWraA&objName=Productos&sessionId=" + idsesion;
			$.ajax({
				url: products,
				success: function (response) {
					try {
						if (response) {
							sessionStorage.setItem("Productos", JSON.stringify(response));
						}
					} catch (h) {
						alert("E1 " + h);
					}
				},
				error: function (d) {
					mens("E2 Error al traer los productos " + d, "error");
				}
			});


			var datos = {
				query: "select RCliente from Servicio where status=5882921 and RCliente=" + portalUserId,
				sessionId: idsesion,
				startRow: 0,
				maxRows: 100,
				output: "json"
			};

			var Datos = [];
			$.ajax({
				url: "https://www.impeltechnology.com/rest/api/selectQuery",
				type: "GET",
				dataType: "json",
				data: datos,
				async: false,
				success: function (data) {
					try {
						if (data!="") {
							var x = document.getElementById("reastreo");
							x.style.display = "";
							var y = document.getElementById("reastreo2");
							y.style.display = "";
						}
					} catch (e) {
						alert("asd" + e);
					}
				},
				error: function (err) {
					alert("asd:    a" + JSON.stringify(err));
				}
			});

			//**********************************************

		} catch (d) {
			if (d == "SyntaxError: Unexpected token u in JSON at position 0") {

			}
		}

	},
	datos: []
});

function servicios() {
	try {
		kendo.ui.progress($("#menulist"), true);
		window.location = "index.html#components/Servicios/servicios.html";
	} catch (h) {
		alert("E4 " + h);
	}
}

function nuevoservicio() {
	try {
		kendo.ui.progress($("#menulist"), true);
		window.location = "index.html#components/NuevoServicio/nuevoservicio.html";
	} catch (h) {
		alert("E5 " + h);
	}
}
function rastrearservicio() {
	try {
		window.location = "index.html#components/Rastrear/rastrear.html";
	} catch (p) {
		alert("E6 " + p);
	}
}

function iraperfil() {
	try {
		window.location = "index.html#components/Perfil/perfil.html";
	} catch (p) {
		alert("E7 " + p);
	}
}
function salir() {
	localStorage.setItem("HoDe.usuario", "");
	localStorage.setItem("HoDe.contraseña", "");
	localStorage.setItem("FotoUsuario", "");
	document.getElementById("usuario").value = "";
	document.getElementById("contrase").value = "";

	window.location = "index.html#components/home/ingreso.html";
}

