import { getUser } from './telegram.js';
import { registerUser } from './api.js';

let currentUser = null;

export async function authorize() {
    const user = getUser();
    if (!user) return null;
    
    const result = await registerUser({
        telegram_id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        language_code: user.language_code
    });
    
    if (result.success) {
        currentUser = result.user;
        return currentUser;
    }
    return null;
}

export function getCurrentUser() {
    return currentUser;
}
