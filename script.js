
// Ürünler için bir JavaScript nesnesi
let cart = {};

// Sepete ürün ekleme fonksiyonu
function addToCart(productName, price) {
    if (cart[productName]) {
        cart[productName].quantity++;
    } else {
        cart[productName] = { price: price, quantity: 1 };
    }
    updateCartUI();
}

// Sepetten ürün çıkarma fonksiyonu
function removeFromCart(productName) {
    if (cart[productName] && cart[productName].quantity > 0) {
        cart[productName].quantity--;
        if (cart[productName].quantity === 0) {
            delete cart[productName];
        }
    }
    updateCartUI();
}

// Sepet UI'sini güncelleme fonksiyonu
function updateCartUI() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Sepet içeriğini temizle
    let total = 0;
    Object.keys(cart).forEach(productName => {
        let product = cart[productName];
        total += product.price * product.quantity;
        cartItemsDiv.innerHTML += `
          <div class="cart-item">
            <span>${productName} - ${product.quantity} adet - ${product.price * product.quantity} TL</span>
            <button onclick="addToCart('${productName}', ${product.price})" style="border-radius: 20px; border: 0px solid; width: 30px;
            padding: 5px;"><i class="fa-solid fa-plus" style="color: #fa0050;"></i></button>
            <button onclick="removeFromCart('${productName}')" style="border-radius: 20px; border: 0px solid; width: 30px;
            padding: 5px; "><i class="fa-solid fa-minus" style="color: #fa0050;"></i></button>
          </div>
        `;
    });
    document.getElementById('cart-total-value').textContent = total.toFixed(2);
}

// Ürün ekleme butonlarına event listener ekleme
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.dataset.productName;
        const price = parseFloat(this.dataset.price);
        addToCart(productName, price);
    });
});



const tabSlider = document.querySelector('.tab-slider');
const btnLeft = document.querySelector('.scroll-btn.left');
const btnRight = document.querySelector('.scroll-btn.right');

function scrollTabs(direction) {
    const tabWidth = tabSlider.scrollWidth / tabSlider.children.length;
    if (direction === 'right') {
        tabSlider.scrollLeft += tabWidth;
    } else {
        tabSlider.scrollLeft -= tabWidth;
    }
}

// Kaydırma butonlarının görünürlüğünü kontrol et
tabSlider.addEventListener('scroll', () => {
    btnLeft.classList.toggle('hidden', tabSlider.scrollLeft <= 0);
    btnRight.classList.toggle('hidden', tabSlider.scrollLeft >= tabSlider.scrollWidth - tabSlider.clientWidth);
});

// İlk yüklemede sağ kaydırma butonunun durumunu kontrol et
window.onload = () => {
    btnRight.classList.toggle('hidden', tabSlider.scrollLeft >= tabSlider.scrollWidth - tabSlider.clientWidth);
};
