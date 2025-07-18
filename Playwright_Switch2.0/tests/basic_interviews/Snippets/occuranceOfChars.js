// Function to count the occurrence of each character in a string
function countOccurance(str) {
    const charCount = {};

    for (let char of str) {
        // If the character already exists in the object, increment the count
        if (charCount[char]) {
            charCount[char]++;
        } else {
            // Otherwise, initialize it to 1
            charCount[char] = 1;
        }
    }

    return charCount;
}

// Sample input string
const str = "i love globallogic culture";

// Call the function and store the result
const charOcc = countOccurance(str);

// Output the character count
console.log(charOcc);
