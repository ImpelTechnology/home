var LogOutLink, portalUserId, pushToken;
app.home = kendo.observable({
	init:function(){
		$("#email").kendoAutoComplete({
				dataSource: "",
				noDataTemplate: ''
			});
	},
	onShow: function () {
		try {
			if ((localStorage.getItem("HoDe.usuario")) && (localStorage.getItem("HoDe.contraseña")) && ((localStorage.getItem("HoDe.usuario")) != "") && ((localStorage.getItem("HoDe.contraseña")) != "")) {
				document.getElementById('usuario').value = localStorage.getItem("HoDe.usuario");
				document.getElementById('contrase').value = localStorage.getItem("HoDe.contraseña");
				IniciarSesion();
			}
		} catch (k) {
			alert(k);
		}
	},
	afterShow: function () {
	},
	before: function () {
		/*if (localStorage.getItem("HoDe.usuario")) {
			document.getElementById("usuario").value = localStorage.getItem("HoDe.usuario");
			document.getElementById("contrase").value = localStorage.getItem("HoDe.contraseña");
			ingresar();
		}*/
	}
});
var usuario, pass, usuarioReal, passReal;
// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function ingresar() {
	try {
		usuario = "hd.cliente";
		pass = "cliente";

		var url = "https://www.impeltechnology.com/rest/api/login?output=json&loginName=" + usuario + "&password=" + pass;

		$.ajax({
			url: url,
			async: false,
			success: function (e) {
				try {
					var resp = e;
					var estado = resp.status;
					idsesion = resp.sessionId;
					password = pass;
					loginName = usuario;
					if (resp.message) {
						var mensaje = resp.message;
					}
					if (estado == "ok") {
						sessionStorage.setItem("resp", resp);
						sessionStorage.setItem("estado", estado);
					}
				} catch (h) {
					alert("h " + h);
				}
			},
			error: function (d) {
				try {
					var mensaje = JSON.parse(d.responseText);
					if (mensaje.message == "Session expired or invalid login credentials") {
						mens("Usuario o contraseña incorrectos", "error");
					}
					kendo.ui.progress($("#homeScreen"), false);
				} catch (i) {
					alert("i1 " + i);
				}
			}
		});
	} catch (e) {
		alert("e " + e);
	}
}
// END_CUSTOM_CODE_home
function crearcuenta() {
	kendo.ui.progress($("#homeScreen"), true);
	usuario = "hd.cliente";
	pass = "cliente";

	var url = "https://www.impeltechnology.com/rest/api/login?output=json&loginName=" + usuario + "&password=" + pass;

	$.ajax({
		url: url,
		success: function (e) {
			try {
				var resp = e;
				var estado = resp.status;
				idsesion = resp.sessionId;
				password = pass;
				loginName = usuario;
				if (resp.message) {
					var mensaje = resp.message;
				}
				if (estado == "ok") {
					sessionStorage.setItem("resp", resp);
					sessionStorage.setItem("estado", estado);
					kendo.ui.progress($("#homeScreen"), false);
				}
			} catch (h) {
				alert("h " + h);
			}
		},
		error: function (d) {
			try {
				var mensaje = JSON.parse(d.responseText);
				if (mensaje.message == "Session expired or invalid login credentials") {
					mens("Usuario o contraseña incorrectos", "error");
				}
				kendo.ui.progress($("#homeScreen"), false);
			} catch (i) {
				alert("i6 " + i);
			}
		}
	});
	kendo.mobile.application.navigate("components/CrearCuenta/creacuenta.html");
}
function recordarC() {
	try {
		kendo.mobile.application.navigate("components/RecordarContrasena/recordarcontrasena.html");
	} catch (s) {
		alert(s);
	}

}
function CerrarSesionPortal() {
	$.ajax({
		url: LogOutLink,
		async: false,
		type: 'POST',
		success: function (resp) {
		},
		error: function (error) {
			alert(error);
		}
	});
}
function IniciarSesion() {
	try {
		var portalURL = "https://www.impeltechnology.com/router/servlet/Portal?c=5794463&p=7345020&g=7338888";
		var prodportalURL = "";
		var USERNAME = document.getElementById("usuario").value;
		var PASSWORD = document.getElementById("contrase").value;

		$.ajax({
			url: portalURL,
			dataType: "html",
			async: false,
			type: 'GET',
			success: function (resp) {
				var x = document.createElement('div');
				x.innerHTML = resp;

				prodportalURL = $(x.querySelector('form'))[0].action + "?" +
					$(x.querySelector('form')).serialize();

				prodportalURL = prodportalURL.replace("&g=7338888", "&g=" + "7338894");
				prodportalURL = prodportalURL.replace("&loginName=", "&loginName=" + USERNAME);
				prodportalURL = prodportalURL.replace("&password=", "&password=" + PASSWORD);

			},
			error: function (error) {
				alert("Error " + JSON.stringify(error));
			}
		});

		$.ajax({
			url: prodportalURL,
			async: false,
			type: 'POST',
			success: function (resp) {
				var y = document.createElement('div');
				y.innerHTML = resp;

				portalUserId = $(y.querySelector('div#portalId')).text();
				LogOutLink = $(y.querySelector('div#logoutlink')).text();

				if ((portalUserId) && (portalUserId != "")) {
					localStorage.setItem("HoDe.usuario", USERNAME);
					localStorage.setItem("HoDe.contraseña", PASSWORD);
					ingresar();
					CerrarSesionPortal();
					kendo.mobile.application.navigate("components/Menu/menu.html");
				} else {
					mens("Usuario o contraseña incorrectos", "error");
				}
			},
			error: function (error) { alert(error); }
		});
	} catch (s) {
		alert(s);
	}
}