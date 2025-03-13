// helper fuction to randomize the iterable:
const randomizer = (arr) => {
    if (!arr || arr.length === 0) {
        throw new Error("Array is empty or undefined");
    }
    return arr[Math.floor(Math.random() * arr.length)];
}

// module.exports is an old school way of exporting and importing modules / scripts
// the more modern way would be to use ES modules with "type":module in package.json
module.exports = {
    randomizer,
};