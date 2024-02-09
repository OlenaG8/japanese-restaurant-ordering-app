import { menuArray } from './data.js'

const userInput = document.getElementById('discount-input')
const paymentPopUp = document.getElementById('users-details-pop-up')

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddBtn(parseInt(e.target.dataset.add))
     }
    else if(e.target.dataset.remove){
        handleRemoveBtn(parseInt(e.target.dataset.remove)) 
     }
    else if(e.target.id === 'purchase-button') {
        e.preventDefault()
        handlePayBtn() 
    }
    else if(e.target.id === 'close-btn') {
        closePaymentPopUp() 
    }
    else if(e.target.id === 'pay-btn') {
        e.preventDefault()
        handlePayBtnClick()
    }
    else if(e.target.id === 'new-order') {
        handleNewOrderBtn()
    }
})

window.addEventListener("click", rootClick)

function handlePayBtn() {
    paymentPopUp.style.display = 'flex'
}

let yourOrder = {}
menuArray.forEach((item) => {
    yourOrder[item.id] = 0
})

function rootClick(e) {
    if (paymentPopUp.style.display === "flex" &&
        e.target.id !== "users-details-pop-up" &&
        e.target.id !== "pay-btn" &&
        e.target.id !== "purchase-button" &&
        !paymentPopUp.contains(e.target)) {
            closePaymentPopUp()   
    }
}

function closePaymentPopUp() {
    paymentPopUp.style.display = 'none'
}


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

function handlePayBtnClick() {

    const form = document.getElementById("form")

    if(!form.checkValidity()) {
        alert("Please fill in all the fields")
    } else {
        const usersName = document.getElementById("name")
        document.getElementById("users-details-pop-up").innerHTML = `
        <div class="order-complete-message-section"
            id="order-complete-message-section">
            <h6>Thank you, ${usersName.value}! Your order is on its way!</h6>
            <h7>Please rate your experience</h7>
            <div class="star-container" id="star-container">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
            <button class="new-order" id="new-order">New order</button>
        </div>`

        handleStarClick()
    }

}

function handleStarClick() {
    const stars = document.querySelectorAll(".star-container i")

    stars.forEach((star, index1) => {
        star.addEventListener("click" && "mouseover", () => {
            stars.forEach((star, index2) => {
                index1 >= index2 ? star.classList.add("active") : star.classList.remove("active")
            })
        })
    })
}

function handleNewOrderBtn() {
    window.location.reload()
}