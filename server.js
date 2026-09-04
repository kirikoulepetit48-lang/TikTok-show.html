// =========================
// SITE TO TIKTOK AI
// BACKEND SERVER
// =========================


// Charger les variables .env

require("dotenv").config();


// Importer les bibliothèques

const express = require("express");

const cors = require("cors");

const path = require("path");


// Créer l'application Express

const app = express();


// =========================
// CONFIGURATION
// =========================


// Port Render ou port local

const PORT =
  process.env.PORT || 3000;


// Autoriser les requêtes

app.use(cors());


// Lire les données JSON

app.use(express.json());


// Servir les fichiers frontend

app.use(
  express.static(
    path.join(__dirname)
  )
);


// =========================
// ROUTE TEST
// =========================

app.get(
  "/api/health",
  function (req, res) {

    res.json({

      success: true,

      message:
        "Backend SiteToTikTok AI fonctionne 🚀"

    });

  }
);


// =========================
// ROUTE GENERATE
// =========================

app.post(
  "/api/generate",
  async function (req, res) {

    try {

      // Récupérer le lien

      const url =
        req.body.url;


      // Vérifier le lien

      if (!url) {

        return res.status(400).json({

          success: false,

          message:
            "Veuillez fournir le lien du site."

        });

      }


      // Vérifier que c'est une URL valide

      let validUrl;

      try {

        validUrl =
          new URL(url);

      } catch (error) {

        return res.status(400).json({

          success: false,

          message:
            "Le lien fourni n'est pas valide."

        });

      }


      // Vérifier http ou https

      if (
        validUrl.protocol !== "http:" &&
        validUrl.protocol !== "https:"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Le lien doit commencer par http:// ou https://"

        });

      }


      // Récupérer le nom du domaine

      const domain =
        validUrl.hostname.replace(
          "www.",
          ""
        );


      // Afficher dans Render

      console.log(
        "Nouvelle demande :",
        url
      );


      // =================================
      // GENERATION TEMPORAIRE
      // =================================

      // Plus tard ici :
      //
      // 1. Capture du site
      // 2. Analyse IA
      // 3. Création du Hook
      // 4. Création du script
      // 5. Génération voix
      // 6. Génération vidéo


      const result = {

        success: true,

        message:
          "Analyse terminée avec succès.",

        website: {

          url: url,

          domain: domain

        },


        video: {

          hook:
            `🔥 Tu dois absolument découvrir ${domain} !`,

          show:
            "Découvre ce site et ses fonctionnalités grâce à une présentation générée automatiquement par intelligence artificielle.",

          cta:
            "🚀 Découvre le site maintenant !",

          status:
            "ready"

        }

      };


      // Envoyer le résultat

      res.json(result);

    } catch (error) {

      console.error(
        "Erreur :",
        error
      );


      res.status(500).json({

        success: false,

        message:
          "Une erreur est survenue sur le serveur."

      });

    }

  }
);


// =========================
// ROUTE PRINCIPALE
// =========================

app.get(
  "*",
  function (req, res) {

    res.sendFile(
      path.join(
        __dirname,
        "index.html"
      )
    );

  }
);


// =========================
// DEMARRER LE SERVEUR
// =========================

app.listen(
  PORT,
  function () {

    console.log(
      `🚀 Serveur démarré sur le port ${PORT}`
    );

  }
);
