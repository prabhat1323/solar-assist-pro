// dialogflowModule.js

import { SessionsClient } from '@google-cloud/dialogflow';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config();

const projectId = process.env.NEXT_PUBLIC_DIALOGFLOW_API_KEY;
const credentialsPath = process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS;

if (!projectId || !credentialsPath) {
  console.error('Missing configuration. Make sure NEXT_PUBLIC_DIALOGFLOW_API_KEY and GOOGLE_APPLICATION_CREDENTIALS are set.');
  process.exit(1);
}

const initializeDialogflow = () => {
  const sessionsClient = new SessionsClient({ keyFilename: credentialsPath });
  const sessionPath = sessionsClient.projectAgentSessionPath(projectId, 'your-session-id');
  console.log(projectId);
  return sessionPath;
};

const sendQueryToDialogflow = async (sessionPath, queryText) => {
  const sessionsClient = new SessionsClient({ keyFilename: credentialsPath });

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const [response] = await sessionsClient.detectIntent(request);

    const queryResult = response.queryResult;

    return {
      intent: queryResult.intent.displayName,
      fulfillmentText: queryResult.fulfillmentText,
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { initializeDialogflow, sendQueryToDialogflow };
