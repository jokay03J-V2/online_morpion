export function generateTiles(cols: number, rows: number) {
    let result: null[][] = [];
    for (let iCols = 0; iCols < cols; iCols++) {
        let rowsRes: null[] = [];
        for (let iRows = 0; iRows < rows; iRows++) {
            rowsRes.push(null);
        }
        result.push(rowsRes);
    }

    return result;
}