# Product Embroidery (Monogramming) Feature - Implementation Approach

## Overview

This document outlines the technical approach for implementing a product embroidery/monogramming feature that allows customers to customize products with personalized text, colors, and fonts. The feature will be integrated into the Shopify Dawn theme using Tailwind CSS and following CORE component best practices.

## Architecture & Technical Approach

### 1. Data Storage & Configuration

#### Shopify Metafields
We will use Shopify metafields to store product-specific embroidery configuration:

**Product Metafields:**
- `custom.embroidery_enabled` (boolean) - Enable/disable embroidery for product
- `custom.embroidery_character_limit` (number) - Maximum characters allowed
- `custom.embroidery_image` (file_reference) - Product-specific embroidery preview image
- `custom.embroidery_options` (json) - JSON object containing:
  - Available colors with pricing
  - Available fonts with pricing
  - Default selections

**Example JSON Structure:**
```json
{
  "colors": [
    {"name": "White", "value": "white", "price": 0, "currency": "GBP"},
    {"name": "Gold", "value": "gold", "price": 5, "currency": "GBP"}
  ],
  "fonts": [
    {"name": "Serif", "value": "serif", "price": 0, "currency": "GBP"},
    {"name": "Script", "value": "script", "price": 3, "currency": "GBP"}
  ],
  "base_price": 15,
  "base_currency": "GBP"
}
```

#### Cart Line Item Properties
Embroidery customization will be stored in cart line item properties:
- `_embroidery_text` - The text to embroider
- `_embroidery_color` - Selected color
- `_embroidery_font` - Selected font
- `_embroidery_price` - Calculated additional price
- `_embroidery_enabled` - Boolean flag

These properties will be visible in Shopify Admin order details.

### 2. Component Structure

#### Product Page Component
**File:** `snippets/product-embroidery.liquid`

**Responsibilities:**
- Display embroidery configuration UI
- Show product-specific image
- Handle color/font selection
- Validate character limits
- Calculate pricing
- Update product form with embroidery data

**Features:**
- Conditional rendering based on metafield
- Responsive design (mobile-first)
- Accessible form controls
- Real-time price calculation
- Character counter
- Preview mockup (if image available)

#### Cart Drawer Component
**File:** `snippets/cart-embroidery.liquid`

**Responsibilities:**
- Display embroidery details for cart items
- Allow editing embroidery options
- Allow adding embroidery to items without it
- Update cart via AJAX
- Show embroidery pricing breakdown

**Features:**
- Inline editing capability
- Add embroidery option for items without it
- Remove embroidery option
- Real-time cart updates
- Visual feedback on changes

### 3. JavaScript Implementation

#### Product Page JavaScript
**File:** `assets/product-embroidery.js`

**Functionality:**
- Handle color/font selection
- Character count validation
- Price calculation
- Update hidden form fields
- Preview updates (if applicable)
- Form validation before add to cart

**Best Practices:**
- Use Web Components API where applicable
- IIFE for global scope
- Early returns for clean code
- Async/await for API calls
- Event delegation where appropriate

#### Cart Drawer JavaScript
**File:** `assets/cart-embroidery.js`

**Functionality:**
- Handle embroidery editing in cart
- Handle adding embroidery to cart items
- Cart update via Shopify Cart API
- Error handling and user feedback
- Maintain cart state

### 4. Styling Approach

#### Tailwind CSS Integration
- Use Tailwind utility classes
- Create reusable component classes with `@apply` where needed
- Avoid arbitrary values where possible
- Use responsive prefixes (sm:, md:, lg:)
- Follow mobile-first approach

#### Design System
- Colors: Use theme colors for consistency
- Typography: Follow Dawn typography scale
- Spacing: Use Tailwind spacing scale
- Components: Match existing Dawn component styles

### 5. Integration Points

#### Product Form Integration
- Add hidden input fields for embroidery data
- Include embroidery price in variant price calculation
- Ensure form submission includes all embroidery data

#### Cart API Integration
- Use Shopify Cart API for updates
- Handle line item property updates
- Maintain cart state consistency
- Error handling for failed updates

#### Shopify Admin Integration
- Line item properties automatically appear in order details
- Format embroidery data for easy reading
- Ensure all customization details are captured

### 6. Configuration Interface

#### Metafield Setup
Clients will configure embroidery via Shopify Admin:
1. Navigate to product settings
2. Configure metafields:
   - Enable/disable embroidery
   - Set character limit
   - Upload embroidery preview image
   - Configure color options with pricing
   - Configure font options with pricing

#### Metafield Definitions
We'll provide metafield definitions that can be imported:
- Namespace: `custom`
- Keys: `embroidery_enabled`, `embroidery_character_limit`, `embroidery_image`, `embroidery_options`

### 7. Accessibility Considerations

- Proper form labels and ARIA attributes
- Keyboard navigation support
- Screen reader announcements
- Focus management
- Color contrast compliance (WCAG AA)
- Semantic HTML structure

### 8. Performance Optimization

- Lazy load embroidery images
- Minimize JavaScript bundle size
- Use efficient DOM queries
- Debounce price calculations
- Cache metafield data where possible

### 9. Browser Compatibility

- Test on latest 3 versions of:
  - Safari (macOS & iOS)
  - Chrome
  - Firefox
  - Edge
- Use feature detection where needed
- Provide fallbacks for older browsers

### 10. Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly controls on mobile
- Optimized layouts for each breakpoint

## Implementation Steps

1. **Setup Phase**
   - Clone/initialize Dawn theme
   - Configure Tailwind CSS
   - Set up metafield definitions

2. **Component Development**
   - Create product embroidery snippet
   - Create cart embroidery snippet
   - Develop JavaScript functionality
   - Style with Tailwind CSS

3. **Integration**
   - Integrate into product template
   - Integrate into cart drawer
   - Test form submissions
   - Test cart updates

4. **Testing & Refinement**
   - Cross-browser testing
   - Responsive testing
   - Accessibility audit
   - Performance optimization

5. **Documentation**
   - Admin setup guide
   - Developer documentation
   - Testing instructions

## File Structure

```
theme/
├── snippets/
│   ├── product-embroidery.liquid
│   └── cart-embroidery.liquid
├── assets/
│   ├── product-embroidery.js
│   └── cart-embroidery.js
├── sections/
│   └── main-product.liquid (modified)
├── templates/
│   └── product.liquid (if needed)
└── config/
    └── metafields.json (for import)
```

## Testing Strategy

### Unit Testing
- JavaScript function testing
- Price calculation validation
- Character limit validation

### Integration Testing
- Product page to cart flow
- Cart editing functionality
- Order creation with embroidery data

### User Testing
- Admin configuration workflow
- Customer customization workflow
- Cart management workflow

## Success Criteria

- ✅ Clients can configure embroidery per product
- ✅ Customers can customize embroidery on product page
- ✅ Customers can edit/add embroidery in cart
- ✅ Embroidery details appear in Shopify Admin orders
- ✅ Responsive across all devices
- ✅ Accessible and performant
- ✅ Cross-browser compatible

