function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#photoInput img').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$("#photoInput input").change(function() {
    readURL(this);
});
$(document).ready(function(){
    $('select.icons').formSelect();
});
$("form").on("submit",function (e) {
    let flag = true;
    let msgs = [];
    if(!$("#name").val()){
       flag = false;
       msgs.push('Name Field Is Required');
    }
    if(!$("#age").val()){
       flag = false;
       msgs.push('Age Field Is Required');
    }
    if(!$("#gender").val()){
       flag = false;
       msgs.push('Gender Field Is Required');
    }
    if (flag){
        return true;
    } else {
        e.preventDefault();
        $("#errors").css("display","block");
        $("#errors .msgs").empty();
        msgs.forEach(msg=>{
            $("#errors .msgs").append("<h6>"+msg+"</h6>");
        })
        return false;
    }
});
