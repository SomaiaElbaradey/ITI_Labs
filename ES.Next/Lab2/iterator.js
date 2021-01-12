let object = {
    name: "somaia",
    age: 23
}

object[Symbol.iterator] = function createEventIterator(){
    let i = 0, key, value;
    let keyIt = Object.keys(object);
    let it = {
        next: function(){
            if(i < keyIt.length){
                key = Object.keys(object)[i];
                value = Object.values(object)[i];
                i++;
                return{
                    value: {
                        key,
                        value
                    },
                    done: false
                }
            }
                return{
                    value: undefined,
                    done: true
                }
        }
    }
    return it;
}

for (let element of object){
    console.log(element)
}
