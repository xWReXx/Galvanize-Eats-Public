var proxy = 'https://cors-anywhere.herokuapp.com/'
var cancelArr = []
var order = {}
var price = 0
var totalPrice = 0
var afterTax = 0
var tip = 0
var tipAmount = 0
var afterTip = 0
var fixedPrice = totalPrice.toFixed(2)
var buttonArr = document.getElementsByClassName('addToOrder')
var tableCheckout = document.getElementById('checkoutTable')
var subTotalPrice = document.getElementById('subTotal')
var finalPrice = document.getElementById('finalPrice')
var tipHTML = document.getElementById('tipPrice')
var tableMenu = document.getElementById('menuTable')
var tableCheckout = document.getElementById('checkoutTable')
var inputForm = document.querySelector('form')
var tipARR = document.getElementsByClassName('tipBtn')
var first = document.getElementById('firstName')
var lastName = document.getElementById('lastName')
var phone = document.getElementById('phone')
var email = document.getElementById('email')
var address = document.getElementById('address')
var zipcode = document.getElementById('zipcode')
var state = document.getElementById('state')
var cancelContainer = document.querySelector('.cancelContainer')
var tipContainer = document.querySelector('.tipContainer')

function removeItem (event) {
    var name = event.target.getAttribute('data-name')
    var quantityData = event.target.parentElement.parentElement.childNodes[2]
    var priceTableData = event.target.parentElement.parentElement.childNodes[0]
    if (Number(order[name].quantity) > 0) {
        order[name].quantity--
        order[name].subTotal = Number(event.target.getAttribute('data-totalPrice')) - Number(event.target.getAttribute('data-price'))
        event.target.setAttribute('data-totalPrice', order[name].subTotal)
        totalPrice -= Number(event.target.getAttribute('data-price'))
        tipAmount = totalPrice * tip
        afterTax = (totalPrice * 0.08) + totalPrice + tipAmount
        quantityData.innerHTML = order[name].quantity
        priceTableData.innerHTML = '$' + order[name].subTotal.toFixed(2)
        subTotalPrice.innerHTML = '$' + totalPrice.toFixed(2)
        tipHTML.innerHTML = '$' + tipAmount.toFixed(2)
        finalPrice.innerHTML = '$' + afterTax.toFixed(2)
        console.log(event.target)
    }
}

cancelContainer.addEventListener('click', removeItem)

function addTip (event) {   
    tip = Number(event.target.getAttribute('data-tip'))
    tipAmount = totalPrice * tip
    afterTax = (totalPrice * 0.08) + totalPrice + tipAmount
    subTotalPrice.innerHTML = '$' + totalPrice.toFixed(2)
    tipHTML.innerHTML = '$' + tipAmount.toFixed(2)
    finalPrice.innerHTML = '$' + afterTax.toFixed(2)
    generateTable()          
}

tipContainer.addEventListener('click', addTip)      

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
            tablePrice.innerHTML = '$' + data.menu[i].price
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

        for (let i = 0; i < buttonArr.length; i++) {
            buttonArr[i].addEventListener('click', function (event) {
                var name = event.target.getAttribute('data-name')
                if (order[name]) {
                    order[name].quantity++
                    order[name].subTotal += Number(event.target.getAttribute('data-price'))
                    totalPrice += Number(event.target.getAttribute('data-price'))
                    tipAmount = totalPrice * tip
                    afterTax = (totalPrice * 0.08) + totalPrice + tipAmount
                } else {
                    order[name] = {
                        quantity: 1,
                        price: Number(event.target.getAttribute('data-price')),
                        subTotal: Number(event.target.getAttribute('data-price')),
                        name: event.target.getAttribute('data-name')
                    }
                    totalPrice += Number(event.target.getAttribute('data-price'))
                    tipAmount = totalPrice * tip
                    afterTax = (totalPrice * 0.08) + totalPrice + tipAmount
                }
                generateTable()
            })
        }

        function generateTable() {
            tableCheckout.innerHTML = ''
            var checkoutTR = document.getElementsByClassName('checkoutRows')
            var checkoutTR = document.createElement('tr')
            var priceTH = document.createElement('th')
            var itemTH = document.createElement('th')
            var qunatityTH = document.createElement('th')
            var cancelTH = document.createElement('th')
            tableCheckout.appendChild(checkoutTR)
            checkoutTR.appendChild(priceTH)
            checkoutTR.appendChild(itemTH)
            checkoutTR.appendChild(qunatityTH)
            checkoutTR.appendChild(cancelTH)
            priceTH.innerHTML = 'Price'
            itemTH.innerHTML = 'Item'
            qunatityTH.innerHTML = 'Quantity'
            cancelTH.innerHTML = 'Remove Item'
            subTotalPrice.innerHTML = '$' + totalPrice.toFixed(2)
            finalPrice.innerHTML = '$' + afterTax.toFixed(2)
            tipHTML.innerHTML = '$' + tipAmount.toFixed(2)

            for (var item in order) {
                var fixedSubTotal = order[item].subTotal
                var checkoutTR = document.createElement('tr')
                var priceTD = document.createElement('td')
                var nameTD = document.createElement('td')
                var quantityTD = document.createElement('td')
                var atag1 = document.createElement('a')
                var itag1 = document.createElement('i')
                tableCheckout.appendChild(checkoutTR)
                checkoutTR.appendChild(priceTD)
                itag1.setAttribute('id', order[item].name)              
                priceTD.innerHTML = '$' + fixedSubTotal.toFixed(2)
                checkoutTR.appendChild(nameTD)
                nameTD.innerHTML = item
                checkoutTR.appendChild(quantityTD)
                quantityTD.innerHTML = order[item].quantity
                checkoutTR.appendChild(atag1)
                atag1.appendChild(itag1)
                atag1.setAttribute('class', 'btn-floating btn-medium waves-effect waves-light amber darken-4')
                itag1.setAttribute('class', 'material-icons cancelButton')
                itag1.setAttribute('data-price', order[item].price)
                itag1.setAttribute('data-totalPrice', order[item].subTotal)
                itag1.setAttribute('data-name', order[item].name)
                itag1.innerHTML = 'cancel'
            }        
        }
        
        inputForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var sendOrder = {
                name: first.value + ' ' + lastName.value,
                telephone: phone.value,
                email: email.value,
                address: address.value + ' ' + state[state.selectedIndex].innerHTML + ', ' + zipcode.value,
                finalOrder: order,
                tip: '$' + tipAmount.toFixed(2),
                FinalPrice: '$' + afterTax.toFixed(2)
            }
            var postSettings = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(sendOrder)
            }
            fetch('https://galvanize-eats-api.herokuapp.com/orders', postSettings)
            .then(function(response){
                console.log(response)     
            })
            .catch(console.error)
        })
    })
    .catch(console.error)