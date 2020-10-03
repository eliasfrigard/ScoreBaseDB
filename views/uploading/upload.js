var fs = require ("fs")

const submitBtn = document.querySelector('#submit')

submitBtn.addEventListener('click', event => {
  event.preventDefault()

  let titleValue = document.querySelector('#title').value
  let composerValue = document.querySelector('#composer').value
  let songtypeValue = document.querySelector('#songType').value
  let songkeyValue = document.querySelector('#songKey').value
  let locationValue = document.querySelector('#location').value
  let regionValue = document.querySelector('#region').value
  let countryValue = document.querySelector('#country').value
  let collectionsValue = document.querySelector('#collections').value
  let tagsValue = document.querySelector('#tags').value
  const fileValue = document.querySelector('#file').files[0]

  var dataComplete = true;

  if (titleValue === "" || titleValue.length > 50) {
    document.querySelector('#title').style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (composerValue === "" || composeValue.length > 50) {
    document.querySelector('#composer').style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (songtypeValue === "" || songtypeValue.length > 50) {
    document.querySelector('#songType').style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (songkeyValue === "" || songkeyValue.length > 3) {
    document.querySelector('#songKey').style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (locationValue === "" || locationValue.length > 50) {
    document.querySelector('#location').style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (regionValue === "" || locationValue.length > 50) {
    document.querySelector('#region').style.border = "3px solid red"
    dataComplete = false;
  }

  if (countryValue === "" || locationValue.length > 50) {
    var countryText = fs.readFileSync("./countries.txt")
    var countryText = countryText.split("\n")    

    document.querySelector('#country').style.border = "3px solid red"
    dataComplete = false;
  }

  var collectionsArray
  if (collectionsValue !== "") {
    collectionsArray = collectionsValue.split(',').map(str => str.trim())    
  }

  var tagsArray
  if (tagsValue !== "") {
    tagsArray = tagsValue.split(',').map(str => str.trim())    
  }

  document.querySelector('#submit').style.backgroundColor = 'green'


/*   if (fileValue === undefined) {
    document.querySelector('#noFile').style.opacity = '100'
    dataComplete = false;
  } */

  if (dataComplete) {
    const scoreData = {
      title: titleValue,
      composer: composerValue,
      songType: songtypeValue,
      songKey: songkeyValue,
      location: locationValue,
      region: regionValue,
      country: countryValue,
      collections: collectionsArray,
      tags: tagsArray
    }

    window.fetch('/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scoreData)
    }).then(() => {
	document.querySelector('#submit').style.backgroundColor = 'green'
	document.querySelector('#submit').value = 'SUCCESS!'
        setTimeout(function() { location.reload() }, 1500)
    }).catch(() => {
        document.querySelector('#fail').style.opacity = '100'
    })
  }
})

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
]