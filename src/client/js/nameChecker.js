// Confirm if the field value is a link or text

function checkInput(inputText) {
    const reURL = new RegExp(/((https?)\:\/\/)?(\w{3}\.)?\w+\.(edu|com|org|\w{2}(.\w{2})?)/)
    const reEmail = new RegExp(/\w+.\w+@\w+.\w+$/);
    if (!reEmail.test(inputText) && inputText != "" && inputText.length > 5) {
        if (reURL.test(inputText)) {
            return "url";
        } else {
            return "txt";
        }
    } else {
        return "invalid";
    }
}

export { checkInput }
