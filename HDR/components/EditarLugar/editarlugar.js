var direccion;
app.editarlugar = kendo.observable({
	onShow: function () {
		try {
			direccion = JSON.parse(sessionStorage.getItem("lugar"));
			if (direccion.Nombre == "Agregar Nueva Dirección") {
				document.getElementById("nombrelugar").value = "";
				document.getElementById("direccioneditarlugar").value = "";
			} else {
				document.getElementById("nombrelugar").value = direccion.Nombre;
				document.getElementById("direccioneditarlugar").value = direccion.streetAddr1;
			}
		} catch (e) {
			alert("e " + e);
		}
	},
	afterShow: function () {},
	guardarLugar: function () {
		var nombre = document.getElementById("nombrelugar").value;
		var direccionNu = document.getElementById("direccioneditarlugar").value;
		var info = JSON.parse(sessionStorage.getItem("perfil"));
		
		if (direccion.Nombre == "Agregar Nueva Dirección") {
			var acc = " creó ";
			var NuevaDir = [{
				output: "json",
				useIds: "true",
				objName: "Direccion",
				sessionId: idsesion,
				Nombre: nombre,
				streetAddr1: direccionNu,
				RCliente: info.id
			}];
			var urldir = "https://www.impeltechnology.com/rest/api/create2"
		} else {
			var NuevaDir = [{
				output: "json",
				useIds: "true",
				objName: "Direccion",
				sessionId: idsesion,
				Nombre: nombre,
				streetAddr1: direccionNu,
				id: direccion.id
			}];
			var urldir = "https://www.impeltechnology.com/rest/api/update2"
			var acc = " actualizó ";
		}

		if ((nombre == "") || (direccionNu == "")) {
			mens(" Por favor revise la información suministrada", "warning");
		}
		$.ajax({
			url: urldir,
			type: "POST",
			data: NuevaDir[0],
			dataType: "json",
			success: function (data) {
				if (data.status == "ok") {
					mens(" La direccion se" + acc + "correctamente", "success");
					kendo.mobile.application.navigate("components/Perfil/perfil.html");
				}
			},
			error: function (err) {
				var eror = JSON.parse(err.responseText);
				alert(eror.message);
			}
		});
	}

});
// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
// END_CUSTOM_CODE_home
