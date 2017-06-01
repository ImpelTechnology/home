app.creacuenta = kendo.observable({
	onShow: function () {
		sessionStorage.setItem("terminosA", "CrearUsuario");
	},
	afterShow: function () { }
});

function guardarnuevo() {
	try {
		var usuario = document.getElementById('user').value;
		var contras = document.getElementById('contrase1').value;
		var contras2 = document.getElementById('contrase2').value;

		if (contras != contras2) {
			mens(" La contraseña no coincide", "warning");
			return;
		}
		var ident = document.getElementById('id').value;

		var nombres = document.getElementById('nombres').value;
		var apellidos = document.getElementById('apellidos').value;

		var direccion = document.getElementById('direccion').value;
		var email = document.getElementById('email').value;
		var fijo = document.getElementById('tel').value;
		var celu = document.getElementById('movil').value;

		var acepta = document.getElementById('aceptaterminos').checked;

		var infousuario = [{
			Usuario: usuario,
			Contrase: contras,
			Identificacion: ident,
			Nombres: nombres,
			Apellidos: apellidos,
			Email: email,
			Telefono: fijo,
			Celular: celu,
			Direccion: direccion
		}];

		if (acepta == false) {
			mens(" Deberías aceptar nuestros términos y condiciones", "warning");
		} else {
			var inicias = "https://www.impeltechnology.com/rest/api/login?output=json&loginName=md5&password=wmunoz";
			$.ajax({
				url: inicias,
				success: function (e) {
					try {
						if (e.status == "ok") {
							var session = e.sessionId;
							var urlencripta = "https://www.impeltechnology.com/rest/api/create2?output=json&useIds=true&objName=md5&Aencriptar=" + infousuario[0].Contrase + "&sessionId=" + session;
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
														var params = {
															loginName: infousuario[0].Usuario,
															Clave: e.encriptado,
															Sal: e.Salt,
															Identificacion: infousuario[0].Identificacion,
															Nombre: infousuario[0].Nombres,
															Apellidos: infousuario[0].Apellidos,
															email: infousuario[0].Email,
															Telefono: infousuario[0].Telefono,
															Celular: infousuario[0].Celular,
															Acepto_Trminos_y_Condiciones: acepta,
															Direccin_Registrada: infousuario[0].Direccion
														};
														//alert(inspeccionar(params));
														var clienteNue = "https://www.impeltechnology.com/rest/api/create2?output=json&useIds=true&objName=Cliente1&sessionId=" + idsesion;

														$.ajax({
															url: clienteNue,
															type: "POST",
															data: params,
															dataType: "json",
															success: function (e) {
																try {
																	if (e.status == "ok") {
																		mens(" Usuario creado correctamente", "success");
																		kendo.mobile.application.navigate("components/home/ingreso.html");
																	}
																} catch (h) {
																	alert("h " + h);
																}
															},
															error: function (d) {
																try {
																	var mensaje = JSON.parse(d.responseText);
																	mens("d"+mensaje.message, "error");
																} catch (i) {
																	alert("i " + i);
																}
															}
														});
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
	} catch (r) {
		alert("r " + r);
	}
}

function ValidaPassword() {
    var pass = document.getElementById("contrase1").value;
    var repass = document.getElementById("contrase2").value;
    if (pass == repass) {
        document.getElementById("btn-registro").disabled = false;
        document.getElementById("contrase2").style.borderColor = "";
    }
    else {
        document.getElementById("btn-registro").disabled = true;
        document.getElementById("contrase2").style.borderColor = "red";
    }
}