
app.mislugares = kendo.observable({
    onInit: function (e) { },
    afterShow: function () { },
    onShow: function () {

        var ds = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "https://www.impeltechnology.com/rest/api/getPage?output=json&startRow=0&rowsPerPage=10&viewId=UU3tnnF2TP-6iYqKdejtbQ&objName=Direccion&sessionId=" + idsesion
                }
            },
            schema: {
                parse: function (response) {
                    try {
                        $.each(response, function (index, item) {
                            if (!(item.name) || (item.name == null) || (item.name == undefined) || (item.name == "")) {
                                item.name = "";
                            }
                            if (!(item.streetAddr1) || (item.streetAddr1 == null) || (item.streetAddr1 == undefined) || (item.streetAddr1 == "")) {
                                item.streetAddr1 = "";
                            }
                            if (!(item.Nombre) || (item.Nombre == null) || (item.Nombre == undefined) || (item.Nombre == "")) {
                                item.Nombre = "";
                            }
                        });
                    } catch (i) {
                        alert("i " + i);
                    }
                    return response;
                }
            }
        });
        app.mislugares.set("lugares", ds);
    },
    listViewClick: function (e) {
        try {
            var direccion = JSON.stringify(e.dataItem);
            sessionStorage.setItem("lugar",direccion);
            window.location = "index.html#components/EditarLugar/editarlugar.html";
        } catch (s) {
            alert("s1 " + s);
        }
    }
});

