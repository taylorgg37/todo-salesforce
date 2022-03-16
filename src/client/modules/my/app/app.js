import { LightningElement, api } from 'lwc';

export default class App extends LightningElement {
    renderedCallback() {
        this.template.querySelector('.manual').innerHTML = '<todo-app-main-page baseurl="https://2k0s65vda2.execute-api.us-east-2.amazonaws.com/api"></todo-app-main-page>';
    }
}
