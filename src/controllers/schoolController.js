const db = require("../config/db");

// took help of ai for this function to calculate distance 
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // earth radius in km
    const toRadian = (deg) => (deg * Math.PI) / 180;
    const dLat = toRadian(lat2 - lat1);
    const dLon = toRadian(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return parseFloat(distance.toFixed(2));
}

const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;
        const [result] = await db.execute(
            "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
            [name.trim(), address.trim(), parseFloat(latitude), parseFloat(longitude)]
        );
        res.status(201).json({
            success: true,
            message: "School added",
            id: result.insertId,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const listSchools = async (req, res) => {
    try {
        const userLat = parseFloat(req.query.latitude);
        const userLon = parseFloat(req.query.longitude);
        const [schools] = await db.execute("SELECT * FROM schools");

        const schoolsWithDistance = schools.map((school) => {
            const distance = haversineDistance(userLat, userLon, school.latitude, school.longitude);
            return { ...school, distance_km: distance };
        });
        schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

        res.status(200).json({
            success: true,
            data: schoolsWithDistance,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addSchool, listSchools };