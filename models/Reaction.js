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

const reactionSchema = new mongoose.Schema(
  {
    reactionBody: {
      type: String,
      maximum: 280,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
reactionSchema.virtual("id", {
  reactionId: this.id,
});

const Reaction = mongoose.model("reactions", reactionSchema);
module.exports = Reaction;
