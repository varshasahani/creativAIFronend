// Get the toggle button and the root HTML element
const toggleButton = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

// Check and apply the saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
rootElement.setAttribute('data-theme', savedTheme);
toggleButton.textContent = savedTheme === 'light' ? '🌙' : '☀️';

// Add event listener to toggle the theme
toggleButton.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Apply the new theme
    rootElement.setAttribute('data-theme', newTheme);

    // Update the button icon
    toggleButton.textContent = newTheme === 'light' ? '🌙' : '☀️';

    // Save the new theme in localStorage
    localStorage.setItem('theme', newTheme);
});