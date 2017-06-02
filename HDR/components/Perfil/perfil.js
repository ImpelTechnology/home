
var info;
var arregloamostrar = [];
app.perfil = kendo.observable({
	onInit: function (e) {
		try {
			$("#Mislugares").kendoButton({
				click: function (e) {
					try {
						window.location = "index.html#components/MisLugares/mislugares.html";
					} catch (s) {
						alert("s " + s);
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
			info = JSON.parse(sessionStorage.getItem("perfil"));

			if (imagenfoto) {
				document.getElementById("foto").src = imagenfoto;
			}
			arregloamostrar = [];

			var urldir = "https://www.impeltechnology.com/rest/api/getPage?output=json&startRow=0&rowsPerPage=100&viewId=UU3tnnF2TP-6iYqKdejtbQ&objName=Direccion&sessionId=" + idsesion;
			$.ajax({
				url: urldir,
				success: function (resp) {
					try {
						var ds = new kendo.data.DataSource({
							data: resp,
							schema: {
								parse: function (response) {
									try {
										$.each(response, function (index, item) {
											if (!(item.name) || (item.name == null) || (item.name == undefined) || (item.name == "")) {
												item.name = "";
											}
											if (!(item.streetAddr1) || (item.streetAddr1 == null) || (item.streetAddr1 == undefined) || (item.streetAddr1 == "")) {
												item.streetAddr1 = "";
											}
											if (!(item.Nombre) || (item.Nombre == null) || (item.Nombre == undefined) || (item.Nombre == "")) {
												item.Nombre = "";
											}
										});
										for (var i = 0; i < response.length; i++) {
											if (response[i].RCliente == info.id) {
												arregloamostrar.push(response[i]);
											}
										}
									} catch (i) {
										alert("i " + i);
									}
									return arregloamostrar;
								}
							}
						});
						app.perfil.set("lugares", ds);
					} catch (h) {
						alert("h " + h);
					}
				},
				error: function (d) {
					alert(inspeccionar(d));
				}
			});

			var urlfoto = "https://www.impeltechnology.com/rest/api/getBinaryData?objName=Cliente1&id=" + info.id + "&fieldName=Foto&output=JSON&sessionId=" + idsesion;
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
			if(!info.Celular){
				info.Celular="";
			}
			if(!info.Direccin_Registrada){
				info.Direccin_Registrada="";
			}
			//document.getElementById('Identificacion').innerHTML = "Identificación: " + info.Identificacion;
			document.getElementById('email').innerHTML = '<i class="fa fa-envelope fa-2x fa-fw blue" aria-hidden="true" style="vertical-align: middle;" ></i>' + " " + info.email;
			document.getElementById('direccion').innerHTML = '<i class="fa fa-home fa-2x fa-fw blue" aria-hidden="true" style="vertical-align: middle;"></i>' + " " + info.Direccin_Registrada;
			document.getElementById('telefono').innerHTML = '<i class="fa fa-phone fa-2x fa-fw blue" aria-hidden="true" style="vertical-align: middle;"></i>' + " " + info.Telefono;
			document.getElementById('celular').innerHTML = '<i class="fa fa-mobile fa-2x fa-fw blue" aria-hidden="true" style="vertical-align: middle;"></i>' + " " + info.Celular;
			//document.getElementById('aceptaterminos').innerHTML = info.Acepto_Trminos_y_Condiciones;
			document.getElementById('nombreusuario').innerHTML = '<i class="fa fa-user" aria-hidden="true"></i>' + " " + info.name;
		} catch (s) {
			alert("s " + s);
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
		var lugarDire = [{ Nombre: "Agregar Nueva Dirección" }];
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