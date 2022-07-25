const socket = io()

const noteForm = document.querySelector("#noteForm")
const notesList = document.querySelector("#notes")
const title = document.querySelector("#title")
const description = document.querySelector("#description")
let savedId = ""


///////////agrega una nota a la lista instantaneamente/////////////
socket.on("loadNotes", (data) => {
    appendNote(data)
});
const appendNote = note => {
    notesList.append(noteUI(note))
}

///////////udpate notes/////////////
socket.on("server:selectednote", (selectednote) => {
    const fillForm = (note) => {
        title.value = note.title;
        description.value = note.description
        savedId = note._id
    }
    fillForm(selectednote)
})

const udpateNote = (id, title, description) => {
    socket.emit("client:udpatenote", {
        _id: id,
        title,
        description,
    });
};


///////////listo las notas traidas del servidor/////////////
socket.on("notesFounded", (data) => {
    renderNotes(data)
});

///////////personalizar cada nota/////////////
const noteUI = note => {
    const div = document.createElement("div")
    div.innerHTML = `
        <div class= "card card-body rounded-0 mb-2 animate__animated animate__fadeInUp">
            <div class= "d-flex justify-content-between">
                <h1>${note.title}</h1>
            <div>
                <button class="btn btn-sm btn-danger delete" data-id=${note._id}>Delete</button>
                <button class="btn btn-sm btn-secondary update" data-id=${note._id}>Update</button>
            </div>
            </div>
            <p>${note.description}</p>
        </div>
    `
    const btnDelete = div.querySelector(".delete")
    const btnUdpate = div.querySelector(".update")

    btnDelete.addEventListener("click", (e) => {
        e.preventDefault()
        const deleteNote = id => {
            socket.emit("cliente:deletenote", id)
        }
        deleteNote(btnDelete.dataset.id)
    })
    btnUdpate.addEventListener("click", (e) => {
        const updateNote = id => {
            socket.emit("cliente:getnote", id)
            // console.log(btnUdpate.dataset.id)
        }
        updateNote(btnUdpate.dataset.id)
    })

    return div
}


const renderNotes = notes => {
    notesList.innerHTML = ""
    notes.forEach(note => notesList.append(noteUI(note)));
};

///////////envio una nota al server y la guardo/////////////
const setNotes = (title, description) => {
    socket.emit("newNote", {
        title,
        description
    })
}

noteForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (savedId) {
        udpateNote(savedId, title.value, description.value)
    } else {
        setNotes(
            title.value,
            description.value)
    }

    savedId = ""
    title.value = "";
    description.value = "";
})






