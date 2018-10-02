console.log("app.js linked")

var tableMenu = document.getElementById('menuTable')
var order = {}
var price = 0

fetch('https://galvanize-eats-api.herokuapp.com/menu')
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.menu.length; i++) {
            var tableRow = document.createElement('tr')
            var tablePrice = document.createElement('td')
            var tableType = document.createElement('td')
            var tableName = document.createElement('td')
            var atag = document.createElement('a')
            var itag = document.createElement('i')

            tableMenu.appendChild(tableRow)
            tableRow.appendChild(tablePrice)
            tablePrice.innerHTML = "$" + data.menu[i].price
            tableRow.appendChild(tableType)
            tableType.innerHTML = data.menu[i].type
            tableRow.appendChild(tableName)
            tableName.innerHTML = data.menu[i].name
            tableRow.appendChild(atag)
            atag.appendChild(itag)
            atag.setAttribute('class', 'btn-floating btn-medium waves-effect waves-light amber darken-4')
            itag.setAttribute('class', 'material-icons addToOrder')
            itag.setAttribute('data-price', data.menu[i].price)
            itag.setAttribute('data-name', data.menu[i].name)
            itag.innerHTML = 'add'
        }

        var buttonArr = document.getElementsByClassName('addToOrder')
        var tableCheckout = document.getElementById('checkoutTable')

        // var headerTR = document.createElement('tr')
        // var priceTH = document.createElement('th')
        // var itemTH = document.createElement('th')
        // var qunatityTH = document.createElement('th')
        // var cancelTH = document.createElement('th')
        // tableCheckout.appendChild(headerTR)
        // headerTR.setAttribute('id', 'checkoutHR')
        // headerTR.appendChild(priceTH)
        // headerTR.appendChild(itemTH)
        // headerTR.appendChild(qunatityTH)
        // headerTR.appendChild(cancelTH)
        // priceTH.innerHTML = 'Price'
        // itemTH.innerHTML = 'Item'
        // qunatityTH.innerHTML = 'Quantity'
        // cancelTH.innerHTML = 'Cancel Item'

        for (let i = 0; i < buttonArr.length; i++) {
            buttonArr[i].addEventListener("click", function (event) {
                var name = event.target.getAttribute('data-name')
                if (order[name]) {
                    order[name].quantity++
                    order[name].price += Number(event.target.getAttribute('data-price'))
                    console.log(typeof (order[name].price))
                } else {
                    order[name] = {
                        quantity: 1,
                        price: Number(event.target.getAttribute('data-price'))
                    }
                }
                generateTable()
            })
        }

        function generateTable() {
            tableCheckout.innerHTML = ""
            for (var item in order) {
                var checkoutTR = document.createElement('tr')
                var priceTD = document.createElement('td')
                var nameTD = document.createElement('td')
                var quantityTD = document.createElement('td')
                var atag1 = document.createElement('a')
                var itag1 = document.createElement('i')
                tableCheckout.appendChild(checkoutTR)
                checkoutTR.appendChild(priceTD)
                priceTD.innerHTML = "$" + order[item].price
                checkoutTR.appendChild(nameTD)
                nameTD.innerHTML = item
                checkoutTR.appendChild(quantityTD)
                quantityTD.innerHTML = order[item].quantity
                checkoutTR.appendChild(atag1)
                atag1.appendChild(itag1)
                atag1.setAttribute('class', 'btn-floating btn-medium waves-effect waves-light amber darken-4')
                itag1.setAttribute('class', 'material-icons cancelItem')
                itag1.setAttribute('data-price', order[item].price)
                itag1.setAttribute('data-name', order[item].name)
                itag1.innerHTML = 'cancel'
            }
            subtractButton()
        }

        function subtractButton(){
        var cancelArr = document.getElementsByClassName('cancelItem')
        }
        for (let i = 0; i < cancelArr.length; i++) {

            cancelArr[i].addEventListener("click", function (event) {
                var name = event.target.getAttribute('data-name')
                if (order[name]) {
                    order[name].quantity--
                    order[name].price -= Number(event.target.getAttribute('data-price'))
                } else {
                    order[name] = {
                        quantity: 1,
                        price: Number(event.target.getAttribute('data-price'))
                    }
                }
                generateTable()
            })
        }
        
    })

    .catch(console.error)