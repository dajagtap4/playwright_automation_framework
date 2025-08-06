// Print second largest number

let arr = [1, 4, 3, 5, 2];
let largest = Number.MIN_SAFE_INTEGER;
let secLargest = Number.MIN_SAFE_INTEGER;

for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
        secLargest = largest;
        largest = arr[i];
    } else if (arr[i] > secLargest && arr[i] !== largest) {
        secLargest = arr[i];
    }
}

console.log("Second largest number is:", secLargest);
