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

    var homeMissionTimeline = gsap.timeline();
    homeMissionTimeline.fromTo("#home", {opacity: 1}, {opacity: 0})
                       .fromTo("#mission", {opacity: 0}, {opacity: 1}, "start+=0.001");

    new ScrollMagic.Scene({
        triggerElement: "#home",
        duration: "100%",
        triggerHook: 0
    })
    .setTween(homeMissionTimeline)
    .addTo(controller);

    var missionTimeline = gsap.timeline();
    missionTimeline.fromTo("#mission .intro", {opacity: 0}, {opacity: 1, duration: 0.5});
    document.querySelectorAll("#mission .arrow-section").forEach((section, index) => {
        missionTimeline.fromTo(section, {opacity: 0}, {opacity: 1, duration: 0.5}, `+=0.5`);
    });

    new ScrollMagic.Scene({
        triggerElement: "#mission",
        triggerHook: 0.5,
        reverse: false
    })
    .setTween(missionTimeline)
    .addTo(controller);

    var teamTimeline = gsap.timeline();
    teamTimeline.fromTo("#our-team h2", {opacity: 0}, {opacity: 1, duration: 0.5});
    document.querySelectorAll("#our-team .team-member").forEach((member, index) => {
        teamTimeline.fromTo(member, {opacity: 0}, {opacity: 1, duration: 0.5}, `+=0.1`);
    });

    new ScrollMagic.Scene({
        triggerElement: "#our-team",
        triggerHook: 0.5,
        reverse: false
    })
    .setTween(teamTimeline)
    .addTo(controller);
});