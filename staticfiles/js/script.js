function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const chatBox = document.getElementById('chat-box');
    const userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);
	 fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sender: "user", message: userInput })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the response for debugging
        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        botMessage.textContent = data[0].text;
        chatBox.appendChild(botMessage);

        if (data[0].image) {
            const img = document.createElement('img');
            img.src = data[0].image;
            document.getElementById('canvas-container').appendChild(img);
        }
    })
    .catch(error => console.error('Error:', error));
    document.getElementById('user-input').value = '';
}
