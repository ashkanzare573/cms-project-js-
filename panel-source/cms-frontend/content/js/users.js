
let userwrap=document.querySelector('.users-wrap')
let modalcontainer=document.querySelector('.modal-container')
let editmodalcontainer=document.querySelector('.editmodal')
let usernameinput=document.querySelector('#username-input')
let firstnameinput=document.querySelector('#first-name-input')
let lastnameinput=document.querySelector('#last-name-input')
let exitbtn=document.querySelector('.exit')
let mainid=null
window.addEventListener('load',getusers)

// window.addEventListener('load' ,() => {
//     let adminID = localStorage.getItem('loginID')
//     if (!adminID) {
//         location.href = 'http://localhost/sabzlearn-js-creative-projects/panel/cms-frontend/login.html'
//     }
// fetch(`http://localhost:3000/api/admins/${adminID}`)
// .then(res=>res.json())
// .then(admin=>{{
//     document.title=`${admin.firstName} ${admin.lastName}`
// }})

// }) 
// use as module for all js files//////////////////////////////////////////////////////




function getusers(){
    fetch('http://localhost:3000/api/users')
    .then(res=>res.json())
    .then(datas=>{
        userwrap.innerHTML=''
    datas.forEach(data=>{
        console.log(data);
    userwrap.insertAdjacentHTML('beforeend',`<div class="user-box">
    <div class="user-box_left">
        <img src="${data.profile}" class="user-profile-box" alt="">
        <div class="user-detail">
            <h1 class="user-id">
                <span>${data.userName} <!-- username --> </span>
                <span class="user-history"> ${data.created_AT} <!-- history --> </span>
            </h1>
            <h3 class="user-name">${data.firstName} ${data.lastName} <!-- user name (first name and last name) --> </h3>
        </div>
    </div>
    
    <div class="user-btns-group">
        <!-- ! ------------------------------ edit btn ------------------------------- ! -->
        <button onclick="showeditmodal('${data._id}')" class="user-edit-btn">
            edit
        </button>
        <!-- ! ----------------------------- remove btn ------------------------------ ! -->
        <button onclick="showmodal('${data._id}')" class="user-remove-btn">
            remove
        </button>
    </div>
    </div>`)
    
    })
    })

}
// removeeeee//////////////////////////////
function showmodal(userid){
    mainid=userid
    modalcontainer.classList.add('visible')

}

function closemodal(){
modalcontainer.classList.remove('visible')

}

function removeuser(){
fetch(`http://localhost:3000/api/users/${mainid}`,{
method:'DELETE'
}).then(res=>{
    console.log(res)
closemodal()
getusers()
})
}
// edit///////////////////////

function showeditmodal(userid){
mainid=userid
console.log(mainid);
editmodalcontainer.classList.add('visible')

}

function editmodal(event){
    event.preventDefault()
    if (firstnameinput.value.length>3 && lastnameinput.value.length>3 && usernameinput.value.length>7){
    let neweditedData = {
        firstName: firstnameinput.value,
        lastName: lastnameinput.value,
        userName: usernameinput.value,
        profile: 'content/img/profile/banana.png',
    }
    fetch(`http://localhost:3000/api/users/${mainid}`,{
method:'PUT',
headers: {
    "Content-type": "application/json"
},
body:JSON.stringify(neweditedData)
})

.then(res=>{
    console.log(res)
editmodalcontainer.classList.remove('visible')
getusers()
cleareditmodal()
})
}else{
    alert('invalid values')
}
}

function cleareditmodal(){
    firstnameinput.value=''
 lastnameinput.value=''
     usernameinput.value=''

}
function clearInputs () {
    firstnameInput.value = ''
    lastnameInput.value = ''
    usernameInput.value = ''
    firstnameInput.focus()
}

window.addEventListener('keydown',event=>{

if(event.key==='Escape')
editmodalcontainer.classList.remove('visible')
})

exitbtn.addEventListener('click',()=>{
    // localStorage.clear()
location.href='file:///C:/Users/pars/Downloads/73-cms-source(1)/panel-source/cms-frontend/login.html'

})
