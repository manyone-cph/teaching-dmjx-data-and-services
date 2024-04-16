# Browser storage

Web apps can store data directly in a user's browser using several different methods, each with its own use cases and benefits. Here, we’ll explore three key types of browser storage: local storage, session storage, and cookies. These mechanisms are essential for handling data persistence, session management, and state control in web apps.

## Introduction

- Local storage: Allows data to be stored across browser sessions. Data does not expire when the browser is closed and can only be cleared via JavaScript or by the user clearing the browser cache.
- Session storage: Similar to local storage but with a key difference: the data stored in session storage is cleared when the page session ends.
- Cookies: Data stored in key-value pairs in the browser, which the server can access through HTTP requests. Cookies are primarily used for session management, personalization, and tracking.

### Using local storage

```javascript
localStorage.setItem('theme', 'dark');  // Set item
console.log(localStorage.getItem('theme'));  // Retrieve item
localStorage.removeItem('theme');  // Remove item
```

### Using session storage

```javascript
sessionStorage.setItem('cart', JSON.stringify({id: 1, product: 'Book', quantity: 3}));  // Set item
console.log(JSON.parse(sessionStorage.getItem('cart')));  // Retrieve item
sessionStorage.removeItem('cart');  // Remove item
```

### Using cookies

Using vanilla javascript:

```javascript
document.cookie = "username=JohnDoe; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";  // Set cookie
```

Using `js-cookie` library to simplify cookie management:

```bash
npm install js-cookie
```

```javascript
import Cookies from 'js-cookie';

// set a cookie that expires in 7 days
Cookies.set('loggedIn', 'true', { expires: 7, path: '' });

// check if the user is logged in
if (Cookies.get('loggedIn') === 'true') {
  console.log('User is logged in.');
} else {
  console.log('User is not logged in.');
}

// remove the cookie when the user logs out to end the session
Cookies.remove('loggedIn', { path: '' });
```

**Security Note:** Using cookies as shown is simplified and not suitable for production environments. For robust and secure authentication, consider using managed services like Firebase Auth, Auth0, or Auth.js.

## Assignments

### 1. Save user settings in local storage

Local storage is ideal for storing user preferences because it persists data across sessions. This means a user's settings, like theme preference or accessibility options, remain consistent every time they visit your website.

1. Set up a Vite + Vue app with `npm create vite@latest` (or use an existing project).
2. Create a simple settings page where users can choose a theme (light/dark) and clear their preferences.
3. Use local storage to store the preferrence.
4. Make sure the settings page and UI theme reflect the user's choice when they return to the site.

### 2. Store user's shopping cart with session storage

Session storage is perfect for temporary data like a shopping cart because it clears the data when the browser session ends, which can help prevent data from persisting unnecessarily after a user has finished shopping.

1. Set up a Vite + Vue app with `npm create vite@latest` (or use an existing project).
2. Implement a simple shopping feature
    - A product page: three product cards with buy buttons.
    - A cart page where users can view their cart and remove items.
3. When clicking 'Buy' add the item to the list of products in the cart and store the new cart object in session storage.
    - Use JSON parsing and stringifying to store and retrieve the cart object.
4. Implement a cart page where users can view their cart and clear it.
5. Ensure the cart data is cleared when the user closes the browser tab.

### 3. Simple authentication with cookies

Cookies are used for managing sessions and maintaining user state across multiple pages. A simple use case could be to check if a user is logged in as they navigate through different parts of a website.

1. Set up a Vite + Vue app with `npm create vite@latest` (or use an existing project).
2. Create a simple login page with a username and password field.
3. When the user submit the log in form, set a cookie to indicate they are logged in - you don't need to implement a real authentication system, just set the cookie.
4. Check the cookie on each page load to see if the user is still logged in.
5. Implement a logout button that clears the cookie to log the user out.

**Security Note:** Using cookies as shown is simplified and not suitable for production environments. For robust and secure authentication, consider using managed services like Firebase Auth, Auth0, or Auth.js.

### 4. Use VueUse to interact with browser storage

https://vueuse.org/core/useStorage/


Cookie, local storage, indexed db, session storage 
Also include stores like nano store, vuex, redux, etc - they can be synced with local storage, indexed db, etc

## Usecase



## Introduction guide

Difference between cookie, local storage, indexed db, session storage, etc

How to use them...

Potential cases we could use as tutorial examples:
Case: Save a user's settings in local storage
Case: Save a user's shopping cart in session storage
Case: Save a user's login in a cookie

## Further reading