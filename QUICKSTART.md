# Quick Start Guide

## Installation

```bash
npm install
```

## Local Development

```bash
# Run tests
npm test

# Run with local emulation
npm run offline

# Watch mode
npm run watch
```

## Deployment

```bash
# Deploy to dev
npm run deploy

# Deploy to production
npm run deploy:prod
```

## Testing the API

After deployment, you'll get an API endpoint. Test it:

```bash
# Get the endpoint
npm run info

# Create an order
curl -X POST https://YOUR-ENDPOINT/dev/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "customer-123",
    "customerEmail": "test@example.com",
    "items": [{
      "productId": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Test Product",
      "quantity": 1,
      "price": 29.99
    }],
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Boston",
      "state": "MA",
      "zipCode": "02101"
    }
  }'

# Get orders
curl https://YOUR-ENDPOINT/dev/orders
```

## Key Files to Review

1. **serverless.yml** - Infrastructure configuration
2. **src/handlers/** - Lambda functions
3. **src/services/** - Business logic
4. **src/models/types.ts** - Advanced TypeScript patterns
5. **tests/** - Jest test examples

## Common Commands

```bash
npm test              # Run all tests
npm run test:coverage # Coverage report
npm run lint          # Check code quality
npm run build         # Compile TypeScript
npm run deploy        # Deploy to AWS
npm run remove        # Remove from AWS
```

## Need Help?

Check the main [README.md](README.md) for detailed documentation.
