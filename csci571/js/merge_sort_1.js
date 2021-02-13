// merge two sorted subarrays into a single sorted array

function merge(left, right) {
    let arr = [];
    //break out of loop if one array gets empty
    while (left.length && right.length) {
        // pick the smaller of the smallest elements of the left and right arrs
        if (left[0] < right[0]) {
            arr.push(left.shift());   // pop the first elem of left and append to arr
        } else {
            arr.push(right.shift());
        }
    }

    // concat whats left
    // "..." means to pass in the indivi elems of the arr
    return [...arr, ...left, ...right]
}

function mergeSort(array) {
    const half = array.length / 2;

    // if only 1 elem in the arr
    if (array.length < 2) {
        return array
    } 

    const left = array.splice(0, half);   // left array
    return merge(mergeSort(left), mergeSort(array))
}

let myarray = [4, 8, 7, 2, 11, 1, 3];
console.log(mergeSort(myarray));