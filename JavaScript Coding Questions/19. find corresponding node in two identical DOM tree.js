// https://bigfrontend.dev/problem/find-corresponding-node-in-two-identical-DOM-tree


/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 */
const findCorrespondingNode = (rootA, rootB, target) => {
    if (rootA === target)
        return rootB;
    for (let i = 0; i <  rootA.children.length; i++) {
        let res = findCorrespondingNode(rootA.children[i], rootB.children[i], target);
        if (res)
            return res;
    }
}