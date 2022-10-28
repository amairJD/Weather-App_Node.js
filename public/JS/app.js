// TODO: change site colors based on weather?

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    msgOne.textContent = "loading..."

    const location = search.value
    fetch("/weather?address="+location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            msgOne.textContent = data.forecast;
        })
    })
    
})