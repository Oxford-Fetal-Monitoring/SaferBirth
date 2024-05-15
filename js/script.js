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

    // Select all elements that should animate on scroll
    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        // Create a timeline for this element
        const elemTimeline = gsap.timeline({ paused: true });
        elemTimeline.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1 });

        // Create scene for each element
        new ScrollMagic.Scene({
            triggerElement: el,
            triggerHook: 0.75,  // Trigger when the element is 75% from the top of the viewport
            reverse: false      // Animation should not reverse when scrolling back up
        })
        .setTween(elemTimeline)
        .addTo(controller);
    });
    gsap.registerPlugin(ScrollTrigger);  // Register ScrollTrigger with GSAP

    const heroSection = document.querySelector('#home');

    // Verify that the element exists
    if (!heroSection) {
        console.error('Hero section not found!');
        return;
    }

    // Zoom and fade out effect for the hero section
    gsap.to(heroSection, {
        scale: 1.9,  // Adjust scale as necessary
        autoAlpha: 0,  // 'autoAlpha' handles both 'opacity' and 'visibility'
        ease: "none",  // No easing for a linear transition
        scrollTrigger: {
            trigger: heroSection,
            start: "top top",  // Start when the top of the hero section hits the top of the viewport
            end: "bottom top",  // End when the bottom of the hero section exits the top of the viewport
            scrub: true,  // Smooth scrubbing effect to sync animation with scroll
            pin: true,  // Pin the section during the animation
            onLeaveBack: () => heroSection.style.position = 'absolute', // Unpin the section when animation is complete
        }
    });
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const yOffset = -66; // Height of the fixed navbar
            const yPosition = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({top: yPosition, behavior: 'smooth'});
        }
    });
});