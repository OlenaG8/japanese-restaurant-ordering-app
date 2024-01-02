import { menuArray } from './data.js'

const addBtn = document.getElementById('add_btn')

document.addEventListener('click', function(e){
    if (e.target.dataset.add) {
        handleAddToCardBtn(e.target.dataset.add)
    }
})

function handleAddToCardBtn(itemId) {
    document.getElementById('remove_btn').classList.toggle('hidden')
    console.log("kupa")
    const targetItemObj = menuArray.filter(function(item){
        return item.id = itemId
    })[0]
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
        <div class="quantity_btn">
            <button class="add_btn" id="add_btn">+</button>
            <p class="hidden">0</p>
            <button class="remove_btn hidden">-</button>
        </div>        
    </div>  
</div>
`
}

function render(){
        for (let type of ['ramens', 'sushi', 'drinks']) {
            document.getElementById(type).innerHTML += getFeedHtml(type)
        }
}

render()
