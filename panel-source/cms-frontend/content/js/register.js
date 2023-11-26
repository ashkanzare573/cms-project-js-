const $ = document
const firstnameInput = $.querySelector('#firstname-input')
const lastnameInput = $.querySelector('#lastname-input')
const usernameInput = $.querySelector('#username-input')
const firstnameMessage = $.querySelector('#firstname-message')
const lastnameMessage = $.querySelector('#lastname-message')
const usernameMessage = $.querySelector('#username-message')
const submitBtn = $.querySelector('#submit-btn')

let firstnameValid, lastnameValid, usernameValid = null

firstnameInput.addEventListener('keypress', event => {
    console.log('تایپ شد');
    if (event.target.value.length < 3) {
        firstnameMessage.innerHTML = "Firstname is not valid"
        firstnameMessage.classList.remove('valid-message')
        firstnameMessage.classList.add('invalid-message')
        firstnameValid = false
    } else {
        firstnameMessage.innerHTML = "Firstname is valid :))"
        firstnameMessage.classList.remove('invalid-message')
        firstnameMessage.classList.add('valid-message')
        firstnameValid = true
    }
})

lastnameInput.addEventListener('keypress', event => {
    console.log('تایپ شد');
    if (event.target.value.length < 3) {
        lastnameMessage.innerHTML = "LastName is not valid"
        lastnameMessage.classList.remove('valid-message')
        lastnameMessage.classList.add('invalid-message')
        lastnameValid = false
    } else {
        lastnameMessage.innerHTML = "LastName is valid :))"
        lastnameMessage.classList.remove('invalid-message')
        lastnameMessage.classList.add('valid-message')
        lastnameValid = true
    }
})

usernameInput.addEventListener('keypress', event => {
    console.log('تایپ شد');

    if (event.target.value.length < 8) {
        usernameMessage.innerHTML = "UserName is not valid"
        usernameMessage.classList.remove('valid-message')
        usernameMessage.classList.add('invalid-message')
        usernameValid = false
    } else {
        usernameMessage.innerHTML = "UserName is valid :))"
        usernameMessage.classList.remove('invalid-message')
        usernameMessage.classList.add('valid-message')
        usernameValid = true
    }
})

submitBtn.addEventListener('click', event => {
    event.preventDefault()

    if (firstnameValid && lastnameValid && usernameValid) {

        let newUserData = {
            firstName: firstnameInput.value,
            lastName: lastnameInput.value,
            userName: usernameInput.value,
            profile: 'content/img/profile/banana.png',
        }

        fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newUserData)
        }).then(res => {
            console.log(res)
            clearInputs()
        })

    } else {
        alert('لطفا تمامی فیلد ها را درست مقداردهی کنید')
    }

})

function clearInputs () {
    firstnameInput.value = ''
    lastnameInput.value = ''
    usernameInput.value = ''

    firstnameInput.focus()
}
window.addEventListener('load',()=>{
    firstnameInput.value = ''
    lastnameInput.value = ''
    usernameInput.value = ''

})