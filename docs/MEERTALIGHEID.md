# Nederlandse en Engelse artikelen

Nederlandse artikelen staan in `content/articles/` en verschijnen onder `/artikelen/...`. Engelse versies staan in `content/articles-en/` en verschijnen onder `/en/articles/...`.

Koppel vertalingen met dezelfde stabiele `translationKey`:

```yaml
# Nederlandse versie
translationKey: housing-market

# Engelse versie
translationKey: housing-market
```

De bestandsnamen mogen per taal verschillen. Gebruik voor Engelse URL's een natuurlijke Engelse slug, bijvoorbeeld `the-housing-market.md`. Wanneer beide versies gepubliceerd zijn (`draft: false`), verschijnt automatisch een directe taalwissel op beide artikelpagina's en worden wederzijdse `hreflang`-links opgenomen.

Publiceer een vertaling pas wanneer die inhoudelijk gereed is. De talen hoeven dus niet gelijktijdig live. Houd bronverwijzingen, figuurteksten, alt-teksten en modelteksten per taal bij; dezelfde afbeeldingsbytes kunnen wel door beide artikelen worden gebruikt.

Stel bij Azure de variabele `NUXT_PUBLIC_SITE_URL` in op het definitieve HTTPS-domein. Daarmee worden canonicale taalverwijzingen als volledige URL's gegenereerd.
