let reversed = false;
function compAlpha(el1, el2) {
    // Compare the lowercase letter value of the two elements
    // Returns boolean if they should switch
    return (el1.innerHTML.toLowerCase() > el2.innerHTML.toLowerCase());
}

function compTraveled(el1, el2) {
    return (el1.dataset.traveled === "False" && el2.dataset.traveled ==="True");
}


function sortList(sortingFunction) {
    let list, i, switching, b, shouldSwitch;
    list = document.getElementById("list");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName("LI");
        // Loop through all list-items:
        for (i = 0; i < (b.length - 1); i++) {
            // start by saying there should be no switching:
            shouldSwitch = false;
            /* check if the next item should
            switch place with the current item: */
            if (reversed) {
                shouldSwitch = sortingFunction(b[i + 1], b[i]);
            } else {
                shouldSwitch = sortingFunction(b[i], b[i + 1]);
            }
            if (shouldSwitch) { break; }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark the switch as done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
        }
    }
}
let activeButton = "";
function clickManager(id) {
    // Manages the reversing of the list.
    // Each button needs an ID.
    // If the same button is clicked, then the list order is reversed
    // If a new button is clicked, then the list is sorted not reversed
    if (id !== activeButton) {
        reversed = false;
    } else {
        reversed = !reversed;
    }
    activeButton = id;
}

function sortAlpha() {
    // Sorts the list alphabetically
    clickManager("sort-alpha-button");
    sortList(compAlpha);
}

function sortTraveled() {
    // Sorts by if dataset.traveled
    // Toggles to sorting true or false at top based button number of timed clicked
    clickManager("sort-traveled-button");
    sortList(compTraveled);
}


