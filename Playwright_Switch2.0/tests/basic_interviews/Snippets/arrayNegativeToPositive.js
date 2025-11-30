//how to run - > node arrayNegativeToPositive.js
// Convert negative values in an array to positive values and print the updated array.
//navigate to - > tests\basic_interviews\Snippets>

let arr = [-10, -20, -30, 10, 20, 30, 44, 44, 44, 0, 0];

// Convert negative values to positive
for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) {
        arr[i] = -arr[i];
    }
}

// Print the updated array
console.log(arr.join(" "));

//JAVA CODE FOR THE SAME LOGIC
        // int[] arr = { -10, -20, -30, 10, 20, 30, 44, 44, 44, 0, 0 };

        // // Convert negative values to positive
        // for (int i = 0; i < arr.length; i++) {
        //     if (arr[i] < 0) {
        //         arr[i] = -arr[i];
        //     }
        // }

        // // Print the updated array
        // for (int num : arr) {
        //     System.out.print(num + " ");
        // }