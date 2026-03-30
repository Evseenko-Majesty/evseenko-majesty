const supabase = require('../db/supabase');

class UserService {
    async findOrCreate(telegramId, firstName, username) {
        let { data: user } = await supabase
            .from('majesty_users')
            .select('*')
            .eq('telegram_id', telegramId)
            .single();

        if (!user) {
            const { data: newUser } = await supabase
                .from('majesty_users')
                .insert({
                    telegram_id: telegramId,
                    first_name: firstName || 'Пользователь',
                    username: username || null,
                    role: 'client'
                })
                .select()
                .single();
            user = newUser;
        } else {
            await supabase
                .from('majesty_users')
                .update({ last_login: new Date() })
                .eq('telegram_id', telegramId);
        }

        return user;
    }

    async getBalance(telegramId) {
        const { data: user } = await supabase
            .from('majesty_users')
            .select('balance, bonus_points')
            .eq('telegram_id', telegramId)
            .single();
        
        return { balance: user?.balance || 0, bonus: user?.bonus_points || 0 };
    }
}

module.exports = new UserService();
