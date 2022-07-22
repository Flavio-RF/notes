const socketIO = require('socket.io');
const Note = require("./src/models/Note")

const storeNotes = async (data) => {
    let note = await Note.create({
        title: data.title,
        description: data.descroption
    })
    console.log("nota guardada", note)
}

module.exports = (server) => {
    const io = socketIO(server);
    io.on("connection", (socket) => {

        const emitNotes = async () => {
            const notes = await Note.find({})
            io.emit("loadNotes", notes)
            console.log(notes)
        }
        emitNotes()

        socket.on("newNote", async (data) => {
            try {
                let saveNote = await storeNotes(data)
                io.emit("loadNotes", saveNote);
                console.log(saveNote)
            }
            catch (error) {
                io.emit("new-message-error", error)
            }
        }
        )
    })


}

