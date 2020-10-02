const express = require('express')
const router = express.Router()

// Return Index.
router.get('/', async (request, response) => {
  try {
    console.log("yes");
    //response.sendFile('../views/uploading/index.html')
  } catch (error) {
    console.log(error);
  }
})

// Return CSS.
router.get('/style', async (request, response) => {
  try {
    console.log("yes");
    //response.sendFile('../views/uploading/style.css')
  } catch (error) {
    console.log(error);
  }
})

// Return JS.
router.get('/js', async (request, response) => {
  try {
    console.log("yes");
    //response.sendFile('../views/uploading/upload.js')
  } catch (error) {
    console.log(error);
  }
})

// Return background.
router.get('/background', async (request, response) => {
  try {
    console.log("yes");
    //response.sendFile('../views/uploading/background.jpg')
  } catch (error) {
    console.log(error);
  }
})