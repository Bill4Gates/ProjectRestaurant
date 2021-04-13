if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger', 'btn-danger-x')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Multumim pentru cumparaturile facute !')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    var elements = document.getElementsByClassName('main-section')[0];
    
    var textValue = buttonClicked.parentElement.parentElement.getElementsByClassName('cart-item-title')[0].innerText
    var intValue = parseInt(textValue, 10)
    
    var rows = elements.children[0]    
    
    if(intValue <= 3)
        row = rows.children[0]
    else 
    {       
        row = rows.children[1]
        intValue -= 3;
    }    
    
    var buttonParent = row.children[intValue - 1]    
    var button = buttonParent.getElementsByClassName("shop-item-button-clicked")[0]   
    
    button.setAttribute("class", "shop-item-button")
    
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    
    if(button.getAttribute("class") == "shop-item-button-clicked")
        button.setAttribute("class", "shop-item-button")
    else button.setAttribute("class", "shop-item-button-clicked")
    
    addItemToCart(title, price)
    updateCartTotal()
}

function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {

            //alert("before: " + cartItems.childElementCount)
            //cartItems = arrayRemove(cartItems.children, cartItems.children[i]) //.splice(i, 1)
            //alert("after: " + cartItems.childElementCount)
            document.getElementsByClassName('cart-items')[0].children[i].remove()// = cartItems
            return
        }
    }
    
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <div class="cart-price cart-column">
            <span class="cart-price cart-column">${price}</span>
            <button class="btn btn-danger" type="button">REMOVE</button>
            <button class="btn btn-danger-x" type="button">x</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('btn-danger-x')[0].addEventListener('click', removeCartItem)
}

function arrayRemove(arr, value) {

   return arr.filter(function(ele){
       return ele != value;
   })
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var price = parseFloat(priceElement.innerText.replace('', ''))
        total = total + price
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + ' Locuri'
}

