var arregloamostrar = [];
var info = [];
app.perfil = kendo.observable({
	onInit: function (e) {
		try {
			$("#Mislugares").kendoButton({
				click: function (e) {
					try {
						window.location = "index.html#components/MisLugares/mislugares.html";
					} catch (s) {
						alert("sA " + s);
					}
				}
			});
			sessionStorage.setItem("terminosA", "Perfil");

			if (localStorage.getItem("FotoUsuario")) {
				document.getElementById("foto").src = localStorage.getItem("FotoUsuario");
			}
		} catch (g) {
			alert("g " + g);
		}
	},
	afterShow: function () { },
	onShow: function () {
		try {

			if (imagenfoto) {
				document.getElementById("foto").src = imagenfoto;
			}
			arregloamostrar = [];

			//*******************************************************************
			var datos = {
				query: "select id,Nombre,streetAddr1 from Direccion where RCliente=" + portalUserId,
				sessionId: idsesion,
				startRow: 0,
				maxRows: 100,
				output: "json"
			};

			var direcciones = [];
			$.ajax({
				url: "https://www.impeltechnology.com/rest/api/selectQuery",
				type: "GET",
				dataType: "json",
				data: datos,
				async: false,
				success: function (data) {
					try {
						$.each(data, function (index, item) {
							arregloamostrar.push({
								id: item[0],
								Nombre: item[1],
								streetAddr1: item[2]
							});
						});
					} catch (e) {
						alert("DDD" + e);
					}
				},
				error: function (err) {
					alert("asddas:    " + JSON.stringify(err));
				}
			});

			var lugares = new kendo.data.DataSource({
				data: arregloamostrar
			});
			app.perfil.set("lugares", lugares);

			var urlfoto = "https://www.impeltechnology.com/rest/api/getBinaryData?objName=Cliente1&id=" + portalUserId + "&fieldName=Foto&output=JSON&sessionId=" + idsesion;
			$.ajax({
				url: urlfoto,
				success: function (resp) {
					try {
						if (resp.Foto) {
							var foto1 = resp.Foto;
							imagenfoto = "data:image/png;base64," + foto1.fileData;
							localStorage.setItem("FotoUsuario", imagenfoto);
							document.getElementById("foto").src = imagenfoto;
						}
					} catch (h) {
						alert("h " + h);
					}
				},
				error: function (d) {
					alert(inspeccionar(d));
				}
			});

			var datos = {
				query: "select email,Direccin_Registrada,Telefono,Celular,Nombre from Cliente1 where id=" + portalUserId,
				sessionId: idsesion,
				startRow: 0,
				maxRows: 1,
				output: "json"
			};

			$.ajax({
				url: "https://www.impeltechnology.com/rest/api/selectQuery",
				type: "GET",
				dataType: "json",
				data: datos,
				async: false,
				success: function (data) {
					try {
						sessionStorage.setItem("Usuario", data);
						$.each(data, function (index, item) {
							if (item[0] != null) {
								info.email = item[0];
							} else {
								info.email = "";
							}
							if (item[1] != null) {
								info.Direccin_Registrada = item[1];
							} else {
								info.Direccin_Registrada = "";
							}
							if (item[2] != null) {
								info.Telefono = item[2];
							} else {
								info.Telefono = "";
							}
							if (item[3] != null) {
								info.Celular = item[3];
							} else {
								info.Celular = "";
							}
							if (item[4] != null) {
								info.name = item[4];
							} else {
								info.name = "";
							}
						});
					} catch (e) {
						alert("asd" + e);
					}
				},
				error: function (err) {
					alert("asd:    a" + JSON.stringify(err));
				}
			});

			//document.getElementById('Identificacion').innerHTML = "Identificación: " + info.Identificacion;
			document.getElementById('email').innerHTML = '<i class="fa fa-envelope fa-2x fa-fw blue" aria-hidden="true" style="vertical-align: middle;" ></i>' + " " + info.email;
			document.getElementById('direccion').innerHTML = '<i class="fa fa-home fa-2x fa-fw blue" aria-hidden="true" style="vertical-align: middle;"></i>' + " " + info.Direccin_Registrada;
			document.getElementById('telefono').innerHTML = '<i class="fa fa-phone fa-2x fa-fw blue" aria-hidden="true" style="vertical-align: middle;"></i>' + " " + info.Telefono;
			document.getElementById('celular').innerHTML = '<i class="fa fa-mobile fa-2x fa-fw blue" aria-hidden="true" style="vertical-align: middle;"></i>' + " " + info.Celular;
			//document.getElementById('aceptaterminos').innerHTML = info.Acepto_Trminos_y_Condiciones;
			document.getElementById('nombreusuario').innerHTML = '<i class="fa fa-user" aria-hidden="true"></i>' + " " + info.name;
		} catch (s) {
			alert("sssssss " + s);
		}
	}, listViewClick: function (e) {
		try {
			var direccion = JSON.stringify(e.dataItem);
			sessionStorage.setItem("lugar", direccion);
			kendo.mobile.application.navigate("components/EditarLugar/editarlugar.html");
		} catch (s) {
			alert("s1 " + s);
		}
	}
});

function nuevoDir() {
	try {
		var lugarDire = [{ "Nombre": "Agregar Nueva Dirección" }];
		sessionStorage.setItem("lugar", JSON.stringify(lugarDire[0]));
		kendo.mobile.application.navigate("components/EditarLugar/editarlugar.html");
	} catch (w) {
		alert("w " + w);
	}
}

function editarPerfil() {
	try {
		kendo.mobile.application.navigate("components/EditarPerfil/editarperfil.html");
	} catch (d) {
		alert(d);
	}
}