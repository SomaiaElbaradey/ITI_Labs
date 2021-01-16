async function displayMyData() {
    const url = "https://jsonplaceholder.typicode.com/users"
    fetch(url, { method: 'GET' })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            $(document).ready(function () {
                $("div#tabs").tabs();
                $(data).each(function (index, personObject) {
                    $("#masterUl").append("<li><a href='#tabs-" + eval(index + 1) + "'>" + personObject.name + "</a></li>");
                    $("div#tabs").append("<div id='tabs-" + eval(index + 1) + "'></div>");
                    $.each(personObject, function (key, value) {
                        if (key == 'address') {
                            $("#tabs-" + eval(index + 1)).append('<li><b>' + key + '</b>: ' + '<ul id="secondUl-' + eval(index + 1) + '"></ul>' + '</li>');
                            $.each(value, function (secondkey, secondvalue) {
                                if (secondkey == 'geo') {
                                    $("#secondUl-" + eval(index + 1)).append('<li><b>' + secondkey + '</b>: ' + '<ul id="thirdUl-' + eval(index + 1) + '"></ul>' + '</li>');
                                    $.each(secondvalue, function (thirdkey, thirdvalue) {

                                        $("#thirdUl-" + eval(index + 1)).append('<li><b>' + thirdkey + '</b>: ' + thirdvalue + '</li>');
                                    })
                                }
                                else {
                                    $("#secondUl-" + eval(index + 1)).append('<li><b>' + secondkey + '</b>: ' + secondvalue + '</li>');
                                }
                            })
                        }
                        else if (key == 'company') {
                            $("#tabs-" + eval(index + 1)).append('<li><b> ' + key + '</b>: ' + '<ul id="forthUl-' + eval(index + 1) + '"></ul>' + '</li>');
                            $.each(value, function (secondkey, secondvalue) {

                                $("#forthUl-" + eval(index + 1)).append('<li><b>' + secondkey + '</b>: ' + secondvalue + '</li>');
                                $("div#tabs").tabs("refresh");
                            })
                        }
                        else if (key == 'name') {

                        }
                        else {
                            $("#tabs-" + eval(index + 1)).append('<li><b>' + key + '</b>: ' + value + '</li>');
                        }
                        $("div#tabs").tabs("refresh");
                    });

                    $('a[href="#tabs-1"]').click();
                });
            })
            console.log('success')
        })

        .catch((err) => {
            throw err
        })
}

displayMyData()