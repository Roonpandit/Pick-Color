// script.js

document.addEventListener("DOMContentLoaded", () => {
    const colorPicker = document.getElementById("colorPicker");
    const hexValue = document.getElementById("hexValue");
    const rgbValue = document.getElementById("rgbValue");
    const copyHex = document.getElementById("copyHex");
    const copyRGB = document.getElementById("copyRGB");
    const invertButton = document.getElementById("invertButton");
    const colorHistory = document.getElementById("colorHistory");
    const notification = document.getElementById("notification");

    function updateColorValues(color) {
        hexValue.value = color;
        rgbValue.value = hexToRgb(color);
        document.body.style.backgroundColor = color;

        // Add to color history
        const li = document.createElement("li");
        li.textContent = `${color} / ${rgbValue.value}`;
        li.style.backgroundColor = color;
        li.classList.add("fade-in");
        colorHistory.appendChild(li);
    }

    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgb(${r}, ${g}, ${b})`;
    }

    function invertColor(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = 255 - (bigint >> 16) & 255;
        const g = 255 - (bigint >> 8) & 255;
        const b = 255 - bigint & 255;
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    function copyToClipboard(value) {
        navigator.clipboard.writeText(value).then(() => {
            showNotification("Copied to clipboard!");
        });
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.style.opacity = 1;
        setTimeout(() => notification.style.opacity = 0, 2000);
    }

    colorPicker.addEventListener("input", (e) => {
        const color = e.target.value;
        updateColorValues(color);
    });

    copyHex.addEventListener("click", () => {
        copyToClipboard(hexValue.value);
    });

    copyRGB.addEventListener("click", () => {
        copyToClipboard(rgbValue.value);
    });

    invertButton.addEventListener("click", () => {
        const invertedColor = invertColor(hexValue.value);
        updateColorValues(invertedColor);
    });
});