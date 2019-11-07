signupForm.addEventListener("submit", async event => {
  event.preventDefault();

  const modal = document.getElementById("modal-signup");

  try {
    const { email, password } = getSignupFormInfo();
    await signup(email, password);
  } catch (error) {
    console.log(`An error ocurred, trying sigup: ${error.message}`);
  } finally {
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  }
});

function getSignupFormInfo() {
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  return { email, password };
}

function getLoginFormInfo() {
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  return { email, password };
}

async function signup(email, password) {
  const credentials = await auth.createUserWithEmailAndPassword(
    email,
    password
  );
  return db
    .collection("users")
    .doc(credentials.user.uid)
    .set({
      bio: signupForm["signup-bio"].value
    });
}

async function login(email, password) {
  return await auth.signInWithEmailAndPassword(email, password);
}

async function logout() {
  return await auth.signOut();
}

logoutButton.addEventListener("click", async event => {
  event.preventDefault();
  await logout();
  console.log("User logged out success");
});

loginForm.addEventListener("submit", async event => {
  event.preventDefault();

  const modal = document.getElementById("modal-login");

  try {
    const { email, password } = getLoginFormInfo();
    await login(email, password);
    console.log("user logged in");
  } catch (error) {
    console.log(`An error ocurred, trying sigup: ${error.message}`);
  } finally {
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  }
});

auth.onAuthStateChanged(async user => {
  if (user) {
    const idTokenResult = await user.getIdTokenResult();
    user.admin = idTokenResult.claims.admin;

    db.collection("quotes").onSnapshot(
      snapshot => {
        setupQuotes(snapshot.docs);
        setupUI(user);
      },
      err => {}
    );
  } else {
    setupQuotes([]);
    setupUI();
  }
});
