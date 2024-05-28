// https://bigfrontend.dev/problem/can-you-shuffle-an-array


// This is a JavaScript coding problem from BFE.dev

/**
 * @param {any[]} arr
 * @returns {void}
 */
function shuffle(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        const j = i + Math.floor(Math.random() * (arr.length - i));
        swap(arr, i, j);
    }
}

function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
