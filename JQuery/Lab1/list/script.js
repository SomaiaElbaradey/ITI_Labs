$('#btn').click(function () {
    var value = $("#task").val();
    if (value != '') {
        var val = $('<br><span class="text">' + value + '</span>').appendTo('#list');
        $('<button class="delete"> Delete </button>').appendTo('#list');
        $('.delete').click(function(){
            $(this).prev().remove();
            $(this).prev().remove();
            this.remove();
        });
    }
})
