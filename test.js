function loadImageAndData() {
    const imgElement = document.getElementById('generatedImage');
    // Example element to display dictionary info (make sure this exists in your HTML)
    const infoElement = document.getElementById('infoDisplay');
    // ... (other setup) ...
  
    // *** This URL should point to your Flask endpoint that returns JSON ***
    // *** containing BOTH dictionary data and the base64 image string ***
    const apiUrl = 'http://127.0.0.1:5000/generate-image-and-data';
  
    fetch(apiUrl)
      .then(response => {
          // ... (error handling) ...
          // *** This line parses the entire JSON response from Flask ***
          return response.json();
      })
      .then(data => {
        // 'data' now holds the JavaScript object parsed from the JSON response
        // It should look something like:
        // {
        //   "success": true,
        //   "dictionaryData": { "info": "...", "ticker": "...", ... },
        //   "imageData": "iVBORw0KGgoAAAANSUhEUgA..."
        // }
  
        if (data.success) {
  
          // --- 1. Retrieving and Using the JSON (Dictionary) Data ---
          if (data.dictionaryData && infoElement) {
             // You access your dictionary using 'data.dictionaryData'
             console.log("Dictionary Data:", data.dictionaryData);
  
             // You can access specific items within the dictionary like this:
             let info = data.dictionaryData.info;
             let ticker = data.dictionaryData.ticker;
  
             // Example: Display dictionary data on the page
             infoElement.textContent = `Info: ${info}, Ticker: ${ticker}`;
  
          } else {
             console.warn("Dictionary data missing or display element not found.");
             // Handle case where dictionary data isn't present
          }
  
          // --- 2. Displaying the Image ---
          if (data.imageData) {
             // You access the base64 image string using 'data.imageData'
             // Construct the "Data URL" required by the <img> tag's src attribute
             // Format: 'data:[MIME type];base64,[Base64 data string]'
             imgElement.src = 'data:image/png;base64,' + data.imageData;
          } else {
             console.error("Image data missing in response.");
             // Handle case where image data isn't present
          }
  
        } else {
          // Handle the case where Flask returned success: false
          console.error("API call failed:", data.error);
          // ...
        }
      })
      .catch(error => {
        // Handle fetch errors (network, CORS, etc.)
        console.error('Error fetching image and data:', error);
        // ...
      });
  }
  
  // Remember to have corresponding HTML elements:
  // <p id="infoDisplay"></p>
  // <img id="generatedImage" src="" alt="Generated Image Area">
  // <button onclick="loadImageAndData()">Load</button>