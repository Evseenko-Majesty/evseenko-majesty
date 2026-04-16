import { render } from './view.js'
import { API } from '/shared/js/api.js'
import { hideBackButton } from '/shared/js/telegram.js'

export class SplashScreen {
  constructor(app) {
    this.app = app
    this.statusCard = null
    this.authCompleted = false
  }

  getElement() {
    return render()
  }

  onMount() {
    hideBackButton(this.app.tg)
    this.statusCard = document.querySelector('.splash__status')
    setTimeout(() => {
      this.authenticate()
    }, 2800)
  }

  async authenticate() {
    const tgUser = this.app.tg.initDataUnsafe?.user

    if (!tgUser) {
      this.showError('Откройте через Telegram')
      return
    }

    const result = await API.auth(tgUser)

    if (result.success) {
      this.app.user = result.user
      this.authCompleted = true
      this.showSuccess()
      setTimeout(() => {
        if (this.authCompleted) {
          this.app.navigateTo('home')
        }
      }, 1500)
    } else {
      this.showError(result.error || 'Ошибка подключения')
    }
  }

  showSuccess() {
    if (!this.statusCard) return
    this.statusCard.className = 'splash__status status-card status-card--success'
    this.statusCard.innerHTML = '<div class="status-card__content"><span class="status-card__icon">✅</span><span class="status-card__text">Подключено</span></div>'
  }

  showError(message) {
    if (!this.statusCard) return
    this.statusCard.className = 'splash__status status-card status-card--error'
    this.statusCard.innerHTML = '<div class="status-card__content"><span class="status-card__icon">❌</span><span class="status-card__text">' + message + '</span></div><button class="btn status-card__retry">Повторить</button>'

    const retryBtn = this.statusCard.querySelector('.status-card__retry')
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.statusCard.className = 'splash__status status-card status-card--loading'
        this.statusCard.innerHTML = '<div class="status-card__content"><span class="status-card__icon">🔄</span><span class="status-card__text">Подключение к серверу...</span></div>'
        this.authenticate()
      })
    }
  }
}
