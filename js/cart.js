function getCartItems()
{
    db.collection("cart-items").onSnapshot((snapshot) => {
        let cartItems =[];
        snapshot.docs.forEach((doc) => {
            cartItems.push({
                id:doc.id,
                ...doc.data()
                // image:doc.data().image,
                // name:doc.data().name,
                // make:doc.data().make,
                // rating:doc.data().rating,
                // price:doc.data().price,

            });
        })
        generateCartItems(cartItems);
        getTotalCost(cartItems);
    })
}

function getTotalCost(items)
{
    let totalCost = 0;
    items.forEach((item) => {
        totalCost += (item.price * item.quantity);
    })
    document.querySelector('.total-cost-number').innerText = 
    numeral(totalCost).format('$0,0.00');

}

function increaseCount(itemId){
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc){
        if(doc.exists)
        {
            if(doc.data().quantity > 0)
            {
                cartItem.update({
                    quantity: doc.data().quantity+1
                })
            }
        }
    })
}

function deleteItem(itemId)
{
    db.collection("cart-items").doc(itemId).delete();
}

function decreaseCount(itemId){
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc){
        if(doc.exists)
        {
            if(doc.data().quantity > 1)
            {
                cartItem.update({
                    quantity: doc.data().quantity-1
                })
            }
        }
    })
}

function generateCartItems(cartItems)

{
    let itemsHTML = "";
    cartItems.forEach((item) => {
        itemsHTML += `               
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-brand">${item.make}</div>
            </div>
            <div class="cart-item-counter">
                <div data-id="${item.id}" class="chevron-left">
                    <i class="fa fa-chevron-left"></i>
                </div>
                <h4>x${item.quantity}</h4> 
                <div data-id="${item.id}" class="chevron-right">
                    <i class="fa fa-chevron-right"></i>
                </div>
            </div>
            <div class="cart-item-total-cost">
                  ${numeral(item.price * item.quantity).format('$0,0.00')}
            </div>
            <div data-id="${item.id}" class="cart-item-delete">
                <i class="fa fa-times"></i>
            </div>
        </div>
        `
    })
    document.querySelector(".cart-items").innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners()
{
    let decreaseButtons = document.querySelectorAll(".chevron-left");
    let increaseButtons = document.querySelectorAll(".chevron-right");
    deleteButtons = document.querySelectorAll(".cart-item-delete");
    
    decreaseButtons.forEach((button) => {
          button.addEventListener('click',function(){
              decreaseCount(button.dataset.id);
          })
    })

    increaseButtons.forEach((button) => {
        button.addEventListener('click',function(){
            increaseCount(button.dataset.id);
        })
    })
    deleteButtons.forEach((button) => {
        button.addEventListener('click',function(){
            deleteItem(button.dataset.id);
        })
    })
}

getCartItems();
