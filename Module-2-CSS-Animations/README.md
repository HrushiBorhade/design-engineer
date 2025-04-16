## The beauty of CSS Animations

- CSS animations have specific advantages (no dependencies, hardware acceleration with transform properties) but also significant limitations - they can't create true spring animations, implement exit animations without special techniques, or achieve iOS-level smoothness.
- Performance considerations differ between CSS and JavaScript animations - CSS animations using transform can be hardware-accelerated (remaining smooth even when the main thread is busy), while libraries like Framer Motion using requestAnimationFrame may drop frames under heavy loads.
- Use CSS animations for simpler needs (hover effects, basic enter animations, infinite linear animations) and when bundle size is a critical concern, but consider animation libraries for more sophisticated, interruptible, and natural-feeling animations.
- For exit animations in React (animating elements being removed from the DOM), either use animation libraries like Framer Motion's AnimatePresence or implement techniques like Radix's approach of suspending element removal until animations complete.
- The ultimate goal should be user experience rather than technical purity - users care about what they see and how it feels, not whether you used CSS or a JavaScript animation library to achieve it.

## Transform

- The CSS transform property is fundamental for animations beyond simple hover effects, allowing elements to be moved (translate), resized (scale), rotated, and positioned in 3D space without affecting document flow.
- For translation, using percentages (like translateY(100%)) creates responsive animations that adapt to element dimensions - useful for components like toast notifications where heights may vary.
- When scaling elements, avoid animating from scale(0) as it looks unnatural - instead, combine a small initial scale (like 0.5) with opacity animation for better visual effect, and remember that scale affects all child elements uniformly.
- 3D transforms (rotateX, rotateY, translateZ) combined with transform-style: preserve-3d and perspective can create sophisticated effects that appear three-dimensional despite being CSS-only.
- Transform order matters significantly (rotate then translate produces different results than translate then rotate), and transform-origin controls the anchor point for transformations, which should be set appropriately for natural-feeling animations (like popovers animating from their trigger point).