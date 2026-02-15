const fetch = require('node-fetch'); // Use node-fetch for Node.js

// test.js - Terminal version with a hardcoded prompt

async function callApiAndGetResponse() { // Removed userArgument parameter

  // --- Define the final prompt directly --- 
  const finalPrompt = "what is your age";
  // -----------------------------------------

  const encodedPrompt = encodeURIComponent(finalPrompt);
  // Ensure the API URL is correct (adjust port if needed)
  const apiUrl = `http://localhost:3000/api/prompt/${encodedPrompt}`;

  console.log(`\nFinal prompt being sent (decoded for readability):\n${finalPrompt}`);
  console.log(`\nCalling API: ${apiUrl}`);
  console.log("Waiting for response...");

  try {
    // Use fetch from node-fetch
    const response = await fetch(apiUrl);

    if (!response.ok) {
      let errorDetails = `API request failed with status ${response.status}`;
      try {
        const errorText = await response.text();
        errorDetails += `: ${errorText}`;
      } catch (e) {
        console.warn("Could not read error response body:", e);
      }
      throw new Error(errorDetails);
    }

    const responseText = await response.text();

    // --- Print response to the terminal --- 
    console.log(responseText);
    // ------------------------------------

  } catch (error) {
    // --- Print error to the terminal --- 
    console.error("\nError calling API:", error.message);
    if (error.cause) { // Log network-related causes if available
         console.error("Cause:", error.cause);
    }
    console.error("---------------------------\n");
    // ----------------------------------
  } finally {
    // No specific cleanup needed for terminal version usually
    console.log("API call finished.");
  }
}

// --- No need to get input from command line --- 

// Call the function directly
callApiAndGetResponse();