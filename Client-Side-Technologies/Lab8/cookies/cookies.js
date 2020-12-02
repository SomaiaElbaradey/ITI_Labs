
function splitCookie() {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split("=");
    }
    return arr;
}
//get cookie by name
function getCookie(keyName) {
    var cookies = splitCookie();
    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i][0] == keyName) {
            return cookies[i][1];
        }
    }

    return "the cookie you want to get is not existed!";
}
//set new cookie
function setCookie(cookieName, cookieValue, expiryDate) {
    document.cookie = cookieName + "=" + cookieValue + ";" + "expires=" + expiryDate;
}
function deleteCookie(cookieName) {
    var found = 0;
    var cookies = splitCookie();
    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i][0] == cookieName) {
            var date = new Date(2013, 11, 11);
            document.cookie = cookieName + "=null" + ";" + "expires=" + date;
            found = 1;
        }
    }
    if (found == 0) {
        console.error('the cookie you wanted to delete is not existed');
    }
}
//view all cookies
function allCookieList() {
    var cookies = splitCookie();
    console.log("the stored cookies are:")
    for (var i = 0; i < cookies.length; i++) {
        console.log(i + 1 + ": " + cookies[i][0]);
    }
}
//has cookie?
function hasCookie(cookieName) {
    var cookies = splitCookie();
    for (var i = 0; i < cookies.length; i++) {
        if (cookies[i][0] == cookieName) {
            return true;
        }
    }
    return false;
}