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

  if (titleValue === "") {
    document.querySelector('#title').style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (composerValue === "") {
    document.querySelector('#composer').style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (songtypeValue === "") {
    document.querySelector('#songType').style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (songkeyValue === "") {
    document.querySelector('#songKey').style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (locationValue === "") {
    document.querySelector('#location').style.border = "3px solid red"
    dataComplete = false;
  }
  
  if (regionValue === "") {
    document.querySelector('#region').style.border = "3px solid red"
    dataComplete = false;
  }

  if (countryValue === "") {
    document.querySelector('#country').style.border = "3px solid red"
    dataComplete = false;
  }

/*   if (fileValue === undefined) {
    document.querySelector('#noFile').style.opacity = '100'
    dataComplete = false;
  } */

  if (dataComplete) {
    const scoreData = {
      title: titleValue,
      composer: composerValue,
      songtype: songtypeValue,
      songkey: songkeyValue,
      location: locationValue,
      region: regionValue,
      country: countryValue,
      collections: collectionsValue,
      tags: tagsValue
    }

    window.fetch('/score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scoreData)
    }).then(() => {
        document.querySelector('#success').style.opacity = '100'
    }).catch(() => {
        document.querySelector('#fail').style.opacity = '100'
    })
  }
})
