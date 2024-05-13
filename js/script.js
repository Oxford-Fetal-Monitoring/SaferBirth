document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('#nav-links a');  // Get all nav links
    var controller = new ScrollMagic.Controller();

    burger.addEventListener('click', function() {
        navLinks.classList.toggle('nav-active');
        this.classList.toggle('toggle');
    });

    // Close navbar immediately when a link is clicked
    links.forEach(link => link.addEventListener('click', function() {
        navLinks.style.transition = 'none';  // Remove transition
        navLinks.classList.remove('nav-active');
        navLinks.offsetHeight;  // Trigger reflow to apply transition removal immediately
        navLinks.style.transition = '';  // Reset transition to use CSS value

        burger.classList.remove('toggle');
    }));

    // Create a scene for when the user scrolls to the end of the hero section
    new ScrollMagic.Scene({
        triggerElement: "#home", // point of execution
        duration: "100%", // pin the element for the window height - 1
        triggerHook: 0 // don't trigger until #home hits the top of the viewport
    })
    .setTween(gsap.timeline()
        .fromTo("#home", {opacity: 1}, {opacity: 0}, "start")  // Fade out the hero section
        .fromTo("#mission", {opacity: 0}, {opacity: 1}, "start+=0.001")  // Fade in the mission section
    )
    .addTo(controller);  // assign the scene to the controller

     // Create a timeline for sequential animations
     var missionTimeline = gsap.timeline();

     // Fade in the intro
     missionTimeline.fromTo("#mission .intro", {opacity: 0}, {opacity: 1, duration: 0.5});
 
     // Fade in each arrow-section sequentially
     document.querySelectorAll("#mission .arrow-section").forEach((section, index) => {
         missionTimeline.fromTo(section, {opacity: 0}, {opacity: 1, duration: 0.5}, `+=0.5`);
     });
 
     // Create a ScrollMagic scene
     new ScrollMagic.Scene({
         triggerElement: "#mission",
         triggerHook: 0.5,  // Trigger when #mission is halfway into the viewport
         reverse: false      // Optionally, do not reverse the animation when scrolling back up
     })
     .setTween(missionTimeline)
     .addTo(controller);
});