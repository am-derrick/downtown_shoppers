/**
 * Validates a Ugandan phone number
 * Accepts numbers in the format:
 * - Starting with 0 followed by 9 digits (e.g., 0700000000)
 * - Starting with +256 followed by 9 digits (e.g., +256700000000)
 * 
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if the phone number is valid, false otherwise
 */
export const isValidUgandanPhone = (phone) => {
    // Return false for empty or undefined values
    if (!phone) return false;
    
    // Remove any whitespace from the number
    const cleaned = phone.replace(/\s+/g, '');
    
    // Check for valid formats using regex
    const phoneRegex = /^(?:\+256|0)\d{9}$/;
    
    return phoneRegex.test(cleaned);
};