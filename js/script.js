document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('#nav-links a');  // Get all nav links

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
});