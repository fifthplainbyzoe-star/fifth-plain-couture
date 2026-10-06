<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Product color choices may map to color-specific primary images; preserve the original gallery and store the selected image in cart entries so orders remain visually accurate.
- Color galleries live in src/assets/gallery-color/<product>-<color>-<n>.jpg, resolved by src/lib/colorGalleries.ts; Select product pages use src/lib/delivery.ts (keep prices in sync with pricing.server.ts) and order only via WhatsApp — so new Select products get it automatically.
