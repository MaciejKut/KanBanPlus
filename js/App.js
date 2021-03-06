// OGÓLNA FUNKCJA
// function randomString() {
//     var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
//     var str = '';

//     for (var i = 0; i < 10; i++) {
//         str += chars[Math.floor(Math.random() * chars.length)];
//         //    console.log('Numer pętli: ' + i + ' value of ' + str);
//     }

//     return str;
// }

function generateTemplate(name, data, basicElement) {
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement || 'div');

    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);

    return element;
}

var baseUrl = 'https://cors-anywhere.herokuapp.com/' + 'kodilla.com/pl/bootcamp-api';
var myHeaders = {
    "x-client-id": "3775",
    "x-auth-token": "52cfcaa5ec9f044697fe95215f27b966",
    "cache-control": "no-cache"
};
fetch(baseUrl + '/board', {
        headers: myHeaders
    })
    .then(function (resp) {
        return resp.json();
    })
    .then(function (resp) {
        setupColumns(resp.columns);
    });

function setupColumns(columns) {
    columns.forEach(function (column) {
        var col = new Column(column.id, column.name);
        board.addColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
    cards.forEach(function (card) {
        var cardObj = new Card(card.id, card.name);
        col.addCard(cardObj);
    })
}