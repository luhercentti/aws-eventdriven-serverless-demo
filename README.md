# AWS Event-Driven TypeScript Demo

> **What is this?** A complete **Order Management System** built with serverless architecture on AWS, demonstrating production-ready patterns for RESTful APIs and event-driven systems using TypeScript.

Modern serverless application demonstrating AWS event-driven architecture using TypeScript, Serverless Framework, and comprehensive testing with **Jest**.

## 🎯 Overview

This proof of concept showcases modern serverless development best practices including:

- **Advanced TypeScript**: Deep expertise in type system, generics, discriminated unions, branded types, and advanced language features
- **Serverless Architecture**: RESTful APIs and event-driven systems using AWS Lambda, API Gateway, EventBridge, SQS, SNS, and DynamoDB
- **Secure & Scalable**: AWS IAM roles, encryption at rest, resilience patterns (retry with exponential backoff), and structured logging
- **Testing**: Comprehensive unit and integration tests using Jest
- **CI/CD**: GitHub Actions pipeline with automated testing and deployment
- **Type Safety**: Runtime validation with Zod schemas combined with TypeScript

## 📁 Project Structure

```
├── src/
│   ├── handlers/           # Lambda function handlers
│   │   ├── order-handlers.ts      # REST API handlers
│   │   ├── event-handlers.ts      # EventBridge handlers
│   │   └── sqs-handlers.ts        # SQS message handlers
│   ├── services/           # Business logic and integrations
│   │   ├── order-service.ts       # Order management service
│   │   ├── event-publisher.ts     # EventBridge publisher
│   │   └── messaging-service.ts   # SQS/SNS services
│   ├── models/            # TypeScript types and schemas
│   │   ├── types.ts              # Advanced TypeScript types
│   │   ├── schemas.ts            # Zod validation schemas
│   │   └── entities.ts           # Domain entities
│   ├── middleware/        # Lambda middleware
│   │   └── lambda-middleware.ts  # Error handling, logging, CORS, validation
│   └── utils/             # Utility functions
│       ├── helpers.ts            # Common utilities
│       └── dynamodb-repository.ts # DynamoDB abstraction
├── tests/
│   ├── unit/              # Unit tests
│   └── integration/       # Integration tests
├── .github/workflows/     # CI/CD pipelines
├── serverless.yml         # Serverless Framework configuration
├── jest.config.js         # Jest configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🚀 Key Features

### 1. Advanced TypeScript Type System

- **Branded Types**: Type-safe IDs (`OrderId`, `CustomerId`, `Email`)
- **Discriminated Unions**: Type-safe event handling
- **Generic Constraints**: Reusable repository and service patterns
- **Mapped Types**: Utility types like `PartialBy`, `DeepPartial`, `DeepReadonly`
- **Type Guards**: Runtime type checking with TypeScript inference
- **Builder Pattern**: Fluent API for constructing complex objects

### 2. RESTful API

RESTful endpoints for order management:

```
POST   /orders              # Create order
GET    /orders              # List orders
GET    /orders/{orderId}    # Get order
PUT    /orders/{orderId}    # Update order
DELETE /orders/{orderId}    # Delete order
```

Features:
- Request validation with Zod schemas
- Middleware composition (error handling, logging, CORS)
- Type-safe request/response handling
- Structured JSON logging

### 3. Event-Driven Architecture

- **EventBridge**: Pub/sub event bus for domain events
- **Event Types**: `ORDER_CREATED`, `ORDER_UPDATED`, `ORDER_DELETED`, `PAYMENT_PROCESSED`
- **Event Handlers**: Type-safe event routing and processing
- **SQS Integration**: Asynchronous message processing with DLQ
- **SNS Notifications**: Push notifications for order events

### 4. Resilience Patterns

- **Retry with Exponential Backoff**: Automatic retry for transient failures
- **Dead Letter Queues**: Failed message handling
- **Optimistic Locking**: Version-based concurrency control
- **Structured Logging**: Correlation IDs and contextual logging
- **Error Handling**: Centralized error handling middleware

### 5. Testing with Jest

```bash
npm test              # Run all tests
npm run test:unit     # Unit tests only
npm run test:integration  # Integration tests only
npm run test:coverage # Coverage report
```

Test coverage includes:
- Service layer unit tests with mocking
- TypeScript utility function tests
- Schema validation tests
- Builder pattern tests
- Event handler tests
- Integration tests for API endpoints

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 20.x or higher
- AWS Account with appropriate credentials
- AWS CLI configured

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file (optional, defaults provided):

```bash
AWS_REGION=us-east-1
LOG_LEVEL=INFO
```

## 📦 Deployment

### Deploy to AWS

```bash
# Deploy to dev environment
npm run deploy

# Deploy to production
npm run deploy:prod

# Remove stack
npm run remove
```

### Local Development

```bash
# Run locally with Serverless Offline
npm run offline

