import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
export let options = {
        duration: '30s',
        target: 50
    
};
export default function () {
    // Step 1: Load the homepage
    let res = http.get('https://demoblaze.com/');
    check(res, {
        'homepage loaded': (r) => r.status === 200,
    });
    sleep(1);

    // Step 2: Select a product (randomly)
    const productIds = [
        'Samsung galaxy s6',
        'Nokia lumia 1520',
        'Sony vaio i5',
        'Dell i7 8gb',
        'HP pavilion 15-dk0011nr',
    ];
    const randomProduct = productIds[Math.floor(Math.random() * productIds.length)];

    // Step 3: View the selected product
    res = http.get(`https://demoblaze.com/prod.html?idp_=1`);
    check(res, {
        'product loaded': (r) => r.status === 200,
    });
    sleep(1);

    // Step 4: Add the product to the cart
    const addToCartResponse = http.post('https://demoblaze.com/cart.html', JSON.stringify({ id: randomProduct }), {
        headers: { 'Content-Type': 'application/json' },
    });
    check(addToCartResponse, {
        'product added to cart': (r) => r.status === 200,
    });
    sleep(1);
}
