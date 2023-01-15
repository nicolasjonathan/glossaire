// import http module from node
const { closeSync } = require('fs');
const http = require ('http');
const hostname = '127.0.0.1';
const port = 3000;

// import getGlossaire controller
const { getDefinition, getDefinitions, createDefinition, updateDefinition} = require ('./controllers/glossaireController')

// server create
const server = http.createServer ((req, res) => {  
  if (req.url === '/api/glossaire' && req.method === 'GET') {
    getDefinitions (req, res)
  } else if (req.url.match(/\/api\/glossaire\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[3]
    getDefinition (req, res, id)
  } else if (req.url === '/api/glossaire' && req.method === 'POST') {
    createDefinition (req, res)
  } else if (req.url.match(/\/api\/glossaire\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[3]
    updateDefinition (req, res, id)
  } else {
    res.writeHead (404, {'Content-Type' : 'application/json'})
    res.end (JSON.stringify('Message : ressource not found...'))
  }
});

server.listen (port, hostname, () => {
  console.log (`Server running at http://${hostname}:${port}/`);
});