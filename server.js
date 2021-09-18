const express = require("express")
const request = require("request")

const PORT = 8000
const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next()
})

app.get("/:LATLONG", (req, res) => {
  request(
    {
      url: `https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/${req.params.LATLONG}`
    },
    (error, response,  body) => {
      if( error || response.statusCode !== 200 ) {
        return res.status(500).json({ type: "error", message: error })
      }
      res.json(JSON.parse(body))
    }
  )
})

app.listen(PORT, () => {
  console.log(`app running at port ${PORT}`)
})