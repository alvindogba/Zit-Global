import db from "../models/index.js";

const createMentorship = async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email, phone, country, state, community, expertise, motivation, interests, goals, preferredSchedule, mentorPreferences, role } = req.body;

    try {
        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !country || !state || !community) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields."
            });
        }

        if (role === "mentor") {
            if (!expertise || !motivation) {
                return res.status(400).json({
                    success: false,
                    message: "Mentors must provide expertise and motivation."
                });
            }
            const mentor = await db.Mentor.create({ firstName, lastName, email, phone, country, state, community, expertise, motivation });
            return res.status(201).json({
                success: true,
                message: "Mentor created successfully",
                data: mentor
            });
        } 
        
        if (role === "mentee") {
            if (!interests || !goals || !preferredSchedule || !mentorPreferences) {
                return res.status(400).json({
                    success: false,
                    message: "Mentees must provide interests, goals, preferred schedule, and mentor preferences."
                });
            }
            const mentee = await db.Mentee.create({ firstName, lastName, email, phone, country, state, community, interests, goals, preferredSchedule, mentorPreferences });
            return res.status(201).json({
                success: true,
                message: "Mentee created successfully",
                data: mentee
            });
        }

        return res.status(400).json({
            success: false,
            message: "Invalid role. Must be either 'mentor' or 'mentee'."
        });

    } catch (error) {
        console.error("Error creating mentorship:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating mentorship.",
            error: error.message
        });
    }
};

export default createMentorship;
