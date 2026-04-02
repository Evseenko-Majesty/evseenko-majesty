const userService = require('../services/userService');

exports.register = async (req, res) => {
    const { telegram_id, first_name, last_name, username, language_code } = req.body;
    
    if (!telegram_id) {
        return res.status(400).json({ error: 'telegram_id required' });
    }
    
    try {
        const user = await userService.findOrCreate({
            telegram_id,
            first_name,
            last_name,
            username,
            language_code
        });
        
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
