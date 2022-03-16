import '@lwc/synthetic-shadow'; 
import { createElement } from 'lwc';
import { defineCustomElements } from '@taylor.guillerm/todo-app/loader'
import MyApp from 'my/app';

const app = createElement('my-app', { is: MyApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
defineCustomElements()
