/* eslint-disable comma-dangle */
const Participant = require('../models/Participant');
// const participant = require('../models/Participant');
const User = require('../models/User');

exports.addParticipant = async (req, res) => {
  try {
    const { user_id, challenge_id } = req.body;
    console.log(req.body);

    // check the felids for population
    if (!user_id || !challenge_id) {
      console.log(user_id, challenge_id);
      return res
        .status(400)
        .send({ message: 'User ID and Challenge ID are required' });
    }

    // Check if the user is already a participant
    // const existingParticipant = await Participant.find({
    //   user_id,
    //   challenge_id,
    // });
    // if (existingParticipant) {
    //   return res.status(400).send({ message: 'User is already a participant' });
    // }
    // Create a new participant
    const newParticipant = await Participant.create({ user_id, challenge_id });

    // Send the new participant back in the response
    res.status(201).send(newParticipant);
  } catch (error) {
    console.error('Error adding participant: ', error);
    res
      .status(500)
      .send({ message: 'An error occurred while adding the participant' });
  }
};

exports.getParticipantById = async (req, res) => {
  try {
    const { user_id } = req.query;

    // Check if the user ID is provided
    if (!user_id) {
      return res.status(400).send({ message: 'User ID is missing' });
    }

    // get the participant by user ID
    const participantData = await Participant.findByUser(user_id);

    // Check if the participant exists
    if (!participantData) {
      return res.status(404).send({ message: 'Participant not found' });
    }

    // Send the participant data back in the response
    res.status(200).send(participantData);
  } catch (error) {
    console.error('Error fetching participant: ', error);
    res
      .status(500)
      .send({ message: 'An error occurred while fetching the participant' });
  }
};

exports.getChallengeTitlesByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.find(id);
    console.log(id);
    if (!user) {
      return res.status(400).send({ message: 'User ID is missing' });
    }

    const challengeTitles = await Participant.getChallengeTitlesByUserId(id);

    if (!challengeTitles || challengeTitles.length === 0) {
      return res
        .status(404)
        .send({ message: 'No challenges found for this user' });
    }

    res.status(200).send(challengeTitles);
  } catch (error) {
    console.error('Error fetching challenge titles: ', error);
    res
      .status(500)
      .send({ message: 'An error occurred while fetching challenge titles' });
  }
};
