// create a dynamic object using Proxy such that it has only the following properties
// 1. name property that accepts only string of 7 characters
// 2. address property that accepts only string value
// 3. age property that accepts numerical value between 25 and 60

let obj = {
    userName: 'Somaia',
    age: '23',
    address: 'ismailia'
}

let handler = {
    set: function (target, prop, value) {
        if (prop === 'userName') {
            if (value.length > 7)
                throw 'you eceeded the Max value';
            target[prop] = value;
        }
        if (prop === 'address') {
            if (typeof (value) !== 'string')
                throw 'address must be string value';
            target[prop] = value;
        }
        if (prop === 'age') {
            if (typeof (value) != 'number')
                throw 'age must be numerical value';
            if (value > 60 || value < 25)
                throw 'age value must be between 25 and 60';
            target[prop] = value;
        }
    },

    get: function (target, prop) {
        return target[prop];
    }
}

let testProxy = new Proxy(obj, handler);
testProxy.userName = 'Mostafa';
testProxy.age = '89';
testProxy.address = 19;
testProxy.age = 89;
testProxy.userName = 'Mostafa_Mohamed';