# Watch mode for TypeScript
npm run watch
```

## 🧪 Testing

### Run Tests

```bash
# All tests
npm test

# Watch mode
npm test -- --watch

# Specific test file
npm test -- order-service.test.ts

# Coverage report
npm run test:coverage
```

### Test Structure

- **Unit Tests**: Mock external dependencies, test business logic
- **Integration Tests**: Test Lambda handlers with event simulation
- Coverage threshold: 70% (branches, functions, lines, statements)

## 🔄 CI/CD Pipeline

GitHub Actions workflow includes:

1. **Test Stage**: Linting, unit tests, integration tests, coverage
2. **Build Stage**: TypeScript compilation, Serverless packaging
3. **Deploy Stage**: Automated deployment to dev/prod environments
4. **Security Scan**: npm audit and Snyk security scanning

### Required GitHub Secrets

- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` (dev)
- `AWS_ACCESS_KEY_ID_PROD` / `AWS_SECRET_ACCESS_KEY_PROD` (prod)
- `SNYK_TOKEN` (optional, for security scanning)

## 🏗️ AWS Infrastructure

Deployed resources:

- **API Gateway**: REST API with CORS enabled
- **Lambda Functions**: 7 functions (5 API + 2 event handlers)
- **DynamoDB**: Orders table with GSI for customer queries
- **EventBridge**: Custom event bus for domain events
- **SQS**: Processing queue with DLQ
- **SNS**: Notification topic
- **CloudWatch**: Logs with 7-day retention
- **X-Ray**: Distributed tracing enabled

## 📊 Advanced TypeScript Features Demonstrated

### 1. Conditional Types

```typescript
export type ApiResponse<T, E = Error> = 
  | { success: true; data: T; metadata?: ResponseMetadata }
  | { success: false; error: E; code: ErrorCode };
```

### 2. Branded Types

```typescript
export type Brand<K, T> = K & { __brand: T };
export type OrderId = Brand<string, 'OrderId'>;
```

### 3. Generic Repository Pattern

```typescript
export interface Repository<T, ID> {
  findById(id: ID): Promise<T | null>;
  save(entity: T): Promise<T>;
  // ...
}
```

### 4. Discriminated Unions

```typescript
export type DomainEvent =
  | { type: 'ORDER_CREATED'; payload: OrderCreatedPayload }
  | { type: 'ORDER_UPDATED'; payload: OrderUpdatedPayload }
  // ...
```

### 5. Type Inference from Zod Schemas

```typescript
const createOrderSchema = z.object({...});
export type CreateOrderRequest = z.infer<typeof createOrderSchema>;
```

## 📈 Monitoring & Observability

- **CloudWatch Logs**: Structured JSON logging with correlation IDs
- **X-Ray Tracing**: End-to-end request tracing
- **CloudWatch Metrics**: Lambda invocations, errors, duration
- **Custom Metrics**: API latency, error rates

## 🔒 Security Features

- **IAM Least Privilege**: Function-specific permissions
- **Encryption**: DynamoDB encryption at rest
- **CORS**: Configured for secure cross-origin requests
- **Input Validation**: Zod schema validation on all inputs
- **Error Sanitization**: No sensitive data in error responses

## 🚦 API Examples

### Create Order

```bash
curl -X POST https://your-api.execute-api.us-east-1.amazonaws.com/dev/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "customer-123",
    "customerEmail": "test@example.com",
    "items": [{
      "productId": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Product",
      "quantity": 2,
      "price": 29.99
    }],
    "shippingAddress": {
      "street": "123 Main St",
      "city": "Boston",
      "state": "MA",
      "zipCode": "02101"
    }
  }'
```

### Get Order

```bash
curl https://your-api.execute-api.us-east-1.amazonaws.com/dev/orders/{orderId}
```

### List Orders

```bash
curl https://your-api.execute-api.us-east-1.amazonaws.com/dev/orders?customerId=customer-123&limit=20
```

## 📝 Development Best Practices

1. **Type Safety**: Use strict TypeScript configuration
2. **Error Handling**: Centralized error handling middleware
3. **Testing**: Write tests before deploying
4. **Logging**: Use structured logging with context
5. **Validation**: Validate at the edge with Zod
6. **Documentation**: Document complex type transformations
7. **Code Quality**: Use ESLint and Prettier

## 🤖 AI Code Generation Integration

This project structure is optimized for AI-assisted development:
- Clear separation of concerns
- Well-documented types and interfaces
- Consistent patterns across modules
- Comprehensive examples for AI context

## 📚 Resources

- [Serverless Framework](https://www.serverless.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Jest Testing Framework](https://jestjs.io/)
- [Zod Validation](https://zod.dev/)
- [AWS Lambda Best Practices](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html)

## 📄 License

MIT

---

**Built with ❤️ using TypeScript, AWS, and Serverless Framework**
