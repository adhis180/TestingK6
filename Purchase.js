import { check, sleep } from 'k6';
import http from 'k6/http';

export let options = {
  vus: 10, // Number of virtual users
  duration: '1m', // Test duration
};

export default function () {
  const baseUrl = 'https://www.demoblaze.com/';
  
  // Step 1: Visit the homepage
  let response = http.get(baseUrl);
  check(response, {
    'Homepage loaded successfully': (r) => r.status === 200,
  });

  // Step 2: Browse products (Randomly select a product)
  const productId = Math.floor(Math.random() * 10) + 1; // Random product ID from 1 to 10
  const productUrl = `${baseUrl}prod.html?idp_=${productId}`;
  response = http.get(productUrl);
  check(response, {
    'Product page loaded successfully': (r) => r.status === 200,
  });

  // Step 3: Add product to cart
  const addToCartPayload = JSON.stringify({ id: productId });
  response = http.post(`${baseUrl}cart/add`, addToCartPayload, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(response, {
    'Product added to cart': (r) => r.status === 200,
  });

  // Step 4: Complete purchase (simulate checking out)
  const checkoutPayload = JSON.stringify({
    username: 'testuser', // Replace with a valid username
    password: 'testpass', // Replace with the corresponding password
  });
  response = http.post(`${baseUrl}cart/checkout`, checkoutPayload, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(response, {
    'Purchase completed successfully': (r) => r.status === 200,
  });

  // Step 5: Simulate a short wait time before the next action
  sleep(1);
}
