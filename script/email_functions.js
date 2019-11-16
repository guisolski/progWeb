var usuario = JSON.parse(sessionStorage.getItem("usuario"));
function gera_lista_emails(lista) {
    var html = "";

    for (var i in lista) {
        html += "<div class='email' id='" + i + "'>";
        var obj = lista[i];
        for (var j in obj) {
            var imprime = obj[j];
            if (imprime != null) if (imprime.length > 49) imprime = imprime.substring(0, 49) + "...";
            if (j == "name") {
                html += "<label>" + imprime + "</label><br>";
            }
            else if (j == "header") {
                html += "<label class='blueText smallText paddinRigth'>" + imprime + "</label>";
            }
            else if (j == "data") {
                html += "<label class='blueText smallText'>" + imprime + "</label>";
            }
        }
        html += "</div>"
    }
    $("#emails").empty().html(html);

    $('.email').click(function () {
        var classe = $(this).attr("class");
        var id = $(this).attr("id");
        if (classe.indexOf("background_blue") == -1) {
            $(".email").removeClass("background_blue");
            $(this).addClass("background_blue");

            $.ajax({
                type: "GET",
                url: "../php/email.php",
                data: {
                    login: usuario.login,
                    senha: usuario.senha,
                    action: "get_email",
                    id: id
                },
                success: function (data) {
                    var resultado = JSON.parse(data);
                    gera_email(resultado);
                },
                error: function () {
                    alert("erro");
                }
            });
        }
    });
}

function gera_email(lista){
    var html = "";
    html += lista.name +' ' + lista.name2+' ' + lista.header + ' ' + lista.data+' ' + lista.body;
    $("#email").empty().html(html);

}
