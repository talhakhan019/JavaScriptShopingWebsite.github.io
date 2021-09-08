function getItem(){
    db.collection("items").get().then((querySnapshot) => {
        let items=[];
        querySnapshot.forEach((doc) => {
            items.push({
                id:doc.id,
                image:doc.data().image,
                name:doc.data().name,
                make:doc.data().make,
                rating:doc.data().rating,
                price:doc.data().price,
            });
        });
        generateItems(items);
    });
}

function addToCart(item)
{
    let cartItem = db.collection("cart-items").doc(item.id)
    cartItem.get()
    .then(function(doc){
        if(doc.exists)
        {
            cartItem.update({
                quantity:doc.data().quantity + 1
            });
        }
        else
        {
            cartItem.set({
                image: item.image,
                name: item.name,
                make: item.make,
                rating: item.rating,
                price: item.price,
                quantity:1,
            });
        }
    })
    
    
}

function generateItems(items){
    
    items.forEach((item)=>{
        let doc = document.createElement('div');
        doc.classList.add("main-product");
        doc.innerHTML=`
            <div class="product-image">
                <img class="img-fluid" src="${item.image}" alt="">
            </div>
            <div class="product-name">
                ${item.name}
            </div>
            <div class="product-make">
                ${item.make}
            </div>
            <div class="product-rating">
                ⭐⭐⭐⭐⭐${item.rating}
            </div>
            <div class="product-price">
            ${numeral(item.price).format('$0,0.00')}
            </div>  
        `;
        let addToCartEl = document.createElement("div");
        addToCartEl.classList.add('add-to-cart');
        addToCartEl.innerText = "Add to cart";
        addToCartEl.addEventListener("click",function(){
            addToCart(item);
        })
        doc.appendChild(addToCartEl);
        
        document.querySelector('.main-section-products').appendChild(doc);
    });
    
}

getItem();

// side bar

var sideBar = document.querySelector(".main-sidebar");
function openmenu(){
    if(sideBar.style.display == "flex")
    {
        sideBar.style.display = "none";
    }
    else{
        sideBar.style.display = "flex";
    }
}