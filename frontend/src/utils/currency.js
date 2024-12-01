export const formatCurrency = (amount) => {
    const currency = localStorage.getItem('preferredCurrency') || 'USD';
    const symbols = {
        USD: '$',
        PHP: '₱',
        JPY: '¥',
        EUR: '€',
        GBP: '£'
    };

    return `${symbols[currency]}${amount.toFixed(2)}`;
};