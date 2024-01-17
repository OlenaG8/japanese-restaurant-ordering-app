import { menuArray } from './data.js'

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddBtn(e.target.dataset.add)
     }
    else if(e.target.dataset.remove){
        handleRemoveBtn(e.target.dataset.remove) 
     }
})

let yourOrderArr = []

function findIndexInArray(myArr, itemId) {
    return myArr.find(item => item.id === parseInt(itemId))
}

function handleAddBtn(itemId){
  
    const targetItem = findIndexInArray(menuArray, itemId)
    const selectedItem = findIndexInArray(yourOrderArr, itemId)

    if (selectedItem) {
        targetItem.amount++
    } else {
        targetItem.amount++
        yourOrderArr.push(targetItem)
    }

    document.getElementById("order-preview-con").style.display = "flex"
    renderYourOrder(targetItem)
    render()
}

function handleRemoveBtn(itemId){
    const targetItem = findIndexInArray(menuArray, itemId)
    const selectedItem = findIndexInArray(yourOrderArr, itemId)

    if (targetItem.amount >= 1 && selectedItem !== -1) {
        targetItem.amount--
        yourOrderArr.splice(selectedItem, 1)
    } else if (yourOrderArr.length === 0) {
        document.getElementById("order-preview-con").style.display = "none"
    }
    renderYourOrder(targetItem)
    render()
}

function getItemHtml(item) {
    const buttonsVisibility = item.amount === 0 ? 'hidden' : ''
    
    return `<div class="menu-item">
    <div class="item-inner">
        <div class="item-photo">
            <img src="${item.itemPhoto}" class="dish-preview" alt="${item.name}">
        </div>
        <div class="menu-details">
            <h3>${item.name}</h3>
            <p>${item.ingredients.join(', ')}</p>
            <h4>${item.price}€</h4>
        </div> 
        <div class="btn_container">
            <button class="quantity_btn" data-add="${item.id}">+</button>
            <p class="${buttonsVisibility} quantity-${item.id}">${item.amount}</p>
            <button class="${buttonsVisibility} quantity_btn quantity-${item.id}" data-remove="${item.id}">-</button>
        </div>        
    </div>  
</div>
`
}

function getYourOrderHtml(item) {
    return `
        <li id="item-${item.id}">
            <p>${item.name} x ${item.amount}</p>
            <p>${(item.price * item.amount).toFixed(2)}€</p>
        </li>`
}

function renderYourOrder(item) {
    const orderedItem = findIndexInArray(yourOrderArr, item.id)

    yourOrderArr.forEach((item) => {
        
    })

    if (orderedItem.amount > 1) {
        document.getElementById(`item-${item.id}`).innerHTML = getYourOrderHtml(item)
    } else {
        document.getElementById('list-of-ordered-items').innerHTML += getYourOrderHtml(item)
    }

}


function getFeedHtml(type) {
    return menuArray.filter(item => item.type === type).map(getItemHtml).join('')
}

function render(){
        for (let type of ['ramens', 'sushi', 'drinks']) {
            document.getElementById(type).innerHTML = getFeedHtml(type)
        }
}

render()
