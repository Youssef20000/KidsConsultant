$('.dropdown-trigger').dropdown({
    coverTrigger:false
});
$(".password-input span").click(function () {
    let mode = $(".password-input input").attr('type');
    if (mode === "password"){
        $(".password-input input").attr('type','text');
    } else {
        $(".password-input input").attr('type','password')
    }
});

$(document).ready(function(){
    $('.sidenav').sidenav();
});


$("#download").on('click', function (e) {
    $.ajax({
        uri:$(this).attr("href")
    })
});

/* ************************************************************** */
