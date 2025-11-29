# Product Embroidery (Monogramming) Feature

This implementation adds embroidery/monogramming functionality to the Shopify Dawn theme, allowing customers to customize products with personalized text, colors, and fonts.

## Features

- ✅ Client-configurable embroidery options per product
- ✅ Customizable colors, fonts, and pricing
- ✅ Product-specific character limits
- ✅ Product-specific embroidery preview images
- ✅ Edit embroidery in cart drawer
- ✅ Add embroidery to items in cart
- ✅ Embroidery details visible in Shopify Admin orders
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Accessible and optimized
- ✅ Built with Tailwind CSS

## Installation

### 1. Setup Tailwind CSS

```bash
npm install
npm run build:css
```

For development with auto-rebuild:
```bash
npm run watch:css
```

### 2. Configure Metafields

Import the metafield definitions from `config/metafields.json` into your Shopify store:

1. Go to Settings > Custom data > Products
2. Import the metafield definitions or create them manually:
   - `custom.embroidery_enabled` (boolean)
   - `custom.embroidery_character_limit` (number)
   - `custom.embroidery_image` (file reference)
   - `custom.embroidery_options` (JSON)

### 3. Configure a Product

1. Go to a product in Shopify Admin
2. Scroll to the "Metafields" section
3. Configure:
   - **Embroidery Enabled**: Check to enable embroidery for this product
   - **Embroidery Character Limit**: Set max characters (e.g., 10)
   - **Embroidery Preview Image**: Upload a preview image
   - **Embroidery Options**: Add JSON configuration:

```json
{
  "base_price": 15,
  "base_currency": "GBP",
  "colors": [
    {
      "name": "White",
      "value": "white",
      "price": 0,
      "currency": "GBP"
    },
    {
      "name": "Gold",
      "value": "gold",
      "price": 5,
      "currency": "GBP"
    }
  ],
  "fonts": [
    {
      "name": "Serif",
      "value": "serif",
      "price": 0,
      "currency": "GBP"
    },
    {
      "name": "Script",
      "value": "script",
      "price": 3,
      "currency": "GBP"
    }
  ]
}
```

### 4. Integrate into Product Template

Add the embroidery snippet to your product template. In `sections/main-product.liquid`, add after the product form:

```liquid
{% render 'product-embroidery', product: product %}
```

### 5. Integrate into Cart Drawer

In your cart drawer template (typically `snippets/cart-drawer.liquid` or similar), add within the cart item loop:

```liquid
{% render 'cart-embroidery', item: item, product: item.product, index: forloop.index0 %}
```

### 6. Include Tailwind CSS

In your `theme.liquid` layout file, include the compiled Tailwind CSS:

```liquid
{{ 'tailwind.css' | asset_url | stylesheet_tag }}
```

## File Structure

```
theme/
├── snippets/
│   ├── product-embroidery.liquid      # Product page embroidery component
│   ├── cart-embroidery.liquid         # Cart drawer embroidery component
│   └── cart-item-embroidery-example.liquid  # Integration example
├── sections/
│   └── main-product-embroidery-example.liquid  # Integration example
├── assets/
│   ├── tailwind-input.css             # Tailwind source
│   └── tailwind.css                   # Compiled CSS (generated)
├── config/
│   ├── metafields.json                # Metafield definitions
│   └── settings_schema.json           # Theme settings
├── tailwind.config.js                 # Tailwind configuration
├── package.json                       # NPM dependencies
└── README.md                          # This file
```

## How to Test

### Direct Testing Steps

1. **Setup Test Product:**
   - Create or select a product in Shopify Admin
   - Enable embroidery metafield
   - Configure embroidery options (colors, fonts, pricing)
   - Set character limit
   - Upload preview image (optional)

2. **Test Product Page:**
   - Navigate to the product page
   - Verify embroidery section appears
   - Check "Add Embroidered Name" checkbox
   - Enter text (verify character limit)
   - Select color and font options
   - Verify price updates correctly
   - Add product to cart

3. **Test Cart Drawer:**
   - Open cart drawer
   - Verify embroidery details display
   - Click "Edit" to modify embroidery
   - Test adding embroidery to items without it
   - Test removing embroidery
   - Verify cart updates correctly

4. **Test Order Creation:**
   - Complete checkout process
   - Go to Shopify Admin > Orders
   - Open the order
   - Verify embroidery properties appear in line item properties:
     - `_embroidery_enabled`
     - `_embroidery_text`
     - `_embroidery_color`
     - `_embroidery_font`
     - `_embroidery_price`

### Browser Testing

Test on latest 3 versions of:
- ✅ Safari (macOS & iOS)
- ✅ Chrome
- ✅ Firefox
- ✅ Edge

### Responsive Testing

Test at 100% viewport width on:
- ✅ Desktop (1920px, 1440px, 1280px)
- ✅ Tablet (768px, 1024px)
- ✅ Mobile (375px, 414px)

### Accessibility Testing

- ✅ Keyboard navigation
- ✅ Screen reader compatibility
- ✅ Color contrast (WCAG AA)
- ✅ Focus indicators
- ✅ ARIA labels

## Configuration Examples

### Example 1: Simple Configuration
```json
{
  "base_price": 15,
  "colors": [
    {"name": "White", "value": "white", "price": 0},
    {"name": "Gold", "value": "gold", "price": 5}
  ],
  "fonts": [
    {"name": "Serif", "value": "serif", "price": 0},
    {"name": "Script", "value": "script", "price": 3}
  ]
}
```

### Example 2: Product-Specific Options
Product A (Tee Shirt):
- Colors: White, Gold
- Fonts: Serif, Script
- Character limit: 10

Product B (Bag):
- Colors: White only
- Fonts: Serif, Script
- Character limit: 15

## Troubleshooting

### Embroidery section not appearing
- Check that `embroidery_enabled` metafield is set to `true`
- Verify `embroidery_options` metafield contains valid JSON
- Check browser console for JavaScript errors

### Cart updates not working
- Verify cart drawer JavaScript is loaded
- Check that item keys are correctly passed
- Verify Shopify Cart API is accessible
- Check browser console for errors

### Price not calculating correctly
- Verify JSON structure in `embroidery_options`
- Check that price values are numbers
- Verify base_price is set correctly

## Support

For issues or questions, refer to:
- Implementation approach document: `EMBROIDERY_IMPLEMENTATION_APPROACH.md`
- Shopify Dawn theme documentation
- Tailwind CSS documentation

## License

This implementation follows Shopify theme best practices and is designed for use with the Dawn theme.

