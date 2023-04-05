const { Schema, Types } = require('mongoose');

// defines reaction schema without creating a model for it
const reactionSchema = new Schema(
  {
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: format },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

function format(rawDate) {
    return rawDate.toString();
}

module.exports = reactionSchema;