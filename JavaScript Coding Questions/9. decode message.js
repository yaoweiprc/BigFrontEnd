// https://bigfrontend.dev/problem/decode-message



// This is a JavaScript coding problem from BFE.dev

/**
 * @param {string[][]} message
 * @return {string}
 */
function decode(message) {
    // your code here
    const ROW = message.length;
    if (ROW === 0)
        return '';
    const COL = message[0].length;
    if (COL === 0)
        return '';
    if (ROW === 1) {
        return message[0][0];
    }
    const resArr = [];
    let currRow = 0;
    let currCol = 0;
    let isCurrDirectionRightBottom = true;
    while (currCol < COL) {
        resArr.push(message[currRow][currCol]);
        const copiedCurrRow = currRow;
        while (currRow === copiedCurrRow) {
            if (isCurrDirectionRightBottom) {
                if (currRow < ROW - 1) {
                    currRow++;
                } else {
                    isCurrDirectionRightBottom = false;
                }
            }
            if (!isCurrDirectionRightBottom) {
                if (currRow > 0) {
                    currRow--;
                } else {
                    isCurrDirectionRightBottom = true;
                }
            }
        }
        currCol++;
    }
    return resArr.join('');
}