function validateUrl(inputUrl) {
    const valid = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(inputUrl);

    if(!valid) {
        alert('Your input is no valid url!');
    }
    return valid;
}

export { validateUrl };
