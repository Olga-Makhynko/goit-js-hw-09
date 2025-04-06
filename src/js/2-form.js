import isEmail from 'validator/es/lib/isEmail';

const form = document.querySelector('.feedback-form');
let formData = {
  email: '',
  message: '',
};
let handleInput = event => {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};
form.addEventListener('input', handleInput);
if (localStorage.getItem('feedback-form-state') !== null) {
  let localStorageData = {};
  try {
    localStorageData = JSON.parse(localStorage.getItem('feedback-form-state'));
  } catch (error) {
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
  }
  formData = { ...formData, ...localStorageData };
  form.elements.email.value = formData.email || '';
  form.elements.message.value = formData.message || '';
}

function formSubmit() {
  form.addEventListener('submit', event => {
    event.preventDefault();

    let { email, message } = formData;
    if (!isEmail(email)) {
      alert("It's not email");
      return;
    }
    if (message.trim() === '') {
      alert('Wright something');
      return;
    }

    alert('Message sent successfully!');
    console.log(formData);

    localStorage.removeItem('feedback-form-state');

    Object.keys(formData).forEach(key => (formData[key] = ''));
    form.reset();
  });
}
formSubmit();
