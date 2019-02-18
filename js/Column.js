function Column(id, name) {
    var self = this;

    this.id = id;
    // console.log('tu jest random string w Column:  ' + this.id);
    this.name = name || 'No name given';
    this.element = generateTemplate('column-template', {
        name: this.name,
        id: this.id
    });

    this.element.querySelector('.column').addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-delete')) {
            self.removeColumn();
        }

        if (event.target.classList.contains('add-card')) {
            var cardName = prompt('Enter the name of the card');
            event.preventDefault();
            fetch(baseUrl + 'card', {
                    method: 'POST',
                    body: {
                        //body qurey
                    }
                })
                .then(function (res) {
                    return res.json();
                })
                .then(function () {
                    // create a new client side card
                });
            self.addCard(new Card(cardName));
        }
    });
}

Column.prototype = {
    addCard: function (card) {
        this.element.querySelector('ul').appendChild(card.element);
    },
    removeColumn: function () {
        var self = this;
        fetch(baseUrl + '/column/' + self.id, {
                method: 'DELETE',
                headers: myHeaders
            })
            .then(function (resp) {
                return resp.json();
            })
            .then(function (resp) {
                console.log('remove column self.element ' + self.element);
                self.element.parentNode.removeChild(self.element);
            })
    }
};