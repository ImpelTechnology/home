'use strict';
app.terminos = kendo.observable({
    onInit: function (e) { },
    afterShow: function () { },
    onShow: function () { 
        var campoterminos=document.getElementById("terminos");
        $('#terminos').val('');
    }
});


function revisa(){
    if(sessionStorage.getItem("terminosA")=="Confirma"){
        window.location = "index.html#components/ConfirmacionServicio/confirmacionservicio.html";
    }else if(sessionStorage.getItem("terminosA")=="Perfil"){
        window.location = "index.html#components/Perfil/perfil.html";
    }else if(sessionStorage.getItem("terminosA")=="CrearUsuario"){
        window.location = "index.html#components/CrearCuenta/creacuenta.html";
    }
}