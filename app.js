document.getElementById("app").innerHTML = `
  <header>Messagerie</header>

  <div class="messages" id="messages">
    <div class="message">Bienvenue dans le chat !</div>
  </div>

  <div class="input-area">
    <input id="messageInput" type="text" placeholder="Écrire un message...">
    <button id="sendBtn">Envoyer</button>
  </div>
`;

// Fonction d'envoi de message (temporaire, sans Firebase)
document.getElementById("sendBtn").addEventListener("click", () => {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();

  if (text !== "") {
    const msgContainer = document.getElementById("messages");
    msgContainer.innerHTML += `<div class="message me">${text}</div>`;
    input.value = "";
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }
});
