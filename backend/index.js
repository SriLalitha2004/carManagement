const express = require("express");
const cors = require("cors")
const fs = require('fs');
const csv = require('csv-parser');

const PORT = 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
app.use(cors({
  origin: 'http://localhost:3000' // Allow only this origin
}))

app.post("/login", ()=> {
  fs.createReadStream('./user.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row); // Each row as a JavaScript object
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
}) 
app.post("/create", (req, resp)=>{
  // req => has Userdata 
  // Match with required values.

})
app.get('/cars', async (request, response) => {
    console.log("Hello Cars, I am called from Cars API")
    const {id} = request.params
    const getCarsQuery = `
    select * from cars  where id=${id};`
    const data = await db.get(getCarsQuery)
    response.send({data: "I am data from cars API"})
})

app.post('/carsList', async (request, response) => {
    const {id, title, description, tags} = request.body //Destructuring id column
    const insertCars = `
    INSERT INTO todo (id, title, description, tags)
    VALUES (${id},'${title}','${description}','${tags}');` //Updated the id column inside the SQL Query
    await db.run(insertCars)
    response.send('Car Successfully Added')
    
  })

app.delete('/cars/:carId/', async (request, response) => {
    const {id} = request.params
    const deleteCarsQuery = `
    delete from cars where id=${id};`
    await db.run(deleteCarsQuery)
    response.send('Car Deleted')
  })
