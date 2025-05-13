# Design Engineer 🤌🏼 

## TO-DO List
- Transition of existing element in screen(similar to vercel playground) in my case main content and chat sidebar getting transitioned into place

### Notes
- use `ease out` easing curve for user interactive animations (e.g open/close modal)
- `globals.css` has list of all the popular custom easing curves.
- `ease-in-out` (satisfying) can be used when element is already on screen and needs to move in new position or morph
- `ease` hover effects - transition colors, bg, opacity
- for `interruptive animations` use spring animations cause css animations are not interruptive 
- average human reaction time to a visual change is `215ms` (keep duration for animations between 200-300ms)
- Generally use `150ms` for hover transitions , `200ms` for enter and `150ms` exit for modals and popovers

- Generally use `CSS Animations` for simple hover effects, in/out animations, infinite linear or when you have bundle size issues
- when using `scale()` never animate from scale(0) instead, use initial scale like 0.5
- use `rotateX` and `rotateY` in combination with `transform-style: preserve-3d` for creating 3D effects
- `translateZ` moves the element along the z-axis.You won't see its effect unless you add perspective to the parent element though. `transform-style: preserve-3d` property enables an element to position its children in 3D space