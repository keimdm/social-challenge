const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// creates thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now, get: format },
    username: { type: String, required: true },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// getter function returns the date as a string
function format(rawDate) {
    return rawDate.toString();
}

// virtual function to get the number of reactions on the post
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;