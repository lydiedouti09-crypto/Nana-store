# Nana Store

Site vitrine React réalisé avec Vite.

## Démarrer le site

```sh
npm install
npm run dev
```

## Coordonnées de la boutique

Copiez `.env.example` vers `.env.local`, puis renseignez les coordonnées réelles :

- `VITE_WHATSAPP_NUMBER` : numéro WhatsApp avec l'indicatif du pays, uniquement des chiffres.
- `VITE_CONTACT_EMAIL` : adresse e-mail affichée dans le pied de page.

Sans numéro configuré, WhatsApp ouvre un nouveau message prérempli et laisse le visiteur choisir son destinataire.

## Compiler pour la production

```sh
npm run build
npm run preview
```