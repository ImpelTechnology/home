'use strict';
var ubicacion;
var arregloamostrar = [];
var productos;
app.servicios = kendo.observable({
	onInit: function () {
		try {
			productos = JSON.parse(sessionStorage.getItem("Productos"));
			kendo.ui.progress($("#servicioslist"), true);
		} catch (w) { alert(w); }
	},
	afterShow: function () { },
	listViewClick: function (e) {
		try {
			var servicioe = JSON.stringify(e.dataItem);
			sessionStorage.setItem("servicio", servicioe);
			window.location = "index.html#components/DetalleServicio/detalleservicio.html";
		} catch (s) {
			alert("s1 " + s);
		}
	},
	onShow: function () {
		try {
			arregloamostrar = [];
			var info = JSON.parse(sessionStorage.getItem("perfil"));
			var ds = new kendo.data.DataSource({
				transport: {
					read: {
						url: "https://www.impeltechnology.com/rest/api/getPage?output=json&startRow=0&rowsPerPage=10&viewId=Pyqkltp8Rbi8BAh21Wpodw&objName=Servicio&sessionId=" + idsesion
					}
				},
				schema: {
					parse: function (response) {
						try {
							$.each(response, function (index, item) {
								if (!(item.Fecha) || (item.Fecha == null) || (item.Fecha == undefined) || (item.Fecha == "")) {
									item.Fecha = "";
								}
								if (!(item.Dorigen) || (item.Dorigen == null) || (item.Dorigen == undefined) || (item.Dorigen == "")) {
									item.Dorigen = "";
								}
								if (!(item.Ddestino) || (item.Ddestino == null) || (item.Ddestino == undefined) || (item.Ddestino == "")) {
									item.Ddestino = "";
								}
								if (!(item.ResponsableD) || (item.ResponsableD == null) || (item.ResponsableD == undefined) || (item.ResponsableD == "")) {
									item.ResponsableD = "";
								}
								if (!(item.precio) || (item.precio == null) || (item.precio == undefined) || (item.precio == "")) {
									item.precio = "";
								}
								if (!(item.status) || (item.status == null) || (item.status == undefined) || (item.status == "")) {
									item.status = "";
								}
								if ((item.RProductos) || (item.RProductos != null) || (item.RProductos != undefined) || (item.RProductos != "")) {
									for (var j = 0; j < productos.length; j++) {
										if (item.RProductos == productos[j].id) {
											item.RProductos = productos[j].name;
											return;
										}
									}
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
			app.servicios.set("datos", ds);
			sessionStorage.setItem("servicio", "");
			esperansegundos(4);
		} catch (j) {
			alert("j " + j);
		}
	},
	datos: []
});
/*function cambiarnombreinst(id) {
    try {
        for (var g = 0; g < instituciones.length; g++) {
            if (instituciones[g].id == id) {
                return (instituciones[g].name);
            }
        }
    } catch (w) {
        alert("w " + w);
    }
}*/
function esperansegundos(segundos) {
	try {
		segundos = segundos * 1000;
		setTimeout(function () {
			kendo.ui.progress($("#servicioslist"), false);
		}, segundos
		);
	} catch (j) {
		alert(j);
	}
}