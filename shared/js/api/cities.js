// ============================================
// API — ГОРОДА
// ============================================

import { API_URL } from './config.js';

export const CitiesAPI = {
  
  // Все города
  async getCities() {
    try {
      const r = await fetch(`${API_URL}/api/cities`);
      return await r.json();
    } catch { return { success: false, cities: [] }; }
  },

  // Поиск города
  async searchCities(query) {
    try {
      const r = await fetch(`${API_URL}/api/cities/search?query=${encodeURIComponent(query)}`);
      return await r.json();
    } catch { return { success: false, cities: [] }; }
  }

};
