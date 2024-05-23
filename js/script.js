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

    // Fade out effect for the hero section without scaling
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        new ScrollMagic.Scene({
            triggerElement: heroSection,
            triggerHook: 0,  // Start right at the top
            duration: "100%"  // Covers the whole height of the element
        })
        .setTween(gsap.to(heroSection, { opacity: 0 }))
        .addTo(controller);
    }

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
});
