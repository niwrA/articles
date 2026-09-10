# Arwin van Arum — artikelen

Persoonlijke publicatiesite op Nuxt 4 en Nuxt Content. Artikelen staan in `content/articles` en worden als statische pagina's gegenereerd.

## Lokaal starten

```bash
npm install
npm run dev
```

## Een artikel toevoegen

Kopieer een bestaand Markdown-bestand in `content/articles`, vul de frontmatter in en push naar `main`. Gebruik `draft: true` om een artikel lokaal te bewaren zonder het in overzichten te tonen.

## Publiceren op Azure

1. Maak een Azure Static Web App en koppel de GitHub-repository.
2. Voeg het deployment token als repository secret `AZURE_STATIC_WEB_APPS_API_TOKEN` toe.
3. Push naar `main`; de meegeleverde workflow bouwt en publiceert de statische site.

Vervang vóór publieke lancering het voorbeeldartikel door de volledige, gecontroleerde versie en pas naam, beschrijving en links naar wens aan.
