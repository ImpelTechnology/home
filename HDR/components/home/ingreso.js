'use strict';

app.home = kendo.observable({
	onShow: function () {
		try {

			if ((localStorage.getItem("HoDe.usuario")) && (localStorage.getItem("HoDe.contraseña")) && ((localStorage.getItem("HoDe.usuario")) != "") && ((localStorage.getItem("HoDe.contraseña")) != "")) {
				document.getElementById('usuario').value = localStorage.getItem("HoDe.usuario");
				document.getElementById('contrase').value = localStorage.getItem("HoDe.contraseña");
				document.getElementById("Recordar").checked = true;
			}
		} catch (k) {
			alert(k);
		}
	},
	afterShow: function () { }
});
var usuario, pass, usuarioReal, passReal;
// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function ingresar() {
	try {
		usuarioReal = document.getElementById("usuario").value;
		passReal = document.getElementById("contrase").value;
		if ((usuarioReal == "") || (passReal == "")) {
			return;
		}
		var recordar = (document.getElementById("Recordar").checked);

		if (recordar == true) {
			localStorage.setItem("HoDe.usuario", usuarioReal);
			localStorage.setItem("HoDe.contraseña", passReal);
		} else if (recordar == false) {
			localStorage.setItem("HoDe.usuario", "");
			localStorage.setItem("HoDe.contraseña", "");
		}

		kendo.ui.progress($("#homeScreen"), true);
		usuario = "hd.willberth";
		pass = "homemovil";

		var url = "https://www.impeltechnology.com/rest/api/login?output=json&loginName=" + usuario + "&password=" + pass;
		var urliden = "https://www.impeltechnology.com/rest/api/getPage?output=json&startRow=0&rowsPerPage=10000&viewId=uIQ7BK8FQMmEYpPXlBFXbA&objName=Cliente1";
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
						confirmar(usuarioReal, passReal, idsesion);
						sessionStorage.setItem("resp", resp);
						sessionStorage.setItem("estado", estado);
						//kendo.ui.progress($("#homeScreen"), false);
						// document.getElementById("navigation-container").style.display = "";
					}
				} catch (h) {
					alert("h " + h);
				}
			},
			error: function (d) {
				try {
					var mensaje = JSON.parse(d.responseText);
					if (mensaje.message == "Session expired or invalid login credentials") {
						alert("Usuario o contraseña incorrectos");
					}
					kendo.ui.progress($("#homeScreen"), false);
				} catch (i) {
					alert("i " + i);
				}
			}
		});
	} catch (e) {
		alert("e " + e);
	}
}
// END_CUSTOM_CODE_home
function confirmar(u, c, id) {
	var usuarioexiste = 0;
	var contraseok = 0;
	var urliden = "https://www.impeltechnology.com/rest/api/getPage?output=json&startRow=0&rowsPerPage=10000&viewId=uIQ7BK8FQMmEYpPXlBFXbA&objName=Cliente1&sessionId=" + id;
	$.ajax({
		url: urliden,
		success: function (usua) {
			try {
				for (var f = 0; f < usua.length; f++) {
					if ((usua[f].loginName == u) || (usua[f].email == u)) {
						usuarioexiste = 1;
						var Saltraida = usua[f].Sal;
						var Claveencrip = usua[f].Clave;
						sessionStorage.setItem("perfil", JSON.stringify(usua[f])); //necesitamos que sea unico el email

						var inicias = "https://www.impeltechnology.com/rest/api/login?output=json&loginName=md5&password=wmunoz";
						$.ajax({
							url: inicias,
							success: function (e) {
								try {
									if (e.status == "ok") {
										var session = e.sessionId;
										var urlencripta = "https://www.impeltechnology.com/rest/api/create2?output=json&useIds=true&objName=md5&Aencriptar=" + c + "&Salt=" + Saltraida + "&sessionId=" + session;
										$.ajax({
											url: urlencripta,
											success: function (e) {
												try {
													if (e.status == "ok") {
														var salt = "https://www.impeltechnology.com/rest/api/getRecord?sessionId=" + session + "&objName=md5&id=" + e.id + "&fieldList=id,encriptado,Salt&output=json";
														$.ajax({
															url: salt,
															success: function (e) {
																try {
																	if (e.encriptado == Claveencrip) {
																		contraseok = 1;
																		kendo.ui.progress($("#homeScreen"), false);
																		kendo.mobile.application.navigate("components/Menu/menu.html");
																		//window.location = "index.html#components/Menu/menu.html";
																	} else {
																		alert("Contraseña incorrecta");
																		kendo.ui.progress($("#homeScreen"), false);
																		$("#linko").show(1000);
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
					}
					if (contraseok == 1) {
						break;
					}
				}
				if (usuarioexiste == 0) {
					alert("Usuario no existe");
					kendo.ui.progress($("#homeScreen"), false);
				}

			} catch (h) {
				alert("h " + h);
			}
		},
		error: function (d) {
			try {
				alert(JSON.stringify(d));
				var mensaje = JSON.parse(d.responseText);
				kendo.ui.progress($("#homeScreen"), false);
			} catch (i) {
				alert("i " + i);
			}
		}
	});
}
function crearcuenta() {
	kendo.ui.progress($("#homeScreen"), true);
	usuario = "hd.willberth";
	pass = "homemovil";

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
					alert("Usuario o contraseña incorrectos");
				}
				kendo.ui.progress($("#homeScreen"), false);
			} catch (i) {
				alert("i " + i);
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