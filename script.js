// =========================
// SITE TO TIKTOK AI
// JAVASCRIPT FRONTEND
// =========================


// Récupération des éléments HTML

const websiteUrl = document.getElementById("websiteUrl");

const generateButton = document.getElementById("generateButton");

const loadingSection = document.getElementById("loadingSection");

const resultSection = document.getElementById("resultSection");

const loadingText = document.getElementById("loadingText");

const progressBar = document.getElementById("progressBar");

const newVideoButton = document.getElementById("newVideoButton");

const startButton = document.getElementById("startButton");


// Textes de résultat

const videoHook = document.getElementById("videoHook");

const videoShow = document.getElementById("videoShow");

const videoCta = document.getElementById("videoCta");

const hookText = document.getElementById("hookText");

const showText = document.getElementById("showText");

const ctaText = document.getElementById("ctaText");


// =========================
// BOUTON GENERER
// =========================

generateButton.addEventListener("click", function () {

  const url = websiteUrl.value.trim();

  if (url === "") {

    alert("⚠️ Veuillez entrer le lien de votre site.");

    return;
  }


  if (
    !url.startsWith("http://") &&
    !url.startsWith("https://")
  ) {

    alert(
      "⚠️ Le lien doit commencer par https://"
    );

    return;
  }


  startGeneration(url);

});


// =========================
// DEMARRER GENERATION
// =========================

async function startGeneration(url) {

  resultSection.classList.add("hidden");

  loadingSection.classList.remove("hidden");

  loadingSection.scrollIntoView({
    behavior: "smooth"
  });


  generateButton.disabled = true;

  generateButton.innerHTML =
    "⏳ Analyse en cours...";


  progressBar.style.width = "20%";

  loadingText.textContent =
    "🔗 Envoi du lien vers notre serveur...";


  activateStep("step1");


  try {

    // =========================
    // ENVOYER LE LIEN AU BACKEND
    // =========================

    const response = await fetch(
      "/api/generate",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          url: url
        })

      }
    );


    // Lire la réponse

    const data =
      await response.json();


    // Vérifier si le backend a envoyé une erreur

    if (!response.ok) {

      throw new Error(
        data.message ||
        "Erreur serveur"
      );

    }


    // =========================
    // SIMULATION VISUELLE
    // =========================

    await wait(700);

    activateStep("step2");

    progressBar.style.width = "40%";

    loadingText.textContent =
      "📸 Préparation de l'analyse du site...";


    await wait(700);

    activateStep("step3");

    progressBar.style.width = "60%";

    loadingText.textContent =
      "🤖 Analyse du contenu par IA...";


    await wait(700);

    activateStep("step4");

    progressBar.style.width = "80%";

    loadingText.textContent =
      "✍️ Création du Hook et du CTA...";


    await wait(700);

    activateStep("step5");

    progressBar.style.width = "100%";

    loadingText.textContent =
      "🎬 Préparation du résultat...";


    await wait(700);


    // Afficher le résultat reçu

    showResult(data);


  } catch (error) {

    console.error(error);


    alert(
      "❌ Erreur : " +
      error.message
    );


    loadingSection.classList.add(
      "hidden"
    );


    generateButton.disabled = false;

    generateButton.innerHTML =
      "✨ Générer ma vidéo";

  }

}


// =========================
// ACTIVER UNE ETAPE
// =========================

function activateStep(stepId) {

  const steps = document.querySelectorAll(
    ".generation-step"
  );


  steps.forEach(function (step) {

    step.classList.remove(
      "active"
    );

  });


  const activeStep =
    document.getElementById(stepId);


  if (activeStep) {

    activeStep.classList.add(
      "active"
    );

  }

}


// =========================
// AFFICHER LE RESULTAT
// =========================

function showResult(data) {

  const video =
    data.video;


  // Mettre le Hook

  videoHook.textContent =
    video.hook;


  hookText.textContent =
    video.hook;


  // Mettre la présentation

  videoShow.textContent =
    video.show;


  showText.textContent =
    video.show;


  // Mettre le CTA

  videoCta.textContent =
    video.cta;


  ctaText.textContent =
    video.cta;


  // Cacher le chargement

  loadingSection.classList.add(
    "hidden"
  );


  // Afficher le résultat

  resultSection.classList.remove(
    "hidden"
  );


  // Réactiver le bouton

  generateButton.disabled = false;

  generateButton.innerHTML =
    "✨ Générer ma vidéo";


  // Aller vers le résultat

  resultSection.scrollIntoView({

    behavior: "smooth"

  });

}


// =========================
// NOUVELLE VIDEO
// =========================

newVideoButton.addEventListener(
  "click",
  function () {

    websiteUrl.value = "";


    resultSection.classList.add(
      "hidden"
    );


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });


    setTimeout(function () {

      websiteUrl.focus();

    }, 500);

  }
);


// =========================
// CTA FINAL
// =========================

startButton.addEventListener(
  "click",
  function () {

    websiteUrl.scrollIntoView({

      behavior: "smooth",

      block: "center"

    });


    setTimeout(function () {

      websiteUrl.focus();

    }, 500);

  }
);


// =========================
// TOUCHE ENTREE
// =========================

websiteUrl.addEventListener(
  "keypress",
  function (event) {

    if (
      event.key === "Enter"
    ) {

      generateButton.click();

    }

  }
);


// =========================
// TELECHARGEMENT
// =========================

const downloadButton =
  document.getElementById(
    "downloadButton"
  );


downloadButton.addEventListener(
  "click",
  function () {

    alert(
      "🎬 La vraie génération et le téléchargement de la vidéo seront disponibles lorsque nous ajouterons le moteur vidéo."
    );

  }
);


// =========================
// FONCTION ATTENTE
// =========================

function wait(milliseconds) {

  return new Promise(
    function (resolve) {

      setTimeout(
        resolve,
        milliseconds
      );

    }
  );

    }
