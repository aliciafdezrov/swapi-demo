/**
 * @method compareNumbers
 * @description Defines the sort order
 * @param a The first element for comparison
 * @param b The second element for comparison
 * @param isAscendingSort Boolean which indicates if the sort is ascending or not
 */

function compareNumbers(a: number, b: number, isAscendingSort: boolean): number {
    if (isAscendingSort) {
        return a - b;
    }

    return b - a;
}

/**
 * @method compareString
 * @description Defines the sort order
 * @param a The first element for comparison
 * @param b The second element for comparison
 * @param isAscendingSort Boolean which indicates if the sort is ascending or not
 */

function compareString(a: string, b: string, isAscendingSort: boolean): number {
    if (!isAscendingSort) {
        if (!a) return 1;
        if (!b) return -1;
        if (b.toLowerCase() < a.toLowerCase()) return -1;
        if (b.toLowerCase() > a.toLowerCase()) return 1;
        return 0;
    } else {
        if (!a) return -1;
        if (!b) return 1;
        if (b.toLowerCase() < a.toLowerCase()) return 1;
        if (b.toLowerCase() > a.toLowerCase()) return -1;
        return 0;
    }
}


export function sortDTOListByProp<T>(dataList: Array<T>, sortFilter: string, comparationType: 'string' | 'number', isAscendingSort: boolean = true): Array<T> {
    return dataList.sort(function (a, b) {
        const itemA = a[sortFilter];
        const itemB = b[sortFilter];

        if (comparationType === 'string') {
            return compareString(itemA, itemB, isAscendingSort);
        }

        return compareNumbers(itemA, itemB, isAscendingSort);
    });
}
