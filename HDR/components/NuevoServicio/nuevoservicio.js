'use strict';
var ubicacion;
var comboempresa, comboproducto;
app.nuevoservicio = kendo.observable({
    onInit: function () {
        try {
			//document.getElementById("observacionesNue").placeholder = "Observaciones";

            var proveedores = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "https://www.impeltechnology.com/rest/api/getPage?output=json&startRow=0&rowsPerPage=1000&viewId=esUcd2r7RVi8_QIFsJl-QA&objName=Empresa&sessionId=" + idsesion
                    }
                }
            });
            comboempresa = $("#comboboxempresaNue").kendoComboBox({
                dataSource: proveedores,
                dataTextField: "name",
                dataValueField: "id"
            }).data("kendoComboBox");

            var productos = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "https://www.impeltechnology.com/rest/api/getPage?output=json&startRow=0&rowsPerPage=1000&viewId=5npWXdzlT--e69yxIbWraA&objName=Productos&sessionId=" + idsesion
                    }
                }
            });
            comboproducto = $("#comboboxproductoNue").kendoComboBox({
                dataSource: productos,
                dataTextField: "name",
                dataValueField: "id"
            }).data("kendoComboBox");

            var lugares = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "https://www.impeltechnology.com/rest/api/getPage?output=json&startRow=0&rowsPerPage=1000&viewId=UU3tnnF2TP-6iYqKdejtbQ&objName=Direccion&sessionId=" + idsesion
                    }
                }
            });

            $("#fecharecogeNue").kendoDateTimePicker({
                format: "dd/MM/yyyy hh:mm tt"
            });

            $("#origenNue").kendoAutoComplete({
                dataSource: lugares,
                dataTextField: "dirmovil",
                dataValueField: "id",
                noDataTemplate: 'No hay coincidencias con tus lugares'
            });
            $("#destinoNue").kendoAutoComplete({
                dataSource: lugares,
                dataTextField: "dirmovil",
                dataValueField: "id",
                noDataTemplate: 'No hay coincidencias con tus lugares'
            });
            $("#guardar").kendoButton({
                click: function (e) {
                    try {
                        var proveedor = comboempresa.value();                               //RProveedor
                        var producto = comboproducto.value();                               //RProductos
                        var fecha = document.getElementById("fecharecogeNue").value;           //Hora_de_Recogida
                        var origen = document.getElementById("origenNue").value;               //Dorigen
                        var destino = document.getElementById("destinoNue").value;             //Ddestino
                        var entrega = document.getElementById("entregaNue").value;             //ResponsableO
                        var recibe = document.getElementById("recibeNue").value;               //ResponsableD
                        var observaciones = document.getElementById("observacionesNue").value; //Observaciones
                        var tramite = document.getElementById("tramiteNue").checked;           //Incluye_Trmite
                        var idavuelta = document.getElementById("idavueltaNue").checked;         //Ida_y_Vuelta
                   
                        if (proveedor == "") {
                            alert("Por favor seleccione un proveedor"); return;
                        }
                        if (producto == "") {
                            alert("Por favor seleccione un tipo de producto"); return;
                        }
                        if (fecha == "") {
                            alert("Por favor seleccione una fecha y hora de entrega"); return;
                        }
                        if (origen == "") {
                            alert("Por favor digite una direccion de origen"); return;
                        }
                        if (destino == "") {
                            alert("Por favor digite una direccion de destino"); return;
                        }
                      /*  if (entrega == "") {
                            alert("Por favor digite quién entrega el producto"); return;
                        }
                        if (recibe == "") {
                            alert("Por favor digite quién recibe el producto"); return;
                        }
                        */
                        var infocreacion = [{
                            Proveedor: proveedor,
                            Producto: producto,
                            Fecharecoge: fecha,
                            LugarOrigen: origen,
                            LugarDestino: destino,
                            Entrega: entrega,
                            Recibe: recibe,
                            Observacion: observaciones,
                            Tramite: tramite,
                            IdaVuelta: idavuelta
                        }];
                        sessionStorage.setItem("InfoServicioCreado", JSON.stringify(infocreacion));
                        kendo.mobile.application.navigate("components/ConfirmacionServicio/confirmacionservicio.html");
                    } catch (s) {
                        alert("s " + s);
                    }
                }
            });
        } catch (d) {
            alert(d);
        }
    },
    afterShow: function () { },
    listViewClick: function (e) { },
    onShow: function () {
        //kendo.ui.progress($("#contactlist"), false);
    }
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