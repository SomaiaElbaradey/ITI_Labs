function CustomObj(name, id, location) {
    this.name = name;
    this.id = id;
    this.location = location;
}

CustomObj.prototype.getSetGen = function () {
     for (key in this) {
            // console.log(this);
            // console.log(key);
            // console.log(this[key]);
            // console.log(typeof(this[key]));
        if(typeof(this[key])!='function')
        {
            this["set"+key] = function(value) {
                this[key] = value;
            }
            this["get"+key] = function(){
                return this[key];
            }
        }
     }
}

// function CustomObj(name, id, location) {
//     this.name = name;
//     this.id = id;
//     this.location = location;
//     this.getSetGen = function () {
//         for (var key in this) {
//             if (typeof (this[key]) != 'function') {
//                 console.log(this[key]);
//                 this["set"+key] = function(value){
//                     this[key] = value;
//                 }
//             }
//         }
//     }
// }

var user = {
    name: "Maha",
    age: 25,
}
var obj = new CustomObj("nlk", 4, "sdds");
obj.getSetGen.call(user);
console.log(obj);