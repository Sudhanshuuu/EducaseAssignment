const School = require('../model/School');

async function handleAddSchool(req, res) {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newSchool = await School.create({
            name,
            address,
            latitude,
            longitude
        });

        res.status(201).json({
            message: 'School added successfully',
            schoolId: newSchool._id,
            school: newSchool
        })

    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
}


async function handleGetSchool(req, res) {

    const { lat, lng } = req.query;
    if (!lat || !lng) {
        return res.status(400).json({
            message: "Latitude and longitude are required. Please send them as query parameters, e.g., /listSchools?lat=23.2&lng=78.1"
        });

    }

    try {
        const userLat = parseFloat(lat);
        const userLng = parseFloat(lng);

        const schools = await School.find();

        const schoolDistance = schools.map(school => {
            const distance = getDistance(userLat, userLng, school.latitude, school.longitude);
            return { ...school.toObject(), distance };
        });

        schoolDistance.sort((a, b) => a.distance - b.distance);

        res.json(schoolDistance);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });

    }
}

function getDistance(lat1, lon1, lat2, lon2) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

module.exports = { handleGetSchool, handleAddSchool };