const scoreTag = document.getElementById('score-tag');
const agreement = document.getElementById('agreement');
const subjectivity = document.getElementById('subjectivity');
const bar = document.querySelector('.bar');
const irony = document.getElementById('irony');
const inputField = document.getElementById('name');

function handleSubmit(event) {
    event.preventDefault()
    clearFields()
    console.log("starting...");
    // check what text was put into the form field
    let formText = inputField.value;
    const sendToApi =
    {
        'lang': 'en',
        'of': 'json',
        'type': '',
        'message': ''
    };
    sendToApi.type = Client.checkInput(formText);
    if (sendToApi.type != 'invalid') {
        if (sendToApi.type != 'url') {
            sendToApi.message = formText.split(' ').join('%20');
        } else sendToApi.message = formText;
    } else {
        inputField.focus()
        inputField.style.borderColor = "red";
        alert("Please enter text or a URL. No emails please and a word longer than 5 characters.");
        return;
    }
    sendData(sendToApi);
}

function sendData(sendToApi) {
    // send checked link/text to internal server
    console.log("send.....");
    fetch('/sentient', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(sendToApi)
    })
        .then(res => res.json())
        .then(message => {
            console.log("new message", message)
            if (message.status.msg != "OK") {
                throw message;
            } else {
                fillResults(message);
            }
        })
        .catch(err => {
            if (!err.status.code || !err.status.msg) {
                alert("There seems to have been a connection problem...");
                console.log(err);
            } else {
                alert(`There was a problem: 
        Error Code: ${err.status.code}. 
        Message: ${err.status.msg}.
        
        - Please check your link -
        
        Cost: ${err.status.credits} Credit(s)`)
            }
            return;

        });

}

// Fill results into index.html
function fillResults(message) {

    const scoreDictionary = {
        "P+": "Strongly Positive Sentiment",
        "P": "Positive Sentiment",
        "NEU": "Neutral Sentiment",
        "N": "Negative Sentiment",
        "N+": "Strongly Negative Sentiment",
        "NONE": "No Sentiment Found",
    }

    scoreTag.innerHTML = scoreDictionary[message.score_tag];
    agreement.innerHTML = message.agreement;
    subjectivity.innerHTML = message.subjectivity;
    bar.innerHTML = message.confidence + '%';
    const confidenceNumber = parseInt(message.confidence);
    for (let i = 0; i <= confidenceNumber; i++) {
        bar.style.width = `${i}%`;
        if (i > 33 && i < 66) {
            bar.style.backgroundColor = "yellow";
        } else if (i >= 66 && i < 80) {
            bar.style.backgroundColor = "blue";
        } else if (i >= 80) {
            bar.style.backgroundColor = "rgb(119, 233, 26)";
        }
    }
    irony.innerHTML = message.irony;
}

function clearFields() {
    inputField.style.borderColor = "blue";
    scoreTag.innerHTML = '';
    agreement.innerHTML = '';
    subjectivity.innerHTML = '';
    bar.style.width = 0;
    bar.style.backgroundColor = "red";
    bar.innerHTML = '';
    irony.innerHTML = '';
}

export { handleSubmit, sendData, clearFields, fillResults }
