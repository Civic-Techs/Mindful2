const participants = require('../db/models/participants');

exports.addParticipant = async (req, res) => {
  try {
    const { user_id, challenge_id } = req.body;

    // check the felids for population
    if (!user_id || !challenge_id) {
      return res
        .status(400)
        .send({ message: 'User ID and Challenge ID are required' });
    }

    // Check if the user is already a participant
    const existingParticipant = await participants.find({
      user_id,
      challenge_id,
    });
    if (existingParticipant) {
      return res.status(400).send({ message: 'User is already a participant' });
    }
    // Create a new participant
    const newParticipant = await participants.create({ user_id, challenge_id });

    // Send the new participant back in the response
    res.status(201).send(newParticipant);
  } catch (error) {
    console.error('Error adding participant: ', error);
    res
      .status(500)
      .send({ message: 'An error occurred while adding the participant' });
  }
};
