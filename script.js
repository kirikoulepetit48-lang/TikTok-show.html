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

  // Vérifier si l'utilisateur a entré un lien

  if (url === "") {

    alert("⚠️ Veuillez entrer le lien de votre site.");

    return;
  }


  // Vérifier si le lien commence par http

  if (
    !url.startsWith("http://") &&
    !url.startsWith("https://")
  ) {

    alert(
      "⚠️ Le lien doit commencer par https://"
    );

    return;
  }


  // Lancer la génération

  startGeneration(url);

});


// =========================
// FONCTION GENERATION
// =========================

function startGeneration(url) {

  // Cacher le résultat précédent

  resultSection.classList.add("hidden");


  // Afficher le chargement

  loadingSection.classList.remove("hidden");


  // Aller vers la section de chargement

  loadingSection.scrollIntoView({

    behavior: "smooth"

  });


  // Désactiver le bouton

  generateButton.disabled = true;

  generateButton.innerHTML =
    "⏳ Génération en cours...";


  // Démarrer les étapes

  runGenerationSteps(url);

}


// =========================
// ETAPES DE GENERATION
// =========================

function runGenerationSteps(url) {

  const steps = [

    {
      id: "step1",
      text: "🔗 Lien reçu...",
      progress: 20
    },

    {
      id: "step2",
      text: "📸 Capture du site web...",
      progress: 40
    },

    {
      id: "step3",
      text: "🤖 Analyse du site par IA...",
      progress: 60
    },

    {
      id: "step4",
      text: "✍️ Création du Hook et du script...",
      progress: 80
    },

    {
      id: "step5",
      text: "🎬 Préparation de la vidéo TikTok...",
      progress: 100
    }

  ];


  let currentStep = 0;


  // Réinitialiser les étapes

  steps.forEach(function (step) {

    const element =
      document.getElementById(step.id);

    element.classList.remove("active");

  });


  function nextStep() {

    if (currentStep >= steps.length) {

      // Lorsque toutes les étapes sont terminées

      finishGeneration(url);

      return;

    }


    const step = steps[currentStep];


    // Activer l'étape

    const element =
      document.getElementById(step.id);

    element.classList.add("active");


    // Changer le texte

    loadingText.textContent =
      step.text;


    // Changer la barre de progression

    progressBar.style.width =
      step.progress + "%";


    currentStep++;


    // Temps entre les étapes

    setTimeout(
      nextStep,
      1200
    );

  }


  // Commencer

  nextStep();

}


// =========================
// FIN DE GENERATION
// =========================

function finishGeneration(url) {

  // Générer des textes temporaires

  const domain =
    getDomainName(url);


  const hook =
    "🔥 Tu dois absolument découvrir " +
    domain + " !";


  const show =
    "Ce site propose une solution simple et moderne pour gagner du temps et découvrir de nouvelles possibilités.";


  const cta =
    "🚀 Découvre le site maintenant !";


  // Mettre les textes dans l'aperçu vidéo

  videoHook.textContent =
    hook;


  videoShow.textContent =
    show;


  videoCta.textContent =
    "Découvrir maintenant 🚀";


  // Mettre les textes dans les cartes

  hookText.textContent =
    hook;


  showText.textContent =
    show;


  ctaText.textContent =
    cta;


  // Cacher le chargement

  loadingSection.classList.add("hidden");


  // Afficher le résultat

  resultSection.classList.remove("hidden");


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
// RECUPERER LE NOM DU SITE
// =========================

function getDomainName(url) {

  try {

    const domain =
      new URL(url).hostname;


    return domain.replace(
      "www.",
      ""
    );

  } catch (error) {

    return "ce site";

  }

}


// =========================
// NOUVELLE VIDEO
// =========================

newVideoButton.addEventListener(
  "click",
  function () {

    // Réinitialiser le lien

    websiteUrl.value = "";


    // Cacher le résultat

    resultSection.classList.add("hidden");


    // Retourner en haut

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });


    // Mettre le curseur dans le champ

    setTimeout(function () {

      websiteUrl.focus();

    }, 700);

  }
);


// =========================
// BOUTON CTA FINAL
// =========================

startButton.addEventListener(
  "click",
  function () {

    // Retourner vers le champ URL

    websiteUrl.scrollIntoView({

      behavior: "smooth",

      block: "center"

    });


    setTimeout(function () {

      websiteUrl.focus();

    }, 600);

  }
);


// =========================
// TOUCHE ENTREE
// =========================

websiteUrl.addEventListener(
  "keypress",
  function (event) {

    if (event.key === "Enter") {

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
      "🎬 La génération réelle de la vidéo sera ajoutée lorsque notre backend sera connecté."
    );

  }
);
