const fs = require ('fs')
const { resolve } = require('path')

function writeDataToFile (filename, content) {
    fs.writeFileSync (filename, JSON.stringify(content), 'utf-8', (err) => {
        if (err) {
            console.log (err)
        }
    })
}

function getPostData (req) {
    return new Promise ((resolve, reject) => {
        try {
            let body = ''

            // à chaque fois qu'un event 'data' est émis, on ajoute un chunk (morceau de files) à la variable body.
            req.on ('data', (chunk) => {
                body += chunk.toString()
            })
            req.on ('end', () => {
                resolve.body
            })
        } catch (error) {
            reject (error)
        }
    })
}

module.exports = {
    writeDataToFile,
    getPostData
}