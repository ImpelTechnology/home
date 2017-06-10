app.Registro = kendo.observable({
	listViewClick: function (e) {
		sessionStorage.setItem("ServicioDetalle", JSON.stringify(e.dataItem));
		kendo.mobile.application.navigate("components/DetalleServicio/detalleserv.html");
	},
	onInit: function () {
		var Url = "https://www.impeltechnology.com/rest/api/login?output=json";

		var usuarioLogIn = {
			loginName: "ekokarga.willberth",
			password: "Yubelin2"
		};

		$.ajax({
			url: Url,
			type: "GET",
			dataType: "json",
			data: usuarioLogIn,
			async: false,
			success: function (data) {
				if (data.status == "ok") {
					IdSesion = data.sessionId;
				}
			},
			error: function (err) {
				alert(JSON.stringify(err));
				return;
			}
		});

		var Url = "https://www.impeltechnology.com/rest/api/getPicklist?output=json&objDefId=6309374&fieldDefId=6309494&sessionId=" + IdSesion;

		$.ajax({
			url: Url,
			type: "GET",
			dataType: "json",
			async: false,
			success: function (data) {
				$("#RegimenRegistroCliente").kendoDropDownList({
					dataTextField: "name",
					dataValueField: "id",
					dataSource: data
				});
			},
			error: function (err) {
				alert(JSON.stringify(err));
				return;
			}
		});
	},
	onShow: function () {
		try {
			kendo.ui.progress($("#loginScreen"), false);
		} catch (e) {
			alert(e);
		}
	},
	afterShow: function () { }
});
app.localization.registerView('home');

function guardarRegistro() {
	var cliente = {
		Nombre: document.getElementById("NombreRegistroCliente").value + " " + document.getElementById("ApellidoRegistroCliente").value,
		razon_social: document.getElementById("RazonSRegistroCliente").value,
		NIT: document.getElementById("NITRegistroCliente").value,
		DV: document.getElementById("DVRegistroCliente").value,
		regimen: document.getElementById("RegimenRegistroCliente").value,
		email: document.getElementById("EmailRegistroCliente").value,
		sitio_web: document.getElementById("WebRegistroCliente").value,
		telefono: document.getElementById("TelRegistroCliente").value,
		Ciudad: document.getElementById("CiudadRegistroCliente").value,
		Direccion: document.getElementById("DireccionRegistroCliente").value,
		loginName: document.getElementById("UsuarioRegistroCliente").value,
		password: document.getElementById("ContrasenaRegistroCliente").value
	}

	$.ajax({
		url: "https://www.impeltechnology.com/rest/api/create2?output=json&useIds=true&objName=Cliente1&sessionId=" + IdSesion,
		type: "GET",
		dataType: "json",
		data: cliente,
		async: false,
		success: function (data) {
			try {
				alert("Cliente Creado");
				kendo.mobile.application.navigate("components/login/view.html");
			} catch (e) {
				alert(e);
			}
		},
		error: function (err) {
			alert(JSON.stringify(err));
		}
	});
}