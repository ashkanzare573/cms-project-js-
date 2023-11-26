const $ = document
const sessionNameInput = $.querySelector('#session-name-input')
const sessionTimeInput = $.querySelector('#session-time-input')
const sessionPriceInput = $.querySelector('#session-price-input')
const coursesParentDropdown = $.querySelector('#courses-parent-dropdown')
const mainCourseElem = $.querySelector('#main-course')
const sessioncontainer = $.querySelector('.sessions')
let allCoursesListItems = $.querySelectorAll('.session-dropdown-menu-item')
let forminput= $.querySelector('.fm1')
let msg= $.querySelector('.msg')
let modalcontainer=document.querySelector('.modal-container')
let mainid=null

const addNewSessionBtn = $.querySelector('#add-btn')


forminput.addEventListener('keyup',event=>{
if(event.target.value.length<=2){
    
    msg.classList.remove('valid-message')
    msg.classList.add('invalid-message')
    msg.innerHTML='invalid message'
}else{
    msg.innerHTML='valid'
    msg.classList.remove('invalid-message')
    
}
})

allCoursesListItems.forEach(course => {
    course.addEventListener('click', event => {
        mainCourseElem.innerHTML = event.target.innerHTML
    })
})

addNewSessionBtn.addEventListener('click', event => {
    event.preventDefault()
    console.log('جلسه اضافه شد');

    let newSessionData = {
        title: sessionNameInput.value,
        time: sessionTimeInput.value,
        isFree: !Boolean(Number(sessionPriceInput.value)), // !Boolean(Number(0))
        course: mainCourseElem.innerHTML,
    }

    fetch('http://localhost:3000/api/sessions', {
        method: 'POST',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(newSessionData)
    })
        .then(res => {
            console.log(res)
            clearInputs()
            getallusers()
        })
})

function clearInputs () {
sessionNameInput.value = ''
sessionTimeInput.value = ''
    sessionPriceInput.value = ''
    mainCourseElem.innerHTML = 'Course'
}

coursesParentDropdown.addEventListener('click', () => {
    coursesParentDropdown.classList.add('active')
})

window.addEventListener('click', event => {

    if (event.target.id !== 'courses-parent-dropdown') {
        coursesParentDropdown.classList.remove('active')
    }
})

window.addEventListener('load',()=>{
 getallusers()
})

function getallusers(){
    fetch('http://localhost:3000/api/sessions')
    .then(res=>res.json())
    .then(sessions=>{console.log(sessions);
sessioncontainer.innerHTML=''
    sessions.forEach(session=>{

sessioncontainer.insertAdjacentHTML('beforeend',`<div class="session-box">
<div>
    <h1 class="session-name-title">${session.title}</h1>
    <span class="session-category">${session.course}</span>
</div>
<div>
    <span class="session-price-badge">${session.isFree ? 'free' : 'not free'}</span>
    <span class="session-time">${session.time}</span>
    <span style="cursor:pointer" onclick="showmodal('${session._id}')">X</span>
</div>
</div>`)

    })
})

}

function showmodal (userid){
mainid=userid
console.log('jj');
modalcontainer.classList.add('visible')
    
}
function closemodal(){
    modalcontainer.classList.remove('visible')

}

function removeuser(){
    fetch(`http://localhost:3000/api/sessions/${mainid}`, {
        method: 'DELETE',
        headers: {
            "Content-type": 'application/json'
        }
        })
        .then(res=>{
getallusers()
closemodal()

            
        })

    
}



