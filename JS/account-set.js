document.addEventListener('DOMContentLoaded', function() {

  const accountForm = document.getElementById('account-form');

  const accountNav = document.getElementById('account-nav');
  accountNav.addEventListener('click', showAccountForm);

  const accountNavBottom = document.getElementById('account-nav-bottom');
  accountNavBottom.addEventListener('click', showAccountForm);

  const accountCloseButton = document.getElementById('account-close');
  accountCloseButton.addEventListener('click', hideAccountForm);

  const logInInfo = localStorage.getItem('logInInfo');
  if (logInInfo) {
    const accountNav = document.getElementById('account-nav');
    accountNav.style.color = "var(--bs-primary)";

    const accountNavBottom = document.getElementById('account-nav-bottom');
    accountNavBottom.style.color = "var(--bs-primary)";
  }

  function showAccountForm() {
    const logInInfo = localStorage.getItem('logInInfo');
    if (logInInfo) {
      window.location.href = 'shopping-account.html';
    } else {
      const accountModal = document.getElementById('account-modal');
      accountModal.style.display = 'block';
    }
  }

  function hideAccountForm() {
    const accountModal = document.getElementById('account-modal');
    accountModal.style.display = 'none';
  }

  function logIn() {
      const logInInfo = localStorage.getItem('logInInfo');
      if (logInInfo) {
        const accountNav = document.getElementById('account-nav');
        accountNav.style.color = "var(--bs-primary)";
        window.location.href = 'shopping-account.html';
      } else {
          savelogInInfoToLocalStorage()
      }
    }

  const logInButton = document.getElementById('logInButton');
  accountForm.addEventListener("submit", (e) => {
    savelogInInfoToLocalStorage()
  });

  function savelogInInfoToLocalStorage() {
    const accountEmail = document.getElementById("account-email").value;
    const accountPassword = document.getElementById("account-password").value;
      const logInInfo = {
        accountEmail: accountEmail,
        accountPassword: accountPassword,
      };
      localStorage.setItem('logInInfo', JSON.stringify(logInInfo));
  }

});
