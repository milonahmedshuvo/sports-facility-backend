import express from 'express'
import cors from 'cors'
const app = express()


// middleware set 
app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {
  res.send('Sports Facility server is runing....')
})


export default app