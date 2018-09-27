console.log("app.js linked")

var tableMenu = document.getElementById('menuTable')

fetch('https://galvanize-eats-api.herokuapp.com/menu')
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.menu.length; i++) {
            console.log(data.menu[i].price)
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
            atag.setAttribute('class','btn-floating btn-medium waves-effect waves-light amber darken-4 addButton')
            itag.setAttribute('class','material-icons')
            itag.innerHTML = 'add'
        }
    })
    .catch(console.error)