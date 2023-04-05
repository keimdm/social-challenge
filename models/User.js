const { Schema, model } = require('mongoose');

// defines user schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    // validates email format
    email: { type: String, required: true, unique: true, trim: true, match: /.+\@.+\..+/, },
    // defines list of thought and friend IDs linked to relevant objects
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// friend count returns length of friends array
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
