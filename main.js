const addBox = document.querySelector(".add-note"),
popupBox = document.querySelector(".popup"),
close = popupBox.querySelector("header span"),
titleTag = popupBox.querySelector("input"),
discriptionTag = popupBox.querySelector("textarea"),
addNote = popupBox.querySelector("button");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// fetch the note array from the local storage
let notes = JSON.parse(localStorage.getItem("notes") || "[]")

let isUpdated = false, updateId;

//show the popup when adding a new note
addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
})

//close the popups and reset all values
close.addEventListener("click", () => {
  isUpdated = false;
  popupBox.classList.remove("show");
  popupBox.querySelector("header h3").textContent = "Add a new Note"
  addNote.textContent = "Add Note"
  titleTag.value = "";
  discriptionTag.value = "";
})

addNote.addEventListener("click", e => {
  e.preventDefault;

  let noteTitle = titleTag.value,
  noteDiscription = discriptionTag.value,
  noteObj;

  //checl if the user inter title note or discription to create a new note
  if (noteTitle || noteDiscription) {
    let noteDate = new Date(),
    month = months[noteDate.getMonth()],
    day = noteDate.getDay()
    year = noteDate.getFullYear();

    noteObj = {
      title: noteTitle,
      discription: noteDiscription,
      date: `${month} ${day}, ${year}`
    }
  }

  //check if the user want to add a new note or updating note 
  if (!isUpdated) {
    notes.push(noteObj)
  } else {

    //updating the note with updated id
    isUpdated = false;
    notes[updateId] = noteObj;
  }

  //store the note array in the local storage
  localStorage.setItem("notes", JSON.stringify(notes))

  close.click();

  showData();
})


//show the data in the note array
function showData () {
  document.querySelectorAll(".note").forEach(note => note.remove())
  notes.forEach((note, index) => {
    let noteContent = `<div class="note">
                        <h3>${note.title}</h3>
                        <p>${note.discription}</p>
                        <footer>
                          <p class="date">${note.date}</p>
                          <div class="settings">
                            <div class="icon" onclick= showMenu(this)><span>...</span></div>
                            <ul class="menu">
                              <li onclick = "editNote(${index}, '${note.title}', '${note.discription}')">Edit</li>
                              <li onclick = "deleteNote(${index})">Delete</li>
                            </ul>
                          </div>
                        </footer>
                      </div>`
    //insert all note after add box
    addBox.insertAdjacentHTML("afterend", noteContent);
  });
}

showData()

function showMenu(el) {
  //add class to the setting element to show the setting menu
  el.parentElement.querySelector(".menu").classList.add("show")
  
  //close the setting menu if the user click any where in the screen exept the setting menu
  document.addEventListener("click", e => {
    if (e.target.tagName != "SPAN" && document.querySelector(".menu") !== null) {
      document.querySelector(".menu").classList.remove("show")
    }
  })
}

//delete a specific note and update the note array
function deleteNote(noteId) {
  notes.splice(noteId, 1) // delete the note with the specific id from the notes array
  localStorage.setItem("notes", JSON.stringify(notes))

  showData()
}

function editNote(noteId, noteTitle, noteDis) {
  //set isUpdated to unable updated the note with the specific id
  isUpdated = true;
  updateId = noteId;

  //show the popup and change the popup title and button text
  addBox.click();
  popupBox.querySelector("header h3").textContent = "Edit The Note"
  addNote.textContent = "Update Note"

  //save the previous note title and discription to update them
  titleTag.value = noteTitle;
  discriptionTag.value = noteDis;
}