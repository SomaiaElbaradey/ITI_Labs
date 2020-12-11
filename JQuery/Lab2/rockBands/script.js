$.ajax({
    url: "rockbands.json",
    type: "GET",
    success: function (res) {
        for (var key in res) {
            $("#firstList").append("<option>" + key + "</option");
        }
    },
})
$("#firstList").change(function(){
    $.ajax({
        url: "rockbands.json",
        type: "GET",
        success: function (res) {
            $("#thirdList").css("display", "none");
            $("#secondlist option").remove();
            $("#secondlist").css("display", "block");
            for (var key in res) {
                if(key ==  $("#firstList option:selected").text() ){
                    for(var i=0; i<res[key].length; i++){
                        $("#secondlist").append("<option>" + res[key][i].name + "</option");
                    }
                }
            }
        },
    })
})
$("#secondlist").change(function(){
    $.ajax({
        url: "rockbands.json",
        type: "GET",
        success: function (res) {
            $("#thirdList option").remove();
            $("#thirdList").css("display", "block");
            for (var key in res) {
                for(var i=0; i<res[key].length; i++){
                    if(res[key][i].name == $("#secondlist option:selected").text()){
                        $("#thirdList").append("<option>" + res[key][i].value + "</option");
                    };
                }
            }
        },
    })
})
$("#thirdList").click(function(){
    var url = $("#thirdList option:selected").text();
    window.open(url);
})