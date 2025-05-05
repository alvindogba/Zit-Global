import db from '../models/index.js';

// Controller for managing mentees
const MenteeController = {
  // Create a new mentee
  async createMentee(req, res) {
    try {
      const { user_id, fullName, email, phone, age, gender, mentorshipNeeds, objectives, availability, preferredMentorshipFormat, referral } = req.body;

      const newMentee = await db.Mentee.create({
        user_id,
        fullName,
        email,
        phone,
        age,
        gender,
        mentorshipNeeds,
        objectives,
        availability,
        preferredMentorshipFormat,
        referral,
      });

      res.status(201).json({ message: 'Mentee created successfully', data: newMentee });
    } catch (error) {
      console.error('Error creating mentee:', error);
      res.status(500).json({ error: 'Failed to create mentee' });
    }
  },

  // Get all mentees
  async getAllMentees(req, res) {
    try {
      const mentees = await db.Mentee.findAll();
      res.status(200).json({ data: mentees });
    } catch (error) {
      console.error('Error fetching mentees:', error);
      res.status(500).json({ error: 'Failed to fetch mentees' });
    }
  },

  // Get a single mentee by ID
  async getMenteeById(req, res) {
    try {
      const { id } = req.params;
      const mentee = await db.Mentee.findByPk(id);

      if (!mentee) {
        return res.status(404).json({ error: 'Mentee not found' });
      }

      res.status(200).json({ data: mentee });
    } catch (error) {
      console.error('Error fetching mentee:', error);
      res.status(500).json({ error: 'Failed to fetch mentee' });
    }
  },

  // Update a mentee
  async updateMentee(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const mentee = await db.Mentee.findByPk(id);

      if (!mentee) {
        return res.status(404).json({ error: 'Mentee not found' });
      }

      const updatedMentee = await mentee.update(updates);
      res.status(200).json({ message: 'Mentee updated successfully', data: updatedMentee });
    } catch (error) {
      console.error('Error updating mentee:', error);
      res.status(500).json({ error: 'Failed to update mentee' });
    }
  },

  // Delete a mentee
  async deleteMentee(req, res) {
    try {
      const { id } = req.params;

      const mentee = await db.Mentee.findByPk(id);

      if (!mentee) {
        return res.status(404).json({ error: 'Mentee not found' });
      }

      await mentee.destroy();
      res.status(200).json({ message: 'Mentee deleted successfully' });
    } catch (error) {
      console.error('Error deleting mentee:', error);
      res.status(500).json({ error: 'Failed to delete mentee' });
    }
  },
};

export default MenteeController;