import { menuArray } from './data.js'

const userInput = document.getElementById('discount-input')
const popUp = document.getElementById('users-details-pop-up')

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddBtn(parseInt(e.target.dataset.add))
     }
    else if(e.target.dataset.remove){
        handleRemoveBtn(parseInt(e.target.dataset.remove)) 
     }
    else if(e.target.id === 'purchase-button') {
        handlePayBtn() 
    }
    else if(e.target.id === 'close-btn') {
        closeBtn()
    }
})

function iDontKnowYet() {
    `<h1>Thank you, ${name},! Your order is on its way</h1>
    `
}

function handlePayBtn() {
    popUp.style.display = 'flex'
}

function closeBtn() {
    popUp.style.display = 'none'
}

let yourOrder = {}
menuArray.forEach((item) => {
    yourOrder[item.id] = 0
})

function handleAddBtn(itemId){

    yourOrder[itemId]++

    document.getElementById("order-preview-con").style.display = "flex"
    renderYourOrder()
    render()
}

function handleRemoveBtn(itemId){

    if (yourOrder[itemId] > 0) {
        yourOrder[itemId]--
    } 
    if (Object.values(yourOrder).reduce((total, currentAmount) => total + currentAmount) === 0) {
        document.getElementById("order-preview-con").style.display = "none"
    }
    renderYourOrder()
    render()
}

 function calcTotalPrice() {
    const totalPrice = menuArray
        .filter(item => yourOrder[item.id] > 0)
        .reduce((total, item) => (total + (yourOrder[item.id] * item.price)) * getDiscount(), 0)

    return totalPrice.toFixed(2)
}

userInput.addEventListener('input', function() {
    document.getElementById('total-price').innerHTML = `Total price: ${calcTotalPrice()}€`
} )

function getDiscount() {
    const discountCode = '20FORNEW'
    const inputCode = userInput.value.toUpperCase()

    if (inputCode === discountCode) {
        document.getElementById('discount').innerHTML = `<button class="discount-applied">20% discount applied!</button>`
        return 0.8
    } else {
        return 1
    }
}

function getItemHtml(item) {
    const buttonsVisibility = yourOrder[item.id] === 0 ? 'hidden' : ''
    
    return `<div class="menu-item">
    <div class="item-inner">
        <div class="item-photo">
            <img src="${item.itemPhoto}" class="dish-preview" alt="${item.name}">
        </div>
        <div class="item-details">
            <h3>${item.name}</h3>
            <p>${item.ingredients.join(', ')}</p>
            <h4>${item.price}€</h4>
        </div> 
        <div class="btn_container">
            <button class="quantity_btn" data-add="${item.id}">+</button>
            <p class="${buttonsVisibility} quantity-${item.id}">${yourOrder[item.id]}</p>
            <button class="${buttonsVisibility} quantity_btn quantity-${item.id}" data-remove="${item.id}">-</button>
        </div>        
    </div>  
</div>
`
}

function getYourOrderHtml(item) {
    return `
        <li id="item-${item.id}">
            <h4>${item.name} x ${yourOrder[item.id]}</h4>
            <p>${(item.price * yourOrder[item.id]).toFixed(2)}€</p>
        </li>`
}

function renderYourOrder() {

    const orderHtml = menuArray.filter(item => yourOrder[item.id] > 0).map(getYourOrderHtml).join('')
    document.getElementById('list-of-ordered-items').innerHTML = orderHtml
    document.getElementById('total-price').innerHTML = `Total price: ${calcTotalPrice()}€`
    
}

function getFeedHtml(type) {
    return menuArray.filter(item => item.type === type).map(getItemHtml).join('')
}

function render() {
        for (let type of ['ramens', 'sushi', 'drinks']) {
            document.getElementById(type).innerHTML = getFeedHtml(type)
        }
}

render()
