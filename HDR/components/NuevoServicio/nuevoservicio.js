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
				dataValueField: "id",
				change: function (e) {
					try {
						var widget = e.sender;
						if (widget.value() && widget.select() === -1) {
							widget.value("");
							widget.trigger("change");
						}

					} catch (e) {
						alert("AAA"+e);
					}
				},
				close: function (e) {
					var widget = e.sender;
					if (widget.text() == "DILIEXPRESS") {
						document.getElementById("observacionesNue").placeholder = "¿Qué tramite hacer? \n¿Qué tenemos en cuenta?";
					} else {
						document.getElementById("observacionesNue").placeholder = "Observaciones";
					}
				}

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
				dataValueField: "id",
				change: function (e) {
					try {
						var widget = e.sender;
						if (widget.value() && widget.select() === -1) {
							//custom has been selected
							widget.value(""); //reset widget
							widget.trigger("change");
						}
					} catch (e) {
						alert("BBB"+e);
					}
				}
			}).data("kendoComboBox");


			//***********************************************
			var datos = {
				query: "select id,streetAddr1 from Direccion where RCliente=" + portalUserId,
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
							direcciones.push({
								id:item[0],
								name:item[1]
							});
						});
					} catch (e) {
						alert("asd" + e);
					}
				},
				error: function (err) {
					alert("asd:    a" + JSON.stringify(err));
				}
			});
			var lugares = new kendo.data.DataSource({
				data: direcciones
			});
			//***********************************************
			var startDateReference = $("#fecharecogeNue").kendoDateTimePicker({
				format: "dd/MM/yyyy hh:mm tt"
			}).data("kendoDateTimePicker");

			startDateReference.timeView.setOptions({ min: new Date(2000, 0, 1, 5, 00, 0), max: new Date(2000, 0, 1, 19, 00, 0) });

			$("#origenNue").kendoAutoComplete({
				dataSource: lugares,
				dataTextField: "name",
				dataValueField: "id",
				noDataTemplate: ''
			});
			$("#destinoNue").kendoAutoComplete({
				dataSource: lugares,
				dataTextField: "name",
				dataValueField: "id",
				noDataTemplate: ''
			});
			$("#guardar").kendoButton({
				click: function (e) {
					try {
						var proveedor = comboempresa.value();                               //RProveedor
						var producto = comboproducto.value();                               //RProductos
						var fecha = document.getElementById("fecharecogeNue").value;           //Hora_de_Recogida
						var origen = document.getElementById("origenNue").value + ",Bogotá D.C.,Colombia";               //Dorigen
						var destino = document.getElementById("destinoNue").value + ",Bogotá D.C.,Colombia";             //Ddestino
						//var entrega = document.getElementById("entregaNue").value;             //ResponsableO
						//var recibe = document.getElementById("recibeNue").value;               //ResponsableD
						var observaciones = document.getElementById("observacionesNue").value; //Observaciones
						var tramite = $("#tramiteNue").data("kendoMobileSwitch").check();           //Incluye_Trmite
						var idavuelta = $("#idavueltaNue").data("kendoMobileSwitch").check();         //Ida_y_Vuelta

						if (proveedor == "") {
							mens(" Por favor seleccione un proveedor", "warning");
							return;
						}
						if (producto == "") {
							mens(" Por favor seleccione un tipo de producto", "warning");
							return;
						}
						if (!fecha) {
							mens(" Por favor seleccione una fecha y hora de entrega", "warning");
							return;
						}
						if (origen == ",Bogotá D.C.,Colombia") {
							mens(" Por favor digite una direccion de origen", "warning");
							return;
						}
						if (destino == ",Bogotá D.C.,Colombia") {
							mens(" Por favor digite una direccion de destino", "warning");
							return;
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
							//Entrega: entrega,
							//Recibe: recibe,
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
			alert("asdasd"+d);
		}
	},
	afterShow: function () { kendo.ui.progress($("#menulist"), false); },
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