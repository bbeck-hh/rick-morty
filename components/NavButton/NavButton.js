
export function NavButton(buttonId, buttonText) {
    const navButton = document.createElement("button");
    navButton.classList.add("button", `button--${buttonId}`);
    navButton.setAttribute("data-js", `button-${buttonId}`);
    navButton.textContent = `${buttonText}`;
    return navButton
}

