import { LightningElement, api } from 'lwc';

export default class Config extends LightningElement {
    connectedCallback() {
        const language = localStorage.getItem('language')
        if(language) {
            document.documentElement.lang = language
        }
    }
    renderedCallback() {
        const lang = document.documentElement.lang
        const buttons = this.template.querySelectorAll('.lang')
        buttons.forEach(button => {
            if(button.innerHTML === lang.toLocaleUpperCase()) {
                button.classList.add('active')
            }
        })
    }
    handleLogout() {
        localStorage.clear()
        window.location.reload()
    }
    handleEng(event) {
        const buttons = this.template.querySelectorAll('.lang')
        buttons.forEach(button => {
            button.classList.remove('active')
        })
        const lang = event.target.innerHTML
        event.target.classList.add('active')
        localStorage.setItem('language', `${lang}`.toLocaleLowerCase())
        window.location.reload()
    }
}
