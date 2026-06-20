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

      // Recherche Firestore
      const q = query(collection(db, "users"), where("pseudo", "==", pseudo));
      const snap = await getDocs(q);

      if (snap.empty) {
        alert("Pseudo introuvable dans Firestore");
        return;
      }

      const userData = snap.docs[0].data();
      const email = userData.email;

      if (!email) {
        alert("Erreur : le champ 'email' est manquant dans Firestore");
        return;
      }

      signInWithEmailAndPassword(auth, email, pass)
        .catch(err => alert("Erreur Auth : " + err.message));
    };

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
});
