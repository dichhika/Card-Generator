// Element selectors
const cardType = document.getElementById("cardType");
const nameSection = document.getElementById("nameSection");
const generateBtn = document.getElementById("generateBtn");
const cardPreview = document.getElementById("cardPreview");
const formSection = document.getElementById("formSection");
const downloadBtn = document.getElementById("downloadBtn");

// Handle dynamic name fields
cardType.addEventListener("change", () => {
  nameSection.innerHTML = "";
  const type = cardType.value;

  const createInput = (placeholder, id) => {
    const input = document.createElement("input");
    input.type = "text";
    input.id = id;
    input.placeholder = placeholder;
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^a-zA-Z\s]/g, "");
    });
    return input;
  };

  if (type === "anniversary") {
    nameSection.appendChild(createInput("Recipient Name 1", "recipient1"));
    nameSection.appendChild(createInput("Recipient Name 2", "recipient2"));
  } else {
    nameSection.appendChild(createInput("Recipient Name", "recipient"));
  }
});

// Generate Card
generateBtn.addEventListener("click", () => {
  const type = cardType.value;
  const message = document.getElementById("message").value.trim();
  const from = document.getElementById("from").value.trim();

  let recipient = "";
  if (type === "anniversary") {
    const r1 = document.getElementById("recipient1")?.value.trim();
    const r2 = document.getElementById("recipient2")?.value.trim();
    if (!r1 || !r2 || !message || !from)
      return alert("Please fill all fields.");
    recipient = `${r1} & ${r2}`;
  } else {
    const r = document.getElementById("recipient")?.value.trim();
    if (!r || !message || !from) return alert("Please fill all fields.");
    recipient = r;
  }

  const card = document.createElement("div");
  card.className = "card";
  card.id = "captureCard";

  const title =
    type === "birthday" || type === "anniversary"
      ? `Dear ${recipient},`
      : "To my love";

  const sticker =
    type === "birthday"
      ? "🎂🎈🎉"
      : type === "anniversary"
      ? "💑💖🌹"
      : "🫶🏻🩷 ♥️🫵🏻🌷💐";

  card.innerHTML = `
    <h1 style="color:#ff66b3; margin-bottom:20px;">${title}</h1>
    <p style="color:#666; font-size:18px; line-height:1.8;">${message}</p>
    <div class="signature" style="text-align:right; font-style:italic; color:#ff66b3; margin-top:20px; font-size:20px; font-weight:bold;">— 
    ${from}</div>
    <div class="sticker" style="font-size:30px">${sticker}</div>
    <div class="hearts" id="hearts"></div>
  `;

  setTimeout(() => {
    const heartsContainer = card.querySelector("#hearts");
    let emojiSet = [];
    if (type === "birthday") {
      emojiSet = ["🎈", "🎂", "🎉"];
    } else if (type === "anniversary") {
      emojiSet = ["♥️", "🌹", "💐"];
    } else {
      emojiSet = ["❤️"];
    }

    for (const emoji of emojiSet) {
      for (let i = 0; i < 10; i++) {
        const floatEmoji = document.createElement("div");
        floatEmoji.textContent = emoji;
        floatEmoji.className = "float";
        floatEmoji.style.left = `${Math.random() * 100}%`;
        floatEmoji.style.top = `${Math.random() * 100}%`;
        heartsContainer.appendChild(floatEmoji);
      }
    }
  }, 100);

  cardPreview.innerHTML = "";
  if (downloadBtn) cardPreview.appendChild(downloadBtn);
  cardPreview.appendChild(card);

  formSection.style.display = "none";
  cardPreview.style.display = "block";
});

// Download Card
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    const card = document.getElementById("captureCard");
    html2canvas(card).then((canvas) => {
      const link = document.createElement("a");
      link.download = "card.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  });
}
