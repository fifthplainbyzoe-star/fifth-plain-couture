# Full gallery color switching

## What will change
- Extend each apparel product’s color data from one main photo to a complete gallery for every available color.
- When a shopper changes **Colors**, update the large photo and every gallery photo together.
- Preserve each photo’s pose, styling, background, crop, order, and product-specific model while changing only the garment color.
- Keep the existing dropdowns, Select prices, XL/2XL R90 surcharge, cart image, checkout, navigation, and page styling unchanged.

## Verification
- Check every color on tees, hoodies, tracksuit pants, Elara, Harper, and Solene.
- Confirm the entire gallery changes, selected-color photos load, and the chosen main image still follows the item into cart and checkout.
- Check desktop and mobile layouts and confirm the build passes.

## Technical details
- Add optional color-specific gallery mappings to product data, with the original gallery as a safe fallback.
- Resolve the visible gallery from the selected color on the existing product page; no layout changes.
- Create color variants from the corresponding original gallery photos rather than reusing or duplicating one image.
