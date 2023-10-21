import styles from "./assets/css/main.css";
import { App } from "./App";

const app = document.querySelector('.app');
const elementApp = document.createElement('div', {is: 'root-app'});
app.append(elementApp);

const head = document.querySelector('head');
const style = document.createElement('style');
style.textContent = styles.toString();
head.appendChild(style);