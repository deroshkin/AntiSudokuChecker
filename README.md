# AntiSudokuChecker

This is a small html app for checking the validity of anti-sudoku solutions. Try it online at [github.io](https://deroshkin.github.io/AntiSudokuChecker/main.html).

# Rules of Anti-Sudoku

* Each row, column and box has **exactly** one digit repeated twice (equivalently 1 missing digit)
* No two rows share a repeat digit nor a missing digit (e.g. if row 1 has 2 2s and 0 9s, then no other row may have more than one 2, and all other rows must have at least one 9). Similarly for columns and boxes.

# App output

This app will either display a green "Looks Good!" message if the grid is filled correctly or a red "Sorry, but no" if there are problems.

If there are invalid (including empty) cells in the grid, the error message will be followed by a list of invalid cells.

If all cells are valid, but there are mistakes, the app will list them. Possible mistakes are:

* Row/Column/Box # has more than 2 instances of: {digit(s) repeated 3 or mroe times}
* Row/Column/Box # has too many missing values: {missing digits}
* Row/Column/Box # has no missing or repeat values
* Value {digit} is not repeated in any row/column/box
* Value {digit} is present in every row/column/box
* Value {digit} is repeated in more than one row/column/box: {rows/columns/boxes where it is repeated}
* Value {digit} is missing from more than one row/column/box: {rows/columns/boxes from which it is missing}