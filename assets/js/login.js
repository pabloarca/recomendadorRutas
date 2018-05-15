'use strict'

let login = document.getElementById('login'),
    close = document.getElementById('login__close'),
    control = document.getElementById('login__control');

close.addEventListener('click', () => login.classList.toggle('login--visible'));
control.addEventListener('click', () => login.classList.toggle('login--visible'));
login.addEventListener('submit', () => login.classList.toggle('login--visible'));