const socket = io()

const noteForm = document.getElementById("noteForm")

const getNotes = (title, description) => {
    socket.on("loadNotes", ({ title, description }) => {
        console.log({ title, description })
    });
}

const setNotes = (title, description) => {
    socket.emit("newNote", {
        title,
        description
    })
}

noteForm.addEventListener('submit', (event) => {
    event.preventDefault()
    setNotes(
        noteForm["title"].value,
        noteForm["description"].value)
})

