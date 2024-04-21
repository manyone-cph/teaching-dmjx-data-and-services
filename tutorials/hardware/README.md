# Guide: Hardware (keyboard, mouse)

This guide will introduce you to using keyboard and mouse input, beyond simply using it for links and buttons and form input. 

## Introduction

Keyboard and mouse are the most common ways to interact with a website (and a computer in general for that matter), and for basic usage it works without having to do much. The keyboard works as expected in form fields, and clicking links (anchor tags and buttons) works automatically. But, it is also possible to listen for events from keyboard and mouse and handle them manually.

### Listening for keyboard & mouse events

There are many different types of DOM events, and we'll be looking at some related to the keyboard and mouse. You can add event listeners using  [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), and remove them again using  [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener).

The following events related to the keyboard and mouse are used in this tutorial
- [keydown](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event).
Fired for all keys when pressed down. 
- [keyup](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event).
Fired for all keys when a key is released. 
- [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event). Fired when the mouse moves

Besides listening to existing events available in the DOM, we can also use listeners for custom events, and sends events using [dispatchEvent](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)

## Assignments

### 1. Use the keyboard to move an element

Set up a simple web project using for instance [Codepen](https://codepen.io), or create a project locally. 

Add a container and an element to the page:
```html
...
<div id="container">
    <div id="box" style="left: 0px; top: 50%;"></div>
</div>
...
```
The container element should be positioned relative, filling the entire window, and the box positioned absolute. Give the box a size and a background color so it is visible.

Crate a javascript file, and reference it in the html document (not needed if you're in Codepen)
```html
<script src="script.js"></script>
````

In the javascript file we'll add an event listener and move the box ```10px``` each time the listener is invoked:

```js
var box = document.getElementById('box');

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        box.style.left = (parseInt(box.style.left) + 10) + 'px';
    }
});
```

- A ```keydown``` event listener is added to the ```document```. Event listeners can be added to any element, and will listen for events on the specified element. Using window or ducument ensures the events are captured globally. 
- ```event.code```is used to identify which key was pressed, and only move the box in case it is the Space key. See [here for a list of code values](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values), and also check out the [key property](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key), which returns the value of the key pressed.

When you run the code, you should see the box move from left to right across the page as you press 'Space'. The movement is quite jerky when holding Space, and there's an extended delay after the first move. This is due to the way operating systems hande key repeats and can vary depending on the operating system and user settings.

To get smooth motion, we're going to set a state on the keyboard event, and then move the box in an animation frame instead. Since we also want to detect when the key is released we'll add an event lister for ```keyup``` too.

```js
var box = document.getElementById("box");
var isMoving = false;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        isMoving = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space') {
        isMoving = false;
    }
});
```
- Added ```isMoving```variable
- Moved ```box``` variable out of event listener so it is available globally
- Added ```keyup``` listener
- Setting ```isMoving``` to ```true``` if the space key is pressed down
- Setting ```isMoving``` to ```false``` if the space key is released

Now we're no longer moving the box in the event listener, which was causing jerky movement, but simply setting a variable to determine if it should or should not be moving. 

To move the box we'll add an update loop using ```requestAnimationFrame```
```js
function update() {
  if (isMoving) {
    box.style.left = parseInt(box.style.left) + 5 + "px"; //move the box
  }
  requestAnimationFrame(update); // Keep the loop running
}

update() // start the update loop
```
- Move the box if ```isMoving```is true. 
- Reduced the distance to 5px, since the update loops runs at 60fps
- This is a simplified loop. Normally you'd want to ensure that the update runs consistently independent of framerate, by using a timestamp to determine the actual framerate, [see more here](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

When you run the code the box should move smoothly from left to right as long as you keep space pressed, and stop when you relase it.

**Further improvements** 
- Add accelleration and decelleration. So when first pressing the key, the box starts moving slowly and picks up speed over time, reaching some maximum value after a short while. And when the key is released the speed decreeses over time, making the box slow down and come to a smooth stop.
- Try listening for the arrow keys (ArrowDown, ArrowUp, ArrowLeft, ArrowRight) and move the box in the correct direction depedning on what keys are pressed.

### 2. Use the mouse to move an element
In the keyboard project, let's add another element and move it with the mouse:

```html
<div id="container">
    <div id="box" style="left: 0px; top: 50%;"></div>
    <div id="circle" style="left: 0px; top: 0px;"></div>
