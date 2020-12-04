function CustomObj(name, id, location) {
    this.name = name;
    this.id = id;
    this.location = location;
}
CustomObj.prototype.getSetGen = function () {
    for (key in this) {
        // console.log(this);
        // console.log(this[key]);
        if (typeof (this[key]) != 'function') {
            this["set" + key] = function (value) {
                this[key] = value;
            }
            this["get" + key] = function () {
                return this[key];
            }
        }
    }
}
// Object.defineProperty(CustomObj,"value",{
//     set: function(val){
//         value = val;
//     },
//     get: function(){
//         return value;
//     }
// })
var user = {
    name: "Maha",
    age: 25,
}
var obj = new CustomObj("nlk", 4, "sdds");
obj.getSetGen.call(user);
console.log(obj);