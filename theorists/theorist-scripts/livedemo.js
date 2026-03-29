$(document).ready(function () {
    
    let inp = $("#inputcont");
    let oup = $("#outputcont");
    inp.autoResize();
    $(inp).on('input', function () { 
        oup.html(converter.makeHtml(inp.val()));
        
    });

});

function copytext() {
    navigator.clipboard.writeText($("#inputcont").val());
}