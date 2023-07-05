// Load the messages asynchronously from the CSV file
async function loadMessages() {
  try {
    const response = await fetch('messages.csv');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const csvData = await response.text();
    const messages = Papa.parse(csvData, { header: true, skipEmptyLines: true }).data;

    // Calculate the total weight of all messages
    const totalWeight = messages.reduce((sum, message) => sum + parseInt(message.weight), 0);

    // Generate a random number between 0 and the total weight
    const randomNumber = Math.floor(Math.random() * totalWeight);

    // Select a message based on its weight
    let selectedMessage;
    for (const message of messages) {
      if (randomNumber < parseInt(message.weight)) {
        selectedMessage = message.message;
        break;
      }
      randomNumber -= parseInt(message.weight);
    }

    document.getElementById("message").textContent = selectedMessage;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Call the loadMessages function when the page is loaded
window.onload = loadMessages;
