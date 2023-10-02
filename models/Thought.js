/**
 * thoughtText

String
Required
Must be between 1 and 280 characters
createdAt

Date
Set default value to the current timestamp
Use a getter method to format the timestamp on query
username (The user that created this thought)

String
Required
reactions (These are like replies)

Array of nested documents created with the reactionSchema
 */
const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    reactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reactions",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Thought = mongoose.model("thoughts", thoughtSchema);
module.exports = Thought;
