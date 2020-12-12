navigator.geolocation.getCurrentPosition(function (pos) {
    initMap(pos.coords);
}, function (err) {
    alert(err.message);
})

function initMap(coords) {
    const myLatLng = { lat: coords.latitude, lng: coords.longitude };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: myLatLng,
    });
    new google.maps.Marker({
        position: myLatLng,
        map,
        title: "your location!",
    });
}