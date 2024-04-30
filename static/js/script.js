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




async function sendMessage(question) {
  // If the question is asked from right1, update right2 layout
  if (document.querySelector(".right1").style.display !== "none") {
    document.getElementById("questionInput").innerHTML = questionInput;
    document.querySelector(".right2").style.display = "block";
    document.querySelector(".right1").style.display = "none";
  } else if (document.querySelector(".right2").style.display !== "none") {
   // If the question is asked from right2, extend and add to right2 itself
    // const questionElement = document.createElement('div');
    // questionElement.classList.add("box1");
    // questionElement.textContent = question;
    // document.querySelector(".right2").appendChild(questionElement);
  }
  

  // Populate the question
  document.getElementById("question1").innerHTML = question;

  // Get the answer and populate it
  let result = await postData("/api", { "question": question });
  document.getElementById("solution").innerHTML = result.answer;
}


// Add event listener to the sendButton
document.getElementById("sendButton").addEventListener("click", async function() {
  const questionInput = document.getElementById("questionInput").value;
  document.getElementById("questionInput").value = "";

  // Send the question and get the answer
  const answer = await sendMessage(questionInput);

  // Update the UI with the question and answer
  updateChat(questionInput, answer);
});

// Add event listener to detect "Enter" key press
document.getElementById("questionInput").addEventListener("keyup", async function(event) {
  // Check if the pressed key is "Enter"
  if (event.key === "Enter") {
    // Prevent default action (submitting form)
    event.preventDefault();
    
    const questionInput = document.getElementById("questionInput").value;
    document.getElementById("questionInput").value = "";

    // Send the question and get the answer
    const answer = await sendMessage(questionInput);

    // Update the UI with the question and answer
    updateChat(questionInput, answer);
  }
});

// Function to update the chat UI with the question and answer
function updateChat(question, answer) {
  // Create new elements for the question and answer
  const chatContainer = document.querySelector(".chats-container");
  const chatElement = document.createElement("div");
  chatElement.classList.add("chat");
  chatElement.textContent = question + " - " + answer;

  // Append the new chat element to the chat container
  chatContainer.appendChild(chatElement);
}

document.querySelectorAll(".chat").forEach(chat => {
  chat.addEventListener("click", () => {
      const question = chat.querySelector("span").innerText;
      sendMessage(question);
  });
});

// Add event listener to the "New Destination" button
document.getElementById("newDestinationButton").addEventListener("click", function() {
  // Hide right2 and show right1
  document.querySelector(".right2").style.display = "none";
  document.querySelector(".right1").style.display = "flex";
});

// const deleteButtons = document.querySelectorAll('.delete-button');
// deleteButtons.forEach(button => {
//     button.addEventListener('click', handleDeleteChat);
// });
