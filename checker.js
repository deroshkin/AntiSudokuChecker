function verify() {
    document.getElementById("problems").innerHTML = "";
    document.getElementById("success").setAttribute("style", "display: none;");
    document.getElementById("failure").setAttribute("style", "display: none;");
    if (checkFill()) {
        checkRows();
        checkCols();
        checkBoxes();
        if (document.getElementById("failure").getAttribute("style") == "display: none;") {
            document.getElementById("success").setAttribute("style", "display: block;");
        }
    }
}

function checkFill() {
    const valid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var badCells = [];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (valid.includes(cellValue(r, c)) == false) {
                badCells.push("(" + (r + 1) + "," + (c + 1) + ")");
            }
        }
    }
    if (badCells.length == 0) {
        return true;
    }
    else {
        var error = "Invalid Entries:";
        badCells.forEach(cell => {
            error += " " + cell;
        });
        document.getElementById("problems").innerHTML = error;
        document.getElementById("failure").setAttribute("style", "display: block;");
        return false;
    }
}

function checkRow(r) {
    var counter = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
    for (let c = 0; c < 9; c++) {
        counter[cellValue(r, c)]++;
    }
    var missing = [];
    var repeat = [];
    var extra = [];
    for (let v = 1; v < 10; v++) {
        if (counter[v] == 0) {
            missing.push(v);
        }
        if (counter[v] == 2) {
            repeat.push(v);
        }
        if (counter[v] > 2) {
            extra.push(v);
        }
    }

    if (extra.length > 0) {
        document.getElementById("failure").setAttribute("style", "display: block;");
        var error = "<p>Row " + (r + 1) + " has more than 2 instances of:";
        extra.forEach(val => {
            error += " " + val;
        });
        error += "</p>"
        document.getElementById("problems").innerHTML += error;
    }

    if (missing.length > 1) {
        document.getElementById("failure").setAttribute("style", "display: block;");
        var error = "<p>Row " + (r + 1) + " has more too many missing values:";
        missing.forEach(val => {
            error += " " + val;
        });
        error += "</p>"
        document.getElementById("problems").innerHTML += error;
    }

    if (repeat.length > 1) {
        document.getElementById("failure").setAttribute("style", "display: block;");
        var error = "<p>Row " + (r + 1) + " has too many repeat values:";
        repeat.forEach(val => {
            error += " " + val;
        });
        error += "</p>"
        document.getElementById("problems").innerHTML += error;
    }

    if (missing.length == 0) {
        document.getElementById("failure").setAttribute("style", "display: block;");
        var error = "<p>Row " + (r + 1) + " has no missing or repeat values</p>";
        document.getElementById("problems").innerHTML += error;
    }

    return { "missing": missing, "repeat": repeat };
}

function checkRows() {
    // Step 1: Check where each value is missing/repeated
    var missing = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };
    var repeat = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };
    for (let r = 0; r < 9; r++) {
        var rowData = checkRow(r);

        rowData["missing"].forEach(v => {
            missing[v].push(r);
        });

        rowData["repeat"].forEach(v => {
            repeat[v].push(r);
        });
    }

    // Step 2: Validate each value mssing/repeated once

    for (let v = 1; v < 10; v++) {
        if (missing[v].length == 0) {
            document.getElementById("failure").setAttribute("style", "display: block;");
            var error = "<p>Value " + (v) + " is present in every row</p>";
            document.getElementById("problems").innerHTML += error;
        }
        if (missing[v].length > 1) {
            document.getElementById("failure").setAttribute("style", "display: block;");
            var error = "<p>Value " + (v) + " is missing from more than one row:";
            missing[v].forEach(r => {
                error += " " + (r + 1)
            });
            error += "</p>"
            document.getElementById("problems").innerHTML += error;
        }
        if (repeat[v].length == 0) {
            document.getElementById("failure").setAttribute("style", "display: block;");
            var error = "<p>Value " + (v) + " is not repeated in any row</p>";
            document.getElementById("problems").innerHTML += error;
        }
        if (repeat[v].length > 1) {
            document.getElementById("failure").setAttribute("style", "display: block;");
            var error = "<p>Value " + (v) + " is repeated in more than one row:";
            repeat[v].forEach(r => {
                error += " " + (r + 1)
            });
            error += "</p>"
            document.getElementById("problems").innerHTML += error;
        }
    }
}

function checkCol(c) {
    var counter = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
    for (let r = 0; r < 9; r++) {
        counter[cellValue(r, c)]++;
    }
    var missing = [];
    var repeat = [];
    var extra = [];
    for (let v = 1; v < 10; v++) {
        if (counter[v] == 0) {
            missing.push(v);
        }
        if (counter[v] == 2) {
            repeat.push(v);
        }
        if (counter[v] > 2) {
            extra.push(v);
        }
    }

    if (extra.length > 0) {
        document.getElementById("failure").setAttribute("style", "display: block;");
        var error = "<p>Column " + (c + 1) + " has more than 2 instances of:";
        extra.forEach(val => {
            error += " " + val;
        });
        error += "</p>"
        document.getElementById("problems").innerHTML += error;
    }

    if (missing.length > 1) {
        document.getElementById("failure").setAttribute("style", "display: block;");
        var error = "<p>Column " + (c + 1) + " has more too many missing values:";
        missing.forEach(val => {
            error += " " + val;
        });
        error += "</p>"
        document.getElementById("problems").innerHTML += error;
    }

    if (repeat.length > 1) {
        document.getElementById("failure").setAttribute("style", "display: block;");
        var error = "<p>Column " + (c + 1) + " has too many repeat values:";
        repeat.forEach(val => {
            error += " " + val;
        });
        error += "</p>"
        document.getElementById("problems").innerHTML += error;
    }

    if (missing.length == 0) {
        document.getElementById("failure").setAttribute("style", "display: block;");
        var error = "<p>Column " + (c + 1) + " has no missing or repeat values</p>";
        document.getElementById("problems").innerHTML += error;
    }

    return { "missing": missing, "repeat": repeat };
}

