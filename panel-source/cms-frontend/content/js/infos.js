const $ = document
const firstNameInput = $.querySelector('#first-name-input')
const lastNameInput = $.querySelector('#last-name-input')
const userNameInput = $.querySelector('#username-input')
const newPasswordInput = $.querySelector('#new-password-input')
const confirmPasswordInput = $.querySelector('#confirm-password-input')
const emailInput = $.querySelector('#email-input')
const updateAdminInfoBtn = $.querySelector('.submit-change-info-btn')

window.addEventListener('load', () => {
    let loginAdminID = localStorage.getItem('loginID')

    fetch(`http://localhost:3000/api/admins/${loginAdminID}`)
        .then(res => res.json())
        .then(mainAdmin => {
            console.log(mainAdmin);

            firstNameInput.value = mainAdmin.firstName
            lastNameInput.value = mainAdmin.lastName
            userNameInput.value = mainAdmin.userName
            emailInput.value = mainAdmin.email
        })
})

updateAdminInfoBtn.addEventListener('click', event => {

    event.preventDefault()

    if (newPasswordInput.value === confirmPasswordInput.value) {

        let mainAdminID = localStorage.getItem('loginID')

        let adminNewInfos = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            userName: userNameInput.value,
            password: confirmPasswordInput.value,
            email: emailInput.value,
        }

        fetch(`http://localhost:3000/api/admins/${mainAdminID}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(adminNewInfos)
        })
            .then(res => console.log(res))
    } else {
        alert('پسوردها همخوانی ندارن')
    }


})