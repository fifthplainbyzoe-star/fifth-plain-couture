# Product color image switching

## Goal
Make every purchasable FifthPlain apparel product visually change to the selected color, without redesigning any page or changing current products, pricing, checkout, navigation, or layout.

## Scope
- Apply to T-shirts, hoodies, tracksuit pants, Elara Dress, Harper Denim, and Solene Skirt.
- Keep fragrance products unchanged because their selector represents scents rather than garment colors.
- Keep The Aurelia Skirt’s current Coming Soon experience unchanged.

## Implementation
1. Create color-specific versions of each product’s primary photo, preserving the garment, model, pose, background, framing, lighting, and modest styling; only the garment color changes.
2. Add a color-to-image mapping to each applicable product record.
3. Update the existing color selector so choosing Black, Brown, Cream, Pink, Sky Blue, or another offered color immediately swaps the large primary product image.
4. Keep the existing gallery, product cards, spacing, typography, buttons, and responsive behavior unchanged.
5. Store each new image through the project asset flow and reference it from the product data.
6. Verify every offered color has a valid image, color changes work on desktop and mobile, cart/WhatsApp selections remain correct, and the site builds without broken references.

## Technical details
- Extend the shared product type with an optional `colorImages` record.
- Resolve the displayed primary image from `colorImages[selectedColor]`, falling back to the existing product image.
- Use the resolved image when adding the configured item to cart so checkout shows the chosen color’s image.