function checkCols() {
    // Step 1: Check where each value is missing/repeated
    var missing = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };
    var repeat = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };
    for (let c = 0; c < 9; c++) {
        var colData = checkCol(c);

        colData["missing"].forEach(v => {
            missing[v].push(c);
        });

        colData["repeat"].forEach(v => {
            repeat[v].push(c);
        });
    }

    // Step 2: Validate each value mssing/repeated once

    for (let v = 1; v < 10; v++) {
        if (missing[v].length == 0) {
            document.getElementById("failure").setAttribute("style", "display: block;");
            var error = "<p>Value " + (v) + " is present in every column</p>";
            document.getElementById("problems").innerHTML += error;
        }
        if (missing[v].length > 1) {
            document.getElementById("failure").setAttribute("style", "display: block;");
            var error = "<p>Value " + (v) + " is missing from more than one column:";
            missing[v].forEach(c => {
                error += " " + (c + 1)
            });
            error += "</p>"
            document.getElementById("problems").innerHTML += error;
        }
        if (repeat[v].length == 0) {
            document.getElementById("failure").setAttribute("style", "display: block;");
            var error = "<p>Value " + (v) + " is not repeated in any column</p>";
            document.getElementById("problems").innerHTML += error;
        }
        if (repeat[v].length > 1) {
            document.getElementById("failure").setAttribute("style", "display: block;");
            var error = "<p>Value " + (v) + " is repeated in more than one column:";
            repeat[v].forEach(c => {
                error += " " + (c + 1)
            });
            error += "</p>"
            document.getElementById("problems").innerHTML += error;
        }
    }
}

function checkBox(b) {
    var counter = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
    for (let k = 0; k < 9; k++) {
        counter[cellValue(3*~~(b/3) + ~~(k/3), 3*(b%3) + (k%3))]++;
    }
    var missing = [];
    var repeat = [];
    var extra = [];
    for (let v = 1; v < 10; v++) {
        if (counter[v] == 0) {
            missing.push(v);
        }
        if (counter[v] == 2) {
            repeat.push(v);
        }
        if (counter[v] > 2) {
            extra.push(v);
        }
    }

    if (extra.length > 0) {
        document.getElementById("failure").setAttribute("style", "display: block;");
        var error = "<p>Box " + (b + 1) + " has more than 2 instances of:";
        extra.forEach(val => {
            error += " " + val;
        });
        error += "</p>"
        document.getElementById("problems").innerHTML += error;
    }

    if (missing.length > 1) {
        document.getElementById("failure").setAttribute("style", "display: block;");
        var error = "<p>Box " + (b + 1) + " has more too many missing values:";
        missing.forEach(val => {
            error += " " + val;
        });
        error += "</p>"
        document.getElementById("problems").innerHTML += error;
    }

    if (repeat.length > 1) {
        document.getElementById("failure").setAttribute("style", "display: block;");
        var error = "<p>Box " + (b + 1) + " has too many repeat values:";
        repeat.forEach(val => {
            error += " " + val;
        });
        error += "</p>"
        document.getElementById("problems").innerHTML += error;
    }

    if (missing.length == 0) {
        document.getElementById("failure").setAttribute("style", "display: block;");
        var error = "<p>Box " + (b + 1) + " has no missing or repeat values</p>";
        document.getElementById("problems").innerHTML += error;
    }

    return { "missing": missing, "repeat": repeat };
}

function checkBoxes() {
    // Step 1: Check where each value is missing/repeated
    var missing = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };
    var repeat = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };
    for (let b = 0; b < 9; b++) {
        var boxData = checkBox(b);

        boxData["missing"].forEach(v => {
            missing[v].push(b);
        });

        boxData["repeat"].forEach(v => {
            repeat[v].push(b);
        });
    }

    // Step 2: Validate each value mssing/repeated once

    for (let v = 1; v < 10; v++) {
        if (missing[v].length == 0) {
            document.getElementById("failure").setAttribute("style", "display: block;");
            var error = "<p>Value " + (v) + " is present in every box</p>";
            document.getElementById("problems").innerHTML += error;
        }
        if (missing[v].length > 1) {
            document.getElementById("failure").setAttribute("style", "display: block;");
            var error = "<p>Value " + (v) + " is missing from more than one box:";
            missing[v].forEach(b => {
                error += " " + (b + 1)
            });
            error += "</p>"
            document.getElementById("problems").innerHTML += error;
        }
        if (repeat[v].length == 0) {
            document.getElementById("failure").setAttribute("style", "display: block;");
            var error = "<p>Value " + (v) + " is not repeated in any box</p>";
            document.getElementById("problems").innerHTML += error;
        }
        if (repeat[v].length > 1) {
            document.getElementById("failure").setAttribute("style", "display: block;");
            var error = "<p>Value " + (v) + " is repeated in more than one box:";
            repeat[v].forEach(b => {
                error += " " + (b + 1)
            });
            error += "</p>"
            document.getElementById("problems").innerHTML += error;
        }
    }
}

function cellValue(row, col) {
    return parseInt(document.getElementById("cell-" + (row * 9 + col)).value, 10);
}