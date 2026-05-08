import { render } from './view.js';
import { UsersAPI } from '/shared/js/api/users.js';  // Нужен будет метод searchUsers

export class GrantFormScreen {
  constructor(app) { this.app = app; }
  
  getElement() {
    return render(async (query) => {
      if (query.length < 2) return;
      // Поиск пользователей (добавим API)
      console.log('Поиск:', query);
    });
  }
}
