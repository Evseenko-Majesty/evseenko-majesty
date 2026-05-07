import { API_URL } from './config.js';

export const PermissionsAPI = {
  async check(userId, permission) {
    try {
      const r = await fetch(`${API_URL}/api/permissions/check?user_id=${userId}&permission=${permission}`);
      return await r.json();
    } catch { return { success: false, hasAccess: false }; }
  }
};
