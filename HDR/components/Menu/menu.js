
var oculta = 1;
app.Menu = kendo.observable({
    onInit: function () {
        try {

        } catch (d) {
            alert("d " + d);
        }
    },
    afterShow: function () { },
    listViewClick: function (e) { },
    onShow: function () {
        try {
            kendo.ui.progress($("#menulist"), false);
			var products="https://www.impeltechnology.com/rest/api/getPage?output=json&startRow={startRow}&rowsPerPage={rowsPerPage}&viewId=5npWXdzlT--e69yxIbWraA&objName=Productos&sessionId=" + idsesion;
            $.ajax({
                url: products,
                success: function (response) {
                    try {
                        if (response) {
							sessionStorage.setItem("Productos", JSON.stringify(response));
                        }
                    } catch (h) {
                        alert("h2 " + h);
                    }
                },
                error: function (d) {
					mens(" Error al traer los productos "+ d, "error");
                }
            });

			var info = JSON.parse(sessionStorage.getItem("perfil"));

            var urlverfi = "https://www.impeltechnology.com/rest/api/getPage?output=json&startRow=0&rowsPerPage=10&viewId=Pyqkltp8Rbi8BAh21Wpodw&objName=Servicio&sessionId=" + idsesion;
            $.ajax({
                url: urlverfi,
                success: function (response) {
                    try {
                        if (response) {
                            for (var i = 0; i < response.length; i++) {
                                if ((response[i].RCliente == info.id) && (response[i].status == "Recogido")) {
                                    oculta = 0;
                                    break;
                                }
                            }
                            if (oculta == 0) {
                                var x = document.getElementById("reastreo");
                                x.style.display = "";
								var y = document.getElementById("reastreo2");
                                y.style.display = "";
                            }
                        }
                    } catch (h) {
                        alert("h2 " + h);
                    }
                },
                error: function (d) {
                }
            });

        } catch (d) {
            if (d == "SyntaxError: Unexpected token u in JSON at position 0") {
                
            }
        }

    },
    datos: []
});

function servicios() {
    try {
		kendo.ui.progress($("#menulist"), true);
        window.location = "index.html#components/Servicios/servicios.html";
    } catch (h) {
        alert("h " + h);
    }
}

function nuevoservicio() {
    try {
		kendo.ui.progress($("#menulist"), true);
        window.location = "index.html#components/NuevoServicio/nuevoservicio.html";
    } catch (h) {
        alert("h " + h);
    }
}
function rastrearservicio() {
    try {
        window.location = "index.html#components/Rastrear/rastrear.html";
    } catch (p) {
        alert(p);
    }
}

function iraperfil() {
    try {
        window.location = "index.html#components/Perfil/perfil.html";
    } catch (p) {
        alert(p);
    }
}
function salir() {
    window.location = "index.html#components/home/ingreso.html";
}

