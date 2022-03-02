const express = require('express')
const { get } = require('http')
const app = express()

const fs = require('fs') 
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

app.get('/greeting/:name', (req, res) => {
	res.render('template2', { title: 'Welcome', message: "Hello, stranger!", content: 'Welcome, ' + req.params.name + ' make yourself at home!'})
  })




app.listen(3000, () => {
    console.log('listening');
});