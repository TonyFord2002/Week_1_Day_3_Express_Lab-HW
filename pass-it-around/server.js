require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

const fs = require('fs') 
const res = require('express/lib/response')
const req = require('express/lib/request')
app.engine('hypatia', (filePath, options, callback) => { 
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)

    const rendered = content.toString()
      .replace('#body#', options.body)
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#','<h1>' + options.message + '</h1>')
      .replace('#content#','<div>' + options.content + '</div>' )
      .replace('#image#', '<img src=' + options.image + '>' )
    return callback(null, rendered)
  })
})
app.set('views', './views') 
app.set('view engine', 'hypatia')


//- On the home page (`get "/"`), users should see:

//- "99 Bottles of beer on the wall"
//- a link that says "take one down, pass it around"
//- this should link to `/98`, where the number represents the number of bottles left.
//- When a number is given in the url (`get "/:number_of_bottles"`), users should see:
//- The number of bottles of beer on the wall (i.e. `98 Bottles of beer on the wall.`)
//- a link to "take one down, pass it around", where the href is number of bottles in the parameter minus 1.
//- If there are 0 bottles left, do not show a link to "take one down"
//- Add a link to start over, which directs the user back to the home page.


app.get('/', (req, res) => {
	res.render('template', { title: '99 Bottles', message: "99 bottles of beer on the wall", content: '<a href="https://www.google.com">Take one down! Pass it around!</a>'})
  })

  
  
  
  
  
  app.listen(port, () => {
    console.log('listening on port: ' + port);
});