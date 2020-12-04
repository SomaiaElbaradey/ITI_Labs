var myList = document.getElementById("myList");
var posts = document.getElementsByClassName("posts");
var xhr = new XMLHttpRequest();
xhr.open("get", "https://jsonplaceholder.typicode.com/users");
xhr.send();
var firstPost = new XMLHttpRequest();
firstPost.open("get", "https://jsonplaceholder.typicode.com/posts?userId=1");
firstPost.send();
var test = function (item) {
    var userPost = new XMLHttpRequest();
    userPost.open("get", "https://jsonplaceholder.typicode.com/posts?userId=" + item.id);
    userPost.send();
    userPost.addEventListener("readystatechange", function () {
        if (userPost.readyState == 4) {
            var userposts = JSON.parse(userPost.response);
            for (var i = 0; i < 5; i++) {
                posts[i].innerHTML = userposts[i].title;
            }
        }
    })
}
xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState == 4) {
        var userArr = JSON.parse(xhr.response);
        userArr.forEach(function (item) {
            //console.log(item);
            var li = document.createElement("li");
            li.innerHTML = '<a class="users" value=' + item.id + ' href="#">' + item.name + '</a>';
            myList.append(li);
        })
        document.querySelectorAll('.users').forEach(function (item) {
            item.addEventListener('click', function (e) {
                //console.log(e.target.innerText);
                userArr.forEach(function (item) {
                    if (item.name == e.target.innerText) {
                        test(item);
                    }
                })
            })
        })
    }
})
firstPost.addEventListener("readystatechange", function () {
    if (firstPost.readyState == 4) {
        var userposts = JSON.parse(firstPost.response);
        for (var i = 0; i < 5; i++) {
            posts[i].innerHTML = userposts[i].title;
        }
    }
})
