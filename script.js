document.addEventListener("DOMContentLoaded", () => {

    // THEME TOGGLE
    const toggleBtn = document.getElementById("themeToggle");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light");
            } else {
                localStorage.setItem("theme", "dark");
            }
        });
    }

    // APPLY SAVED THEME
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

    // FILTER + SEARCH SYSTEM
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".note-card");
    const searchInput = document.getElementById("searchInput");

    let currentFilter = "all";

    function applyFilters() {
        const searchValue = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const category = card.getAttribute("data-category");
            const title = card.querySelector("h3").textContent.toLowerCase();

            const matchesFilter =
                currentFilter === "all" || category === currentFilter;

            const matchesSearch =
                title.includes(searchValue);

            if (matchesFilter && matchesSearch) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // Filter button click
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            currentFilter = button.getAttribute("data-filter");
            applyFilters();
        });
    });

    // Search input
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            applyFilters();
        });
    }

});

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

document.querySelectorAll(".note-card").forEach(card => {
    card.addEventListener("click", function (e) {

        const circle = document.createElement("span");
        const diameter = Math.max(card.clientWidth, card.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.offsetX - radius}px`;
        circle.style.top = `${e.offsetY - radius}px`;
        circle.classList.add("ripple");

        const oldRipple = card.querySelector(".ripple");
        if (oldRipple) oldRipple.remove();

        card.appendChild(circle);

        const link = card.getAttribute("data-link");

        if (link) {
            setTimeout(() => {
                window.location.href = link;
            }, 300);
        }
    });
});

const counters = document.querySelectorAll(".counter");

function startCounters() {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-target"));
        let current = 0;

        const increment = target / 90;

        const update = () => {
            current += increment;

            if (current < target) {
                counter.innerText = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target + "+";
            }
        };

        update();
    });
}

window.addEventListener("load", startCounters);

