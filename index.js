import { menuArray } from './data.js'

function getFeedHtml() {
    let feedHtml = ``

    menuArray.forEach(function(item){
        feedHtml += `
            <div class="menu-item">
                <div class="item-inner">
                    <div class="item-photo">
                        <img src="${item.itemPhoto}" class="dish-preview">
                    <div>
                    <div class="menu-details">
                        <h3>${item.name}</h3>
                        <p>${item.ingredients}</p>
                        <h4>${item.price}€</h4>
                    </div>
                        </div>   
                    </div>            
                </div>  
            </div>
            `

    })
    return feedHtml 
}

function render(){
    document.getElementById('menu-container').innerHTML = getFeedHtml()
}

render()