function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let url = document.getElementById('url').value;
    Client.checkForName(url);

    let requestBody = {
        url: url
    };

    console.log('::: Form Submitted :::');
    fetch('http://localhost:8081/classify', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    })
        .then(res => res.json())
        .then(function (res) {
            document.getElementById('polarity').innerHTML = res.polarity;
            document.getElementById('subjectivity').innerHTML = res.subjectivity;
            document.getElementById('irony').innerHTML = res.irony;
        });
}

export {handleSubmit};
