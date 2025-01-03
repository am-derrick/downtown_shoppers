import React, { useState } from 'react';
import { X } from 'lucide-react';

const ImagePreview = ({ file, onRemove }) => {
    const [preview, setPreview] = useState('');

    React.useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        return () => setPreview('');
    }, [file]);

    if (!preview) return null;

    return (
        <div className="relative inline-block">
            <img
                src={preview}
                alt="Preview"
                className="h-20 w-20 object-cover rounded-lg"
            />
            <button
                onClick={onRemove}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            >
                <X className="w-4 h-4 text-gray-500" />
            </button>
        </div>
    );
};

export default ImagePreview;