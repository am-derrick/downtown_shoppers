import React from 'react';

export const ProgressSteps = ({ steps, currentStep }) => {
    return (
        <div className="mb-8 overflow-x-auto">
            <div className="flex justify-between items-center min-w-[600px] md:min-w-full px-2">
                {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <div className={`flex-1 ${currentStep === step.number ? 'text-black' : 'text-gray-400'}`}>
                            <div className="flex items-center">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                    currentStep === step.number ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
                                }`}>
                                    {step.number}
                                </span>
                                <span className="ml-2 text-sm md:text-base whitespace-nowrap">{step.title}</span>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="flex-1 border-t-2 mx-4 border-gray-200" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};