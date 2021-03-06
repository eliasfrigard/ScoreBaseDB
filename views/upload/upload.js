const submitBtn = document.querySelector('#submit')
const fileBtn = document.querySelector('#file')
const fileLabel = document.querySelector('#fileLabel')

// Input fields.
const titleInput = document.querySelector('#title')
const composerInput = document.querySelector('#composer')
const songTypeInput = document.querySelector('#songType')
const songKeyInput = document.querySelector('#songKey')
const locationInput = document.querySelector('#location')
const regionInput = document.querySelector('#region')
const countryInput = document.querySelector('#country')
const collectionsInput = document.querySelector('#collections')
const tagsInput = document.querySelector('#tags')

// Implement "offline" notification

// Method for displaying filename in fileLabel when uploaded.
fileBtn.addEventListener('change', event => {
  fileLabel.innerText = fileBtn.files[0].name
  fileLabel.style.backgroundColor = 'green'
})

// This method runs when data is submitted.
submitBtn.addEventListener('click', event => {
  event.preventDefault()

  // Get the values from all fields.
  let titleValue = titleInput.value
  let composerValue = composerInput.value
  let songTypeValue = songTypeInput.value
  let songKeyValue = songKeyInput.value
  let locationValue = locationInput.value
  let regionValue = regionInput.value
  let countryValue = countryInput.value
  let collectionsValue = collectionsInput.value
  let tagsValue = tagsInput.value
  const fileValue = fileBtn.files[0]

  // If data is not complete it will not be sent.
  let dataComplete = true;

  if (titleValue === "" || titleValue.length > 50) {
    titleInput.style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (composerValue === "" || composerValue.length > 50) {
    composerInput.style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (songTypeValue === "" || songTypeValue.length > 50) {
    songTypeInput.style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (songKeyValue === "" || songKeyValue.length > 3) {
    songKeyInput.style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (locationValue.length > 50) {
    locationInput.style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (regionValue.length > 50) {
    regionInput.style.border = "3px solid red"
    dataComplete = false;
  }

  if (countryValue === "" || countryValue.length > 50 || !countries.includes(countryValue.toLowerCase())) {
    countryInput.style.border = "3px solid red"
    dataComplete = false;
  }

  // Split and trim collections and tags.
  var collectionsArray
  if (collectionsValue !== "") {
    collectionsArray = collectionsValue.split(',').map(str => str.trim())    
  }

  var tagsArray
  if (tagsValue !== "") {
    tagsArray = tagsValue.split(',').map(str => str.trim())    
  }

  if (dataComplete) {
    let scoreData = {
      title: titleValue,
      composer: composerValue,
      songType: songTypeValue,
      songKey: songKeyValue,
      location: locationValue,
      region: regionValue,
      country: countryValue,
      collections: collectionsArray,
      tags: tagsArray,
      filename: "",
    }

    upload(fileValue, scoreData)
  }
})

// Method for first uploading the file to the server, then data to the database.
const upload = (file, scoreData) => {
  const formData = new FormData()
  formData.append('score', file)

  window.fetch('/score/file', {
    method: 'POST',
    body: formData,
    mode: 'cors',
  }).then(
    response => response.json() // if the response is a JSON object
  ).then((success) => {
    // Update filename from server and send upload data to database.
    scoreData.filename = success.data.filename
    sendUploadData(scoreData)
  }).then(
  ).catch(
    error => console.log(error) // Handle the error response object
  )
}

// Sends data to the database.
const sendUploadData = scoreData => {
  window.fetch('/score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(scoreData)
  }).then(() => {
    // Print success and reload page.
    submitBtn.value = 'SUCCESS!'
    submitBtn.style.backgroundColor = 'green'
    titleInput.style.border = "3px solid green"
    composerInput.style.border = "3px solid green"
    songTypeInput.style.border = "3px solid green"
    songKeyInput.style.border = "3px solid green"
    locationInput.style.border = "3px solid green"
    regionInput.style.border = "3px solid green"
    countryInput.style.border = "3px solid green"
    collectionsInput.style.border = "3px solid green"
    tagsInput.style.border = "3px solid green"

    setTimeout(function() { location.reload() }, 2500)
  }).catch(() => {
    document.querySelector('#fail').style.opacity = '100'
  })
}

const countries = [
  "sweden",
  "finland",
  "norway",
  "denmark",
  "estonia",
  "russia",
  "france",
  "italy",
  "scotland",
  "wales",
  "england",
  "ireland",
  "usa",
  "canada",
  "united kingdoms",
  "poland",
  "germany",
  "belgium",
  "netherlands",
  "spain",
  "greece",
  "albania",
  "turkey",
  "armenia",
  "andorra",
  "austria",
  "belarus",
  "croatia",
  "cyprus",
  "czechia",
  "latvia",
  "iceland",
  "portugal",
  "romania",
  "slovakia",
  "slovenia",
  "switzerland",
]
