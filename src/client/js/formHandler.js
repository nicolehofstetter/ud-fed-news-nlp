function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    let requestBody = {
        text: formText
    }

    console.log("formtext"+formText)
    console.log("::: Form Submitted :::")
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
            document.getElementById('polarity').innerHTML = res.polarity
            document.getElementById('subjectivity').innerHTML = res.subjectivity
            document.getElementById('irony').innerHTML = res.irony
        })
}

export {handleSubmit}
