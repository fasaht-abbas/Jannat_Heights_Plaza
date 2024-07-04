"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleScrollClick = void 0;
const handleScrollClick = (targetSection) => {
    const element = document.getElementById(targetSection);
    if (element) {
        const offsetTop = element.offsetTop - 120;
        window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
        });
    }
    else {
        console.error("Element not found!");
    }
};
exports.handleScrollClick = handleScrollClick;
