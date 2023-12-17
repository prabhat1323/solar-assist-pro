import { initializeDialogflow, sendQueryToDialogflow } from "@/lib/dialogflow";

// Initialize the Dialogflow session
const sessionPath = initializeDialogflow();

const  Home = async()=> {

  // Example: Send a query to Dialogflow
  const queryText = 'Hello, how are you?';

  try {
    const response = await sendQueryToDialogflow(sessionPath, queryText);

    // Access the response properties
    console.log('Intent:', response.intent);
    console.log('Fulfillment Text:', response.fulfillmentText);
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
  }

  return (
    <h2>Welcome Solar Assist Pro</h2>
  )
}

export default Home;
