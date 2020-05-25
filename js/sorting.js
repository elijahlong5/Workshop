class Sorter{
  constructor() {
    this.reversed = false;
    this.activeButtonId = null;
    let b = document.getElementsByTagName("button");
    this.buttonIds(b)
  }

  buttonIds(elms) {
    // Ensures that each button has its own ID.
    // Creates a random string id if id === ""
    console.log(elms)
    let s = Sorter.randomString(5);
    console.log(s);
    for (let i = 0; i < elms.length; i++) {
      while( elms[i].id === "") {
        let newId = Sorter.randomString(5);
        if (document.getElementById(newId) === null){
          elms[i].id = newId;
        }
      }
    }
  }

  clickManager(id) {
    // Manages the reversing of the list.
    // Each button needs an ID.
    // If the same button is clicked, then the list order is reversed
    // If a new button is clicked, then the list is sorted not reversed
    if (id !== this.activeButtonId) {
      this.reversed = false;
    } else {
      this.reversed = !this.reversed;
    }
    this.activeButtonId = id;
  }

  static randomString(length) {
    // Generates a random string with input length.
    let r = "";
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      r += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return r;
  }

  static sortList(sortingFunction) {
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
        if (sorter.reversed) {
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
}

const sorter = new Sorter();

function compAlpha(el1, el2) {
    // Compare the lowercase letter value of the two elements
    // Returns boolean if they should switch
    return (el1.innerHTML.toLowerCase() > el2.innerHTML.toLowerCase());
}

function compTraveled(el1, el2) {
    return (el1.dataset.traveled === "False" && el2.dataset.traveled ==="True");
}

function sortAlpha() {
    // Sorts the list alphabetically
    sorter.clickManager("sort-alpha-button");
    Sorter.sortList(compAlpha);
}

function sortTraveled() {
    // Sorts by if dataset.traveled
    // Toggles to sorting true or false at top based button number of timed clicked
    sorter.clickManager("sort-traveled-button");
    Sorter.sortList(compTraveled);
}


