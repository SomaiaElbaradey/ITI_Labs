var isPalindrome = true;
var word = prompt("Enter your word");
var check = confirm("Do you wanna consider case sensitivity in your check? press OK for yes and Cancel for no.");
var len = word.length;

if (check == false) {
    word = word.toUpperCase(word);
}

for (var i = 0; i < len / 2; i++) {
    if (word[i] !== word[len - 1 - i]) {
        isPalindrome = false;
    }
}

if (isPalindrome == true) {
    alert("your word is palindrome");

} else {
    alert("your word is not a palindrome");
}