// Interface de connexion
document.getElementById("app").innerHTML = `
  <header>Connexion</header>

  <div class="login-box">
    <input id="email" type="email" placeholder="Email">
    <input id="password" type="password" placeholder="Mot de passe">
    <button id="loginBtn">Se connecter</button>
    <button id="signupBtn" class="secondary">Créer un compte</button>
  </div>

  <div id="status"></div>
`;

import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js").then(({ 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
}) => {

  const auth = window.auth;

  // Connexion
  document.getElementById("loginBtn").onclick = () => {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, pass)
      .catch(err => alert(err.message));
  };

  // Création de compte
  document.getElementById("signupBtn").onclick = () => {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, pass)
      .catch(err => alert(err.message));
  };

  // Détection de l'utilisateur connecté
  onAuthStateChanged(auth, user => {
    if (user) {
      document.getElementById("app").innerHTML = `
        <header>Bienvenue</header>
        <p>Connecté en tant que : <b>${user.email}</b></p>
        <button id="logoutBtn">Se déconnecter</button>
      `;

      document.getElementById("logoutBtn").onclick = () => signOut(auth);
    }
  });
});
