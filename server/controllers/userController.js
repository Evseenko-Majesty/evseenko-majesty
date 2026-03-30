const userService = require('../services/userService');

exports.getUser = async (req, res) => {
    const { telegram_id, first_name, username } = req.body;
    
    if (!telegram_id) {
        return res.status(400).json({ error: 'telegram_id required' });
    }
    
    try {
        const user = await userService.findOrCreate(telegram_id, first_name, username);
        
        res.json({
            success: true,
            user: {
                id: user.telegram_id,
                name: user.first_name,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getBalance = async (req, res) => {
    const { telegram_id } = req.params;
    
    try {
        const { balance, bonus } = await userService.getBalance(telegram_id);
        res.json({ balance, bonus });
    } catch (error) {
        res.json({ balance: 0, bonus: 0 });
    }
};
