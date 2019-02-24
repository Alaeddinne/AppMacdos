
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var fs = require("fs");
var path = require('path');
var csv = require('fast-csv')
var mcdonaldsList = []
var mcdonaldsListFiltrer = []
var port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "./AppMacdos/dist/AppMacdos")));

fs.createReadStream('mcdonalds.csv').pipe(csv())
    .on('data', function (data) {
        for (let i = 0; i < data.length; i++) {
            mcdonaldsList.push(data[0])
        }
    })
    .on('end', function (data) {
        console.log('eeread finishedd');
    })

app.get('*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, './AppMacdos/dist/AppMacdos') });
})

app.post('/GetListMacdos', function (req, res) {
    for (let i = 0; i < mcdonaldsList.length; i++) {
        if (mcdonaldsList[i].split('"')[1] === req.body.etatAmericain) {
            mcdonaldsListFiltrer.push(mcdonaldsList[i])
        }
        if (mcdonaldsList[i].split('"')[1].split(',')[1] === req.body.etatAmericain) {
            mcdonaldsListFiltrer.push(mcdonaldsList[i])
        }
    }
    res.send(mcdonaldsListFiltrer);
    mcdonaldsListFiltrer = []
});

app.listen(port, function () {
    console.log('app listening on port ' + port + '!')
})