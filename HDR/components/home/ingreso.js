var LogOutLink, portalUserId;
app.home = kendo.observable({
	onShow: function () {
		try {
			var el = new Everlive('zm2oqp21pd5bzi44');
			var pushSettings = {
				iOS: {
					badge: true,
					sound: true,
					alert: true,
					clearBadge: true
				},
				android: {
					senderID: '332804486068'
				},
				wp8: {
					channelName: 'EverlivePushChannel'
				},
				notificationCallbackIOS: function (e) {
					// logic for handling push in iOS
				},
				notificationCallbackAndroid: function (e) {
					// logic for handling push in Android
				},
				notificationCallbackWP8: function (e) {
					// logic for handling push in Windows Phone. Not available in NativeScript.
				},
				customParameters: {
					myParameter1: "MyValue1",
					myParameter2: "MyValue2"
				}
			};

			el.push.register(
				pushSettings,
				function successCallback(data) {
					//alert("Success: " +data);
				},
				function errorCallback(error) {
					//alert("ErrorHD: " +error);
				}
			);

			if ((localStorage.getItem("HoDe.usuario")) && (localStorage.getItem("HoDe.contraseña")) && ((localStorage.getItem("HoDe.usuario")) != "") && ((localStorage.getItem("HoDe.contraseña")) != "")) {
				document.getElementById('usuario').value = localStorage.getItem("HoDe.usuario");
				document.getElementById('contrase').value = localStorage.getItem("HoDe.contraseña");
				document.getElementById("Recordar").checked = true;
			}



			/*$.ajax({
				url: url,
				success: function (s) {
					try {
						parser = new DOMParser();
						var htmlDoc = parser.parseFromString(s, "text/html");
	
						var act = htmlDoc.getElementsByName("act")[0].value;
						var c = htmlDoc.getElementsByName("c")[0].value;
						var p = htmlDoc.getElementsByName("p")[0].value;
						var d = htmlDoc.getElementsByName("d")[0].value;
						var g = htmlDoc.getElementsByName("g")[0].value;
						var objDefId = htmlDoc.getElementsByName("objDefId")[0].value;
						var formId = htmlDoc.getElementsByName("formId")[0].value;
						var _csrf = htmlDoc.getElementsByName("_csrf")[0].value;
						var loginName = "prueba";
						var password = "pruebas";
	
						var url2 = "https://www.impeltechnology.com/router/servlet/portal?" + "c=" + c + "&act=" + act + "&p=" + p + "&d=" + d + "&g=" + g + "&objDefId=" + objDefId + "&formId=" + formId + "&_csrf=" + _csrf + "&loginName=" + loginName + "&password=" + password;
						$.ajax({
							url: url2,
							success: function (s) {
								try {
									alert(inspeccionar(s));
								} catch (h) {
									alert("h " + h);
								}
							},
							error: function (e) {
								try {
									alert(inspeccionar(e));
								} catch (i) {
									alert("i2 " + i);
								}
							}
						});
	
	
	
	
	
	
					} catch (h) {
						alert("h " + h);
					}
				},
				error: function (e) {
					try {
						alert(inspeccionar(e));
					} catch (i) {
						alert("i2 " + i);
					}
				}
			});*/

		} catch (k) {
			alert(k);
		}
	},
	afterShow: function () { },
	before: function () {
		if (localStorage.getItem("HoDe.usuario")) {
			document.getElementById("usuario").value = localStorage.getItem("HoDe.usuario");
			document.getElementById("contrase").value = localStorage.getItem("HoDe.contraseña");
			ingresar();
		}
	}
});
var usuario, pass, usuarioReal, passReal;
// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function ingresar() {
	try {
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

																		localStorage.setItem("HoDe.usuario", u);
																		localStorage.setItem("HoDe.contraseña", c);

																		//window.location = "index.html#components/Menu/menu.html";
																	} else {
																		mens(" Contraseña incorrecta", "warning");
																		kendo.ui.progress($("#homeScreen"), false);
																		$("#linko").show(1000);
																		return;
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
																	alert("i2 " + i);
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
													alert("i3 " + i);
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
									alert("i4 " + i);
								}
							}
						});
					}
					if (contraseok == 1) {
						break;
					}
				}
				if (usuarioexiste == 0) {
					mens("Usuario no existe", "warning");
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
				alert("i5 " + i);
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

			/*var y = document.createElement('div');
			y.innerHTML = resp;

			var portalUserId = $(y.querySelector('div#portalId')).text();
			LogOutLink = $(y.querySelector('div#logoutlink')).text();

			if ((portalUserId) && (portalUserId != "")) {
				alert();
			}*/

		},
		error: function (error) {
			alert(error);
		}
	});
}





function IniciarSesion() {

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

			//console.log( $(x.querySelector('form'))[0].action );
			//console.log($(x.querySelector('form')).serializeArray());
			//console.log($(x.querySelector('form')).serialize());

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
				ingresar();
				CerrarSesionPortal();
				kendo.mobile.application.navigate("components/Menu/menu.html");
			} else {
				mens("Usuario o contraseña incorrectos", "error");
			}
			//var portalUserLogin = $(y.querySelector('div#portalUsername')).text();
			//var portalSessionId = $(y.querySelector('div#portalsessionID')).text();
			//$('#ylogouturl').text($(y.querySelector('div#logouturl')).text());
			//$('#ylogoutlink').html($(y.querySelector('div#logoutlink')).html());

			//alert("ID: " + portalUserId);
			//alert("LogOutLink: " + LogOutLink);
		},
		error: function (error) { alert(error); }
	});

}