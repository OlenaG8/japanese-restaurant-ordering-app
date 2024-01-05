import { menuArray } from './data.js'

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddBtn(e.target.dataset.add)
     }
    else if(e.target.dataset.remove){
        handleRemoveBtn(e.target.dataset.remove) 
     }
})

function handleAddBtn(itemId){
    document.querySelectorAll(`#quantity-${itemId}`).forEach(operator => operator.style.display = 'visible')
    const targetItem = menuArray.filter(function(item){
        return item.id === parseInt(itemId)
    })[0]
    targetItem.amount++
    render()
}


function handleRemoveBtn(itemId){
    const targetItem = menuArray.filter(function(item){
        return item.id === parseInt(itemId)
    })[0]

    if (targetItem.amount >= 1) {
        targetItem.amount--
    }
    render()
}

function getFeedHtml(type) {
    return menuArray.filter(item => item.type === type).map(getItemHtml).join('')
}

function getItemHtml(item) {
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
            <p id="quantity-${item.id}">${item.amount}</p>
            <button class="quantity_btn" id="quantity-${item.id}" data-remove="${item.id}">-</button>
        </div>        
    </div>  
</div>
`
}

function render(){
        for (let type of ['ramens', 'sushi', 'drinks']) {
            document.getElementById(type).innerHTML = getFeedHtml(type)
        }
}

render()
