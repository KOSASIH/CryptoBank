// src/utils/formatter.js

/**
 * Formats a number as currency.
 * @param {number} amount - The amount to format.
 * @param {string} currencySymbol - The currency symbol (e.g., '$', '€').
 * @param {string} locale - The locale for formatting (e.g., 'en-US').
 * @returns {string} - The formatted currency string.
 */
function formatCurrency(amount, currencySymbol = '$', locale = 'en-US') {
    return `${currencySymbol}${amount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Formats a date to a readable string.
 * @param {Date|string} date - The date to format.
 * @param {string} format - The desired format (e.g., 'YYYY-MM-DD', 'MM/DD/YYYY').
 * @returns {string} - The formatted date string.
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateObj = new Date(date);
    
    if (format === 'MM/DD/YYYY') {
        return dateObj.toLocaleDateString('en-US', options);
    } else {
        return dateObj.toISOString().split('T')[0]; // Default to 'YYYY-MM-DD'
    }
}

/**
 * Formats a number with commas as thousands separators.
 * @param {number} number - The number to format.
 * @returns {string} - The formatted number string.
 */
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Formats a percentage value.
 * @param {number} value - The percentage value to format.
 * @returns {string} - The formatted percentage string.
 */
function formatPercentage(value) {
    return `${value.toFixed(2)}%`;
}

module.exports = {
    formatCurrency,
    formatDate,
    formatNumberWithCommas,
    formatPercentage,
};
