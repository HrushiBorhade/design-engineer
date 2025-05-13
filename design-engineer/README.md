# Design Engineer 🤌🏼 

### Notes
- use `ease out` easing curve for user interactive animations (e.g open/close modal)
- `globals.css` has list of all the popular custom easing curves.
- `ease-in-out` (satisfying) can be used when element is already on screen and needs to move in new position or morph
- `ease` hover effects - transition colors, bg, opacity
- for `interruptive animations` use spring animations cause css animations are not interruptive 
- average human reaction time to a visual change is `215ms` (keep duration for animations between 200-300ms)
- Generally use `150ms` for hover transitions , `200ms` for enter and `150ms` exit for modals and popovers