import { useState, useEffect } from 'react';

export const useShoppingListValidation = (items) => {
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const validateItem = (item) => {
        const itemErrors = {};

        if (!item.name.trim()) {
            itemErrors.name = 'Item name is required';
        }

        if (!item.quantity.trim()) {
            itemErrors.quantity = 'Quantity is required';
        }

        if (item.image && item.image.size > 5000000) {
            itemErrors.image = 'Image must be less than 5MB';
        }

        return itemErrors;
    };

    const validateForm = () => {
        const newErrors = {};
        items.forEach((item, index) => {
            const itemErrors = validateItem(item);
            if (Object.keys(itemErrors).length > 0) {
                newErrors[index] = itemErrors;
            }
        });

        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        validateForm();
    }, [items]);

    return { errors, isValid, validateForm };
};