const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000
const { cleanData, badData } = require('./data.json')

app.use(express.static(path.join(__dirname, '..', 'build')))

app.get('/api', (req, res) => {
    let obj = { 
        sha256: 'helloworld',
        fileSize: '256kb',
        fileType: 'txt',
        fileName: 'shapeShift'
    }
    if (req.query.hash) res.json({ status: 'success', data: obj })
    else if (req.query.url) res.json({ status: 'success', data: obj })
    else res.json({status: 'error', message: 'Requested query not found'})
})

app.get('/api/data/:type', (req, res) => {
    const  { type } = req.params
    if (type === 'clean') res.json({ status: 'success', data: cleanData })
    else if (type === 'bad') res.json({ status: 'success', data: badData })
    else res.json({status: 'error', message: 'Requested params not found'})
})

app.get('/api/url/data', (req, res) => {
    let obj = { 
        sha256: 'helloworld',
        fileSize: '256kb',
        fileType: 'txt',
        fileName: 'shapeShift'
    }
    res.json({ status: 'success', data: obj })
    console.log('Data sent')
})
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
