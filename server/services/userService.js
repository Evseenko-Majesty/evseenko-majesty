const supabase = require('../db/supabase');

class UserService {
    async findOrCreate(data) {
        const { data: existing } = await supabase
            .from('users')
            .select('*')
            .eq('telegram_id', data.telegram_id)
            .single();
        
        if (existing) return existing;
        
        const { data: created, error } = await supabase
            .from('users')
            .insert(data)
            .select()
            .single();
        
        if (error) throw error;
        return created;
    }
}

module.exports = new UserService();
