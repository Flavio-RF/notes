const socketIO = require('socket.io');
const Note = require("./src/models/Note")

// async function storeNotes(data) {
//     const note = await Note.create({
//         title: data.title,
//         description: data.description
//     })
//     const notes = await note
//     return notes
// }


// async function updateNotes(upData) {
//     const upNote = await Note.findOneAndUpdate({},
//         { ...req.body })
//     console.log("nota actualizada", upNote)

//     const upNotes = await upNote
//     return upNotes
// }

// async function destroyNote(id) {
//     const delNotes = 
//     console.log("nota eliminada", delNotes)

//     const delNote = await delNotes
//     return delNote
// }

module.exports = (server) => {
    const io = socketIO(server);
    io.on("connection", (socket) => {

        socket.on("newNote", async (data) => {
            try {
                const note = await Note.create({
                    title: data.title,
                    description: data.description
                });
                const notes = await note
                io.emit("loadNotes", notes, "nota guardada")
            }
            catch (error) {
                io.emit("new-message-error", error)
            }
        })
        async function findNote() {
            const readNotes = await Note.find()
            io.emit("notesFounded", readNotes)
        }
        findNote()

        socket.on("cliente:getnote", async (getData) => {
            try {
                const note = await Note.findById(getData)
                io.emit("server:selectednote", note)
            } catch (error) {
                io.emit("new-message-error", error)
            }
        })
        socket.on("client:udpatenote", async (updatedNote) => {
            await Note.findByIdAndUpdate(updatedNote._id, {
                title: updatedNote.title,
                description: updatedNote.description
            })
            findNote();
            // const upNotes = await updateNotes(upData)
            // console.log("nota actualizada enviada", upNotes)
        })

        socket.on("cliente:deletenote", async (id) => {
            try {
                console.log(id)
                await Note.findOneAndDelete(id)
                findNote()

            } catch (error) {
                io.emit("new-message-error", error)

            }
        })
    })
}


