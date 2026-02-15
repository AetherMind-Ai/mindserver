// query-api.js
// Removed 'import fetch from "node-fetch";' as fetch is global in Node v18+

async function queryDeployedAPI(prompt) {
  // --- Use localhost for local testing ---
  const deployedUrlBase = "http://localhost:3000"; // <<< Changed for local testing
  // --------------------------------------

  // Commented out the check for the placeholder URL
  // if (!deployedUrlBase.startsWith("https://") || deployedUrlBase.includes("your-vercel-app.vercel.app")) {
  //     console.error("Error: Please replace 'https://your-vercel-app.vercel.app' with your actual deployed Vercel app URL in query-api.js");
  //     process.exit(1);
  // }

  if (!prompt) {
    console.error("Error: Please provide a prompt as a command-line argument.");
    console.log("Usage: node query-api.js \"Your prompt text here\"");
    process.exit(1);
  }

  // Encode the prompt to be safely included in the URL
  const encodedPrompt = encodeURIComponent(prompt);
  const apiUrl = `${deployedUrlBase}/api/prompt/${encodedPrompt}`;

  console.log(`Querying: ${apiUrl}`);

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      // Try to parse error JSON, otherwise use status text
      let errorBody = `HTTP error! status: ${response.status} ${response.statusText}`;
      try {
           const errorJson = await response.json();
           errorBody = `API Error: ${errorJson.error || JSON.stringify(errorJson)}`;
      } catch (parseError) {
          // Ignore if response is not JSON
          const textError = await response.text(); // Get raw text if not JSON
          errorBody += `\nResponse body: ${textError}`;
      }
      throw new Error(errorBody);
    }

    const textResponse = await response.text(); // Get response as plain text
    console.log("\nGemini Response:");
    console.log("--------------------");
    console.log(textResponse);
    console.log("--------------------");

  } catch (error) {
    console.error("\nError fetching data:", error.message);
    process.exit(1); // Exit with error code
  }
}

// Get the prompt from command line arguments
// Use import.meta.url for ES Modules compatibility if needed, but process.argv works here
const userPrompt = process.argv.slice(2).join(" "); // Combine all arguments into a single prompt string

queryDeployedAPI(userPrompt); 