

app.recordarcontraseña = kendo.observable({
	onShow: function () { },
	afterShow: function () { }
});

function Recordar() {
	try {
		var email = document.getElementById('correo').value;
		if (email == "") {
			mens(" Debes llenar el campo 'email' para procesar la solicitud", "warning");
			return;
		}
		var inforecordar = [{
			email: email
		}];

		var usuarioJoker = "hd.willberth";
		var passJoker = "homemovil";

		var url = "https://www.impeltechnology.com/rest/api/login?output=json&loginName=" + usuarioJoker + "&password=" + passJoker;

		$.ajax({
			url: url,
			type: "POST",
			data: inforecordar[0],
			dataType: "json",
			success: function (data) {
				if (data.status == "ok") {
					var idse = data.sessionId;

					var urliden = "https://www.impeltechnology.com/rest/api/getPage?output=json&startRow=0&rowsPerPage=10000&viewId=uIQ7BK8FQMmEYpPXlBFXbA&objName=Cliente1&sessionId=" + idse;
					var afirmativo = 0;
					$.ajax({
						url: urliden,
						type: "GET",
						dataType: "json",
						success: function (data) {
							$.each(data, function (index, item) {
								if (item.email == email) {
									afirmativo = 1;
									var urlContra = "https://www.impeltechnology.com/rest/api/update2?output=json&useIds=true&objName=Cliente1";
									var data = [{
										sessionId: idse,
										contrasenaolvidada: true,
										id: item.id
									}];

									$.ajax({
										url: urlContra,
										type: "POST",
										data: data[0],
										dataType: "json",
										success: function (data) {
											mens(" Se envió la solicitud de cambio de contraseña... Revisa tu email!", "warning");
										},
										error: function (err) {
											var eror = JSON.parse(err.responseText);
											alert(eror.message);
										}
									});
									return false;
								}
							});
							if (afirmativo == 1) {
								kendo.mobile.application.navigate("components/home/ingreso.html");
							} else {
								mens(" Tu email está errado", "warning");
							}
						},
						error: function (err) {
							var eror = JSON.parse(err.responseText);
							alert(eror.message);
						}
					});
				}
			},
			error: function (err) {
				var eror = JSON.parse(err.responseText);
				alert(eror.message);
			}
		});

	} catch (r) {
		alert("r " + r);
	}
}