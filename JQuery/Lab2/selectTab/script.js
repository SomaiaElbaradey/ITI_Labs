var posts = $(".posts");
$(document).ready(function () {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users", success: function (result) {
            for (var i = 0; i < result.length; i++) {
                var li = $('<li></li>');
                li.html('<a class="users" href="#" id=' + result[i].id + '>' + result[i].name + '</a>');
                $("#myList").append(li);
            }
            $.ajax({
                url: "https://jsonplaceholder.typicode.com/posts?userId=1", success: function (result) {
                    for (var i = 1; i < result.length; i++) {
                        var post = $('<li></li>');
                        post.html(result[i].title);
                        $("#myPosts").append(post);
                    }
                }
            });
            $('a').click(function (e) {
                $.ajax({
                    url: "https://jsonplaceholder.typicode.com/posts?userId=" + $(e.target)[0].id, success: function (result) {
                        $("#myPosts li").remove();
                        for (var i = 1; i < result.length; i++) {
                            var post = $('<li></li>');
                            post.html(result[i].title);
                            $("#myPosts").append(post);
                        }
                    }
                });
            })
        }
    });
});