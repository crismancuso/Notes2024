
const inputNote = document.getElementById("inputNote");
const buttonAdd = document.getElementById("btnAdd");
const ContainerDiv = document.getElementById("divContainer");

// array where we insert all Notes
let arrayNotes = [];
let id = 0;

//create the class
class allNote {
  constructor(id, note, time) {
    this.id = id;
    this.note = note;
    this.time = time;
  }
}

//addEventListener -------------------------------------------------------------------------------------
buttonAdd.addEventListener("click", addNewNote);

//Function -------------------------------------------------------------------------------------
function addNewNote() {
  let inputValue = inputNote.value;

  //we get the text in the input
  if (inputValue === "") {
    alert("insert a note.");
  } else {
    //we want to get the time
    const horaActual = new Date();

    // obtain hour, minutes y seconds
    let horas = horaActual.getHours();
    let minutos = horaActual.getMinutes();
    let segundos = horaActual.getSeconds();

    // If we need to add 0 from left, this code do it.
    horas = horas < 10 ? "0" + horas : horas;
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    // Formatear la hora como "00:00:00"
    const hourFinal = `${horas}:${minutos}:${segundos}`;

    //each click create a new
    const newBarra = new allNote(id, inputValue, hourFinal);
    arrayNotes.push(newBarra);

    //icrement id
    id++;

    //back the input to empty
    inputNote.value = "";

    console.log(arrayNotes);

    // Limpiar el contenedor antes de agregar las nuevas notas
    ContainerDiv.innerHTML = "";

    //bucle for the elements in the array
    for (const currentNote of arrayNotes) {
      const Barra = document.createElement("div");
      Barra.classList.add(
        "grid",
        "w-full",
        "h-auto",
        "grid-cols-3",
        "justify-content-center",
        "text-center",
        "py-2"
      );

      //const noteDiv = document.createElement("div");
      const pNoteDiv = document.createElement("p");
      pNoteDiv.textContent = currentNote.note;
      pNoteDiv.classList.add("text-base", "text-center");
      //noteDiv.appendChild(pNoteDiv);

      //const timeDiv = document.createElement("div");
      const pTimeDiv = document.createElement("p");
      pTimeDiv.textContent = currentNote.time;
      pTimeDiv.classList.add("text-base", "text-center");
      //timeDiv.appendChild(pTimeDiv);

      const toolsDiv = document.createElement("div");
      toolsDiv.classList.add(
        "flex",
        "flex-row",
        "gap-5",
        "justify-center",
        "items-center"
      );

      // create buttons for each note
      const buttonToolsEdit = document.createElement("button");
      const buttonToolsX = document.createElement("button");
      buttonToolsEdit.textContent = "Edit";
      buttonToolsX.textContent = "X";
      buttonToolsEdit.classList.add("text-base", "text-center");
      buttonToolsX.classList.add("text-base", "text-center", "text-red-400");


        //Function in the buttons;
      buttonToolsEdit.addEventListener("click", () => editNote(currentNote.id));
      buttonToolsX.addEventListener("click", () => deleteNote(currentNote.id));

      toolsDiv.appendChild(buttonToolsEdit);
      toolsDiv.appendChild(buttonToolsX);

      Barra.appendChild(pNoteDiv);
      Barra.appendChild(pTimeDiv);
      Barra.appendChild(toolsDiv);

      ContainerDiv.appendChild(Barra);
    }
  }
}

function deleteNote(noteId) {
  //Find the index of the note with the given ID
 const indexToDelete = arrayNotes.findIndex((note) => note.id === noteId);

 if (indexToDelete !== -1) {
   // Remove the note from the array
   arrayNotes.splice(indexToDelete, 1);

   // Remove the corresponding div from the DOM
   ContainerDiv.removeChild(ContainerDiv.children[indexToDelete]);
  }
}
  
  function editNote(noteId) {

     // Find the index of the note with the given ID
    const indexToEdit = arrayNotes.findIndex((note) => note.id === noteId);

    if (indexToEdit !== -1) {
    // Prompt the user to enter the new note content
    const newNoteContent = prompt('Edit your note:', arrayNotes[indexToEdit].note);

    // Check if the user clicked "Cancel" or entered an empty note
    if (newNoteContent === null || newNoteContent.trim() === '') {
      return; // Cancel the edit if no input or empty input
    }

    // Update the note in the array
    arrayNotes[indexToEdit].note = newNoteContent;

    // Update the note content in the DOM
    ContainerDiv.children[indexToEdit].children[0].textContent = arrayNotes[indexToEdit].note;
   
  }
}


