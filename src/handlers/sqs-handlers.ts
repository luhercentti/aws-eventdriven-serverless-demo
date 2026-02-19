import { SQSEvent, SQSHandler, Context } from 'aws-lambda';
import { createLogger } from '../utils/helpers';
import { OrderService } from '../services/order-service';

const logger = createLogger('SQSHandler');
const orderService = new OrderService();

/**
 * SQS message handler with batch processing
 */
export const sqsHandler: SQSHandler = async (event: SQSEvent, context: Context): Promise<void> => {
  logger.info('Processing SQS messages', { 
    requestId: context.requestId,
    messageCount: event.Records.length,
  });

  const failedMessages: string[] = [];

  // Process messages in parallel
  await Promise.allSettled(
    event.Records.map(async (record) => {
      try {
        logger.info('Processing message', { messageId: record.messageId });

        const body = JSON.parse(record.body);
        
        // Example: Process different message types
        switch (body.type) {
          case 'PROCESS_ORDER':
            await processOrder(body.data);
            break;
          case 'SEND_EMAIL':
            await sendEmail(body.data);
            break;
          default:
            logger.warn('Unknown message type', { type: body.type });
        }

        logger.info('Message processed successfully', { messageId: record.messageId });
      } catch (error) {
        logger.error('Error processing message', error, { messageId: record.messageId });
        failedMessages.push(record.messageId);
      }
    })
  );

  if (failedMessages.length > 0) {
    logger.error('Some messages failed to process', undefined, { failedMessages });
    throw new Error(`Failed to process ${failedMessages.length} messages`);
  }

  logger.info('All messages processed successfully');
};

async function processOrder(data: unknown): Promise<void> {
  // Example order processing logic
  logger.info('Processing order', { data });
}

async function sendEmail(data: unknown): Promise<void> {
  // Example email sending logic
  logger.info('Sending email', { data });
}
