'use strict';
//var ubicacion;
var servAct = [];
var productos;
app.rastrear = kendo.observable({
    onInit: function () {
		productos = JSON.parse(sessionStorage.getItem("Productos"));
        kendo.ui.progress($("#serviciosactivos"), true);
    },
    afterShow: function () { },
    listViewClick: function (e) {
        try {
            var serviciorast = JSON.stringify(e.dataItem);
            sessionStorage.setItem("servicioRastreo", serviciorast);
            window.location = "index.html#components/RastrearDetalle/rastreardetalle.html";
        } catch (s) {
            alert("s1 " + s);
        }
    },
    onShow: function () {
        try {
            servAct=[];
            var info = JSON.parse(sessionStorage.getItem("perfil"));
            var dsou = new kendo.data.DataSource({
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
								if ((item.RProductos) || (item.RProductos != null) || (item.RProductos != undefined) || (item.RProductos != "")) {
									for (var j = 0; j < productos.length; j++) {
										if (item.RProductos == productos[j].id) {
											item.RProductos=productos[j].name;
											return;
										}
									}
								}
                            });
                            for (var i = 0; i < response.length; i++) {
                                /*if ((response[i].RCliente == info.id)&&(response[i].status == "Recogido")) {
                                    servAct.push(response[i]);
                                }*/
                                if ((response[i].RCliente == info.id)&&(response[i].status == "Recogido")) {
                                    servAct.push(response[i]);
                                }
                            }
                        } catch (i) {
                            alert("i " + i);
                        }
                        return servAct;
                    }
                }
            });
            app.rastrear.set("rastre", dsou);
            sessionStorage.setItem("servicio", "");
            esperansegun2(4);
        } catch (j) {
            alert("j " + j);
        }
    },
    rastre: []
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
function esperansegun2(segundos) {
    segundos = segundos * 1000;
    setTimeout(function () {
        kendo.ui.progress($("#serviciosactivos"), false);
    }, segundos
    );
}