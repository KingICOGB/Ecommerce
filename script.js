const navToggleButton = document.getElementById("bar");
const navCloseButton = document.getElementById("close");
const navMenu = document.getElementById("navbar");
const mobileViewportQuery = window.matchMedia("(max-width: 799px)");

if (navMenu) {
    initializeNavigationControls();
}

function initializeNavigationControls() {
    applyViewportState(mobileViewportQuery.matches);

    if (mobileViewportQuery.addEventListener) {
        mobileViewportQuery.addEventListener("change", (event) => {
            applyViewportState(event.matches);
        });
    } else if (mobileViewportQuery.addListener) {
        mobileViewportQuery.addListener((event) => {
            applyViewportState(event.matches);
        });
    }

    navToggleButton?.addEventListener("click", () => openNavigation());
    navCloseButton?.addEventListener("click", () => closeNavigation());

    navMenu.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            closeNavigation();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeNavigation();
        }
    });
}

function openNavigation() {
    setNavigationState(true);
}

function closeNavigation() {
    setNavigationState(false);
}

function setNavigationState(isOpen) {
    if (!navMenu) {
        return;
    }

    navMenu.classList.toggle("active", isOpen);
    navMenu.setAttribute("aria-hidden", String(!isOpen));

    if (navToggleButton) {
        navToggleButton.setAttribute("aria-expanded", String(isOpen));
    }
}

function applyViewportState(shouldCollapse) {
    if (!navMenu) {
        return;
    }

    if (shouldCollapse) {
        closeNavigation();
    } else {
        navMenu.classList.remove("active");
        navMenu.setAttribute("aria-hidden", "false");
        if (navToggleButton) {
            navToggleButton.setAttribute("aria-expanded", "false");
        }
    }
}
