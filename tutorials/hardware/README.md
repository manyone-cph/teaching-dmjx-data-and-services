# Guide Hardware (keyboard, mouse)

This guide will introduce you to using keyboard and mouse input, beyond simply using it for links and buttons and form input. 

## Introduction

Keyboard and mouse are the most common ways to interact with a website (and a computer in general for that matter), and for standard usage there is very little one need to think about to use them. The keyboard works as expected in form fields, and clicking links (anchor tags and buttons) works automatically. 

### Listening for keyboard & mouse events

There are many different types of DOM events, and we'll be looking at some related to the keyboard and mouse. You can add event listeners using  [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), and remove them again using  [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener).

The following events related to the keyboard and mouse are used in this tutorial
- [keydown](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event)
Fired for all keys when pressed down. 
- [keyup](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event)
Fired for all keys when a key is released. 
- [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event)

Besides listening to existing events available in the DOM, we can also use listeners for custom events, which can be sent using [dispatchEvent](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)

## Assignments

### 1. Use the keyboard to move an element

Set up a simple web project using for instance [Codepen](https://codepen.io), or create a project locally. 

We need a container and an element to move (local example):
```html
...
<div id="container">
    <div id="box" style="left: 0px; top: 50%;"></div>
</div>
...
```
container is positioned relative, filling the entire window, and the box is absolute positioned. Give the box a size and a background color so it is visible.

Crate a javascript file, and reference it in the html document
```html
<script src="script.js"></script>
````

In the file ```script.js``` well add an event listener and move the box ```10px``` each time the listener is invoked:

```js
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        var box = document.getElementById('box');
        box.style.left = (parseInt(box.style.left) + 10) + 'px';
    }
});
```

- ```keydown``` event listener is added to the ```document```. Event listeners can be added to any element, and will be listening for events on the specified element. Using window or ducument ensures the events are captured globally. 
- ```event.code```is used to identify which key was pressed, and only move the box in case it is the Space key. See [here for a list of code values](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values), and also check out the [key property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key), which returns the value of the key pressed.

When you run your code, you should see the box move from left to right across the page as you press 'Space'. The movement is quite jerky when holding Space, and there's an extended delay after the first move. This is due to the way operating systems hande key repeats and can vary depending on the operating system and user settings.

To get smooth motion, we're going to set a state on the keyboard event, and then move the box in an animation frame instead. Since we also want to detect when the key is released we'll add an event lister for ```keyup``` too.


### 2. Use the mouse to move an element

### 3. Create a simple game using keyboard or mouse as input
Take a look at the [Flappy Bird learing project](./example) for help with game logic and state management. You can use the example project as a starting point for your own game, or as reference. 

Find an existing game you can clone, or come up with your own idea for a game using either the keyboard or mouse as input. 

Here are a few examples of games that could be cloned:

- **Pong**

## Beyond keyboard and muse
- camera, microphone, arduino?

## Further reading

- [JavaScript Event Listeners Ultimate Guide](https://blog.webdevsimplified.com/2022-01/event-listeners/) on the Web Dev Simplified Blog.
- Serial Port Communication (USB, Bluetooth, etc.)
  - [Arduino](https://www.arduino.cc/)