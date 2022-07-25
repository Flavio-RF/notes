const { Schema, model } = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation"); // Alternativa al ejemplo descripto aquí: https://mongoosejs.com/docs/middleware.html#error-handling-middleware

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 20,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.plugin(beautifyUnique);

const Note = model("Note", noteSchema);

module.exports = Note
