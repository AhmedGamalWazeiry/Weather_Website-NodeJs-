console.log('client side javascript file is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const massageOne = document.querySelector('#massage1')
const massageTwo = document.querySelector('#massage2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = search.value 
    massageOne.textContent = '....Loading'
fetch('http://localhost:3000/weather?address='+address).then((response)=>{

    response.json().then((data)=>{
        if(data.error){
            massageOne.textContent = 'Error'
            massageTwo.textContent = data.error
        }
        else{
            massageOne.textContent = data.location
            massageTwo.textContent = data.forecast
        }
    })
    
    })
    
})