</div>
```

Use a different color for this element, and add a border radius to turn it into a circle. 

Add another event listener, this time listening for the event ```mousemove```. The event object passed to this event is different than the one we get with keyboard events. It's a [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) and we can use the properties clientX and clientY on that event to get the position of the mouse in the window, and apply that to the circle.

Running your code now should have a circle following the mouse. 

**Further improvements** 
- Can you make the circle follow the mouse with a slight delay? Since the ```mousemove``` event is only called when moving the mouse, we need to move the positioning of the circle to the animation frame, just like we did with the keyboard. Store the mouse position from the event in a variable, and move the circle towards that position in the update loop. 

### 3. Create a simple game using keyboard or mouse as input
Take a look at the [Flappy Bird learning project](./example) for help with game logic and state management. You can use the example project as a starting point for your own game, or as reference. 

Find an existing game you can clone, or come up with your own idea for a game using either the keyboard or mouse as input. Keep it simple, and focus on the game logic and inputs and outputs. If you pick an existing game, consider changing its context by using different graphics.

Here are a few examples of simple games that you can recreate:

- **[Dinosaur game](https://en.wikipedia.org/wiki/Dinosaur_Game)**, the Google endless runner where you control a T-rex running in a desert.
  - Jump action, similar to the Flappy bird example. 
  - Obstacles similar to the Flappy bird example, but more randomly distributed.
  - Simple rectangle intersection can be used for the collision detection, like in the Flappy bird example. 
  - Score and game states, similar to the Flappy bird example.

- **Pong**. Simple table tennis game where two players control paddles to hit a ball back and forth.
  - Use keyboard input to move the paddles using the technique from the first assignement. Two player game
  - Simple rectangle intersection can be used for the collision detection, like in the Flappy bird example. 
  - For the ball to move continously, update it's position in an update loop each frame. Give it an intial random velocity (x, y) when the game starts.
  - When the ball collides with a paddle reverse the x direction of its movement.
  - When the ball collides with the top/bottom of the screen reverse the y direction.
  - When reversing a direction, you can adjust it slightly to create some variation of the bounce.
  - Score and game states, similar to the Flappy bird example. 

- **Asteroids**. Space shooter game where you need to destroy asteroids before they crash into your ship.
  - More complex, as now we need to rotate an element, and then move it in the direction it's pointing. 
  - Use two keys to update the rotation angle. 
  - Apply the angle to the rotation transform of the element.
  - Getting direction vector (x,y) for movement can be done using [sine and cosine](https://gamedev.stackexchange.com/a/172640)
  - Physics with accelleration and inertia can be faked but is still not simple.
  - Wrapping asteroids around the screen by moving them to the opposite side if they are outside the screen.
  - Simple rectangle intersection can be used for the collision detection, like in the Flappy bird example.
  - Shooting. Maybe the obstacle logic fomr Flappy bird can be used as inspiration? 

## Beyond standard keyboard and mouse

### Hardware hacking
For physical computing projects where you need input from a custom built physical interface, using keyboard input can be a great way to keep it simple and reliable. You can either repurpose an existing keyboard for your needs, or use a keyboard controller like the [Ultimarc I-PAC2](https://www.ultimarc.com/control-interfaces/i-pacs/i-pac2/). As long as you just need on/off there's no need to go through a microcontroller like the Ardunio. By mapping to standard keyboard, you can also easily use and test the software without special hardware.

### Arduino
If you need hardware output or more complex inputs, the Arduino is great, and there are lots of examples online. To connect a website project to an Ardunio you can use the [Simple Web Serial](https://github.com/fmgrafikdesign/SimpleWebSerialJS) library, which makes it easy to get started.

### Camera and microphone input
Using camera and microphione as input is beyond this guide, but if you want to get started P5 has some basic examples. Check out the [P5.js microphone input](https://p5js.org/examples/sound-mic-input.html) example and the [P5.js web camera input](https://p5js.org/examples/dom-video-capture.html) example.

## Further reading & resources
- [Flappy bird learning project](./example)
- [JavaScript Event Listeners Ultimate Guide](https://blog.webdevsimplified.com/2022-01/event-listeners/) on the Web Dev Simplified Blog.
- [Physcial computing tutorial](https://makeabilitylab.github.io/physcomp/) on Makeability Lab.
- [Arduino](https://www.arduino.cc/) for physical computing with hardware inpout and output.
  - [Simple Web Serial - Arduino part](https://github.com/fmgrafikdesign/simplewebserial-arduino-library)
  - [Simple Web Serial - Javascript part](https://github.com/fmgrafikdesign/SimpleWebSerialJS)
- [Ultimarc](https://www.ultimarc.com) Arcade controls if you need to build something