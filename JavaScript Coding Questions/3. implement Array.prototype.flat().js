// https://bigfrontend.dev/problem/implement-Array-prototype.flat


// This is a JavaScript coding problem from BFE.dev
/**
 * @param { Array } arr
 * @param { number } depth
 * @returns { Array }
 */

// iteratively
function flat(arr, depth = 1) {
    const stack = [];
    stack.push({
        arr: arr,
        pos: 0
    });
    const resArr = [];
    while (stack.length > 0) {
        const {arr, pos} = stack.pop();
        if (pos >= arr.length) {
            continue;
        }
        const nextItem = arr[pos];
        stack.push({
            arr,
            pos: pos + 1,
        });
        if (Array.isArray(nextItem) && stack.length <= depth) {
            stack.push({
                arr: nextItem,
                pos: 0,
            });
        } else {
            resArr.push(nextItem);
        }
    }
    return resArr;
}

// recursively
/* function flat(arr, depth = 1) {
  if (depth === 0) {
    return arr;
  } else {
    return arr.reduce((accu, currItem) => {
      if (Array.isArray(currItem)) {
        accu.push(...flat(currItem, depth - 1));
      } else {
        accu.push(currItem);
      }
      return accu;
    }, []);
  }
} */


