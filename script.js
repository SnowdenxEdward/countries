const img = document.querySelector('img') 
const userCountry = document.getElementById('userCountry')
const nativeName = document.getElementById('nativeName')
const population = document.getElementById('population')
const region = document.getElementById('region')
const capital = document.getElementById('capital')
const subRegion = document.getElementById('subRegion')
const topLevelDomain = document.getElementById('topLevelDomain')
const currency = document.getElementById('currency')
const language = document.getElementById('language')
const mode = document.getElementById('mode')

const sunSVG = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
  <path d="M12 2V4M12 20V22M4 12H2M22 12H20M16.95 7.05L18.36 5.64M5.64 18.36L7.05 16.95M16.95 16.95L18.36 18.36M5.64 5.64L7.05 7.05"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const moonSVG = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

mode.innerHTML=moonSVG

window.addEventListener('load',()=>{
    const localStorageMode = localStorage.getItem('mode')
    if (localStorageMode == 'darkmode') {
        document.body.style.backgroundColor="black"
        document.body.style.color="white"
        mode.innerHTML = sunSVG
        toogle = 1 // for load button error
    } else {
        document.body.style.backgroundColor="white"
        document.body.style.color="black"
        mode.innerHTML= moonSVG
    }
})

let toogle = 0
mode.addEventListener('click',()=>{
    if (toogle == 0) {
        document.body.style.backgroundColor="black"
        document.body.style.color="white"
        mode.innerHTML = sunSVG 
        localStorage.setItem('mode','darkmode')
        toogle = 1
    } else {
        document.body.style.backgroundColor="white"
        document.body.style.color="black"
        mode.innerHTML= moonSVG
        localStorage.setItem('mode','lightmode')
        toogle = 0
    }
})
const clickbutton = document.getElementById('clickbutton')
const userInput = document.getElementById('userInput')

clickbutton.addEventListener('click',()=>{
    const country = userInput.value
    const countryAPI = async () =>{
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${country}`)
            const data = await response.json()

            userCountry.innerHTML = userInput.value.toUpperCase()
            img.src = data[0].flags.svg 
          nativeName.innerHTML = `<b>Native Name: </b> ${data[0].name.nativeName[Object.keys(data[0].name.nativeName)[0]].common}`;    
            population.innerHTML =`<b> Population: </b> ${data[0].population}` 
            region.innerHTML =`<b> Region: </b> ${data[0].region}`     
            subRegion.innerHTML =`<b> SubRegion: </b> ${data[0].subregion}` 
            capital.innerHTML =`<b>  Capital: </b> ${data[0].capital }`
            topLevelDomain.innerHTML =`<b> Top Level Domain: </b> ${data[0].tld}` 
            currency.innerHTML =`<b> Currencies: </b> ${Object.keys(data[0].currencies)[0]}`  
            language.innerHTML =`<b>Languages: </b> ${Object.values(data[0].languages)[0]}`;
            // console.log(data[0]);
        } catch (error) {
            console.log(error);
        }
    }
    countryAPI()
}) 
