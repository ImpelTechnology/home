var tipoPersona = "";
app.creacuenta = kendo.observable({
	onShow: function () {
		sessionStorage.setItem("terminosA", "CrearUsuario");

		document.getElementById("DIVRazonS").style.display = "none";
		document.getElementById("DIVNit").style.display = "none";
		document.getElementById("DIVDirec").style.display = "none";
		document.getElementById("DIVTel").style.display = "none";

		document.getElementById("DIVemail").style.display = "none";
		document.getElementById("DIVPass").style.display = "none";
		document.getElementById("DIVNombre").style.display = "none";

		document.getElementById("termi").style.display = "none";
		document.getElementById("botob").style.display = "none";

		$("#TipoPersona").data("kendoMobileModalView").open();
	},
	afterShow: function () { }
});

function guardarnuevo() {
	try {
		kendo.ui.progress($("#creacuenta"), true);
		var contras = document.getElementById('contrase1').value;
		var contras2 = document.getElementById('contrase2').value;
		if (contras != contras2) {
			mens(" La contraseña no coincide", "warning");
			return;
		}
		var direccion = document.getElementById('Direcc').value;
		var email = document.getElementById('email').value;
		var nombres = document.getElementById('nombres').value;

		if (tipoPersona == "Juridica") {
			var Razon_Social = document.getElementById('RazonS').value;
			var NITVal = document.getElementById('NIT').value;
		} else if (tipoPersona == "Natural") {
			var ident = document.getElementById('NIT').value;
		}

		var fijo = document.getElementById('tel').value;
		var acepta = $("#aceptarterminos").data("kendoMobileSwitch").check();

		var infousuario = [{
			Contrase: contras,
			Identificacion: ident,
			Nombres: nombres,
			Email: email,
			Telefono: fijo,
			Direccion: direccion,
			Razn_Social: Razon_Social,
			NIT: NITVal
		}];

		if (acepta == false) {
			mens(" Deberías aceptar nuestros términos y condiciones", "warning");
			kendo.ui.progress($("#creacuenta"), false);
		} else {
			var inicias = "https://www.impeltechnology.com/rest/api/login?output=json&loginName=md5&password=wmunoz";
			$.ajax({
				url: inicias,
				success: function (e) {
					try {
						var params = {
							email: infousuario[0].Email,
							Nombre: infousuario[0].Nombres,
							Celular: infousuario[0].Telefono,
							Razn_Social: infousuario[0].Razn_Social,
							NIT: infousuario[0].NIT,
							Direccin_Registrada: infousuario[0].Direccion,
							Acepto_Trminos_y_Condiciones: acepta,
							password: infousuario[0].Contrase,
							loginName:infousuario[0].Email
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
										kendo.ui.progress($("#creacuenta"), true);
									}
								} catch (h) {
									alert("h " + h);
								}
							},
							error: function (d) {
								try {
									var mensaje = JSON.parse(d.responseText);
									mens("d" + mensaje.message, "error");
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
function Natural() {
	document.getElementById("DIVemail").style.display = "";
	document.getElementById("DIVPass").style.display = "";
	document.getElementById("DIVNombre").style.display = "";
	document.getElementById("DIVTel").style.display = "";

	document.getElementById("DIVRazonS").style.display = "none";
	document.getElementById("DIVNit").style.display = "none";
	document.getElementById("DIVDirec").style.display = "none";

	document.getElementById("termi").style.display = "";
	document.getElementById("botob").style.display = "";

	tipoPersona = "Natural";

	$("#TipoPersona").data("kendoMobileModalView").close();
}
function Juridica() {
	document.getElementById("DIVRazonS").style.display = "";
	document.getElementById("DIVNit").style.display = "";
	document.getElementById("DIVDirec").style.display = "";
	document.getElementById("DIVTel").style.display = "none";

	document.getElementById("DIVemail").style.display = "none";
	document.getElementById("DIVPass").style.display = "none";
	document.getElementById("DIVNombre").style.display = "none";

	document.getElementById("termi").style.display = "none";
	document.getElementById("botob").style.display = "none";

	tipoPersona = "Juridica";
	$("#TipoPersona").data("kendoMobileModalView").close();
	$("#persJurid").data("kendoMobileModalView").open();
}
function volverIng() {
	kendo.mobile.application.navigate("components/home/ingreso.html");

	document.getElementById("DIVRazonS").value = "";
	document.getElementById("DIVNit").value = "";
	document.getElementById("DIVDirec").value = "";
	document.getElementById("DIVTel").value = "";

	document.getElementById("DIVemail").value = "";
	document.getElementById("DIVPass").value = "";
	document.getElementById("DIVNombre").value = "";
}
function Siguiente() {
	document.getElementById("DIVRazonS").style.display = "";
	document.getElementById("DIVNit").style.display = "";
	document.getElementById("DIVDirec").style.display = "";
	document.getElementById("DIVTel").style.display = "";

	document.getElementById("DIVemail").style.display = "";
	document.getElementById("DIVPass").style.display = "";
	document.getElementById("DIVNombre").style.display = "";

	document.getElementById("termi").style.display = "";
	document.getElementById("botob").style.display = "";

	$("#persJurid").data("kendoMobileModalView").close();
}