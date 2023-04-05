const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
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

  updateThought(req, res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, { thoughtText: req.body.thoughtText }, { new: true})
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({_id: req.params.thoughtId})
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.status(500).json(err));
  },
};
