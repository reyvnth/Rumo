// Example POST method implementation:
async function postData(url = "", data = {}) { 
  const response = await fetch(url, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
    }, 
    body: JSON.stringify(data),  
  });
  return response.json(); 
}

// Function to handle sending the message
async function sendMessage() {
  const questionInput = document.getElementById("questionInput").value;
  document.getElementById("questionInput").value = "";
  document.querySelector(".right2").style.display = "block";
  document.querySelector(".right1").style.display = "none";

  // Populate the questions
  document.getElementById("question1").innerHTML = questionInput;
  document.getElementById("question2").innerHTML = questionInput;

  // Get the answer and populate it
  let result = await postData("/api", {"question": questionInput});
  document.getElementById("solution").innerHTML = result.answer;
}

// Add event listener to the sendButton
document.getElementById("sendButton").addEventListener("click", sendMessage);

// Add event listener to detect "Enter" key press
document.getElementById("questionInput").addEventListener("keyup", function(event) {
  // Check if the pressed key is "Enter"
  if (event.key === "Enter") {
    // Prevent default action (submitting form)
    event.preventDefault();
    // Call the sendMessage function
    sendMessage();
  }
});
