document.getElementById("app").innerHTML = `
  <header>Connexion</header>

  <div class="login-box">
    <input id="pseudo" type="text" placeholder="Pseudo">
    <input id="password" type="password" placeholder="Mot de passe">
    <button id="loginBtn">Se connecter</button>
  </div>

  <div id="status"></div>
`;

import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js").then(({ 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
}) => {

  import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js").then(({ 
    getFirestore,
    collection,
    query,
    where,
    getDocs
  }) => {

    const auth = window.auth;
    const db = getFirestore();

    document.getElementById("loginBtn").onclick = async () => {
      const pseudo = document.getElementById("pseudo").value.trim();
      const pass = document.getElementById("password").value;

      // Chercher l'utilisateur par pseudo
      const q = query(collection(db, "users"), where("pseudo", "==", pseudo));
      const snap = await getDocs(q);

      if (snap.empty) {
        alert("Pseudo inconnu");
        return;
      }

      const userData = snap.docs[0].data();
      const email = userData.email;

      // Connexion Firebase Auth
      signInWithEmailAndPassword(auth, email, pass)
        .catch(err => alert("Erreur : " + err.message));
    };

    // Détection de connexion
    onAuthStateChanged(auth, user => {
      if (user) {
        const pseudo = user.email.split("@")[0];

        document.getElementById("app").innerHTML = `
          <header>Bienvenue</header>
          <p>Connecté en tant que : <b>${pseudo}</b></p>
          <button id="logoutBtn">Se déconnecter</button>
        `;

        document.getElementById("logoutBtn").onclick = () => signOut(auth);
      }
    });

  });
});
