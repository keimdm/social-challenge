const { Thought, User } = require('../models');

module.exports = {
  // returns all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // returns single thought specified by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // creates new thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
          // updates relevant user thoughts array with new thought ID
          { username: thought.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Created the thought')
      )
      .catch((err) => res.status(500).json(err));
  },

  // updates thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, { thoughtText: req.body.thoughtText }, { new: true})
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.status(500).json(err));
  },

  // deletes thought by ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({_id: req.params.thoughtId})
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.status(500).json(err));
  },

  // Adds a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },

  // removes a reaction from a thought by ID
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },
};
