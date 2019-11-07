adminForm.addEventListener("submit", event => {
  event.preventDefault();

  const email = document.querySelector("#admin-email").value;

  console.log(email);
  const addAdminRole = func.httpsCallable("addAdminRole");
  addAdminRole({ email })
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
});
