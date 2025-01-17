import React from 'react';

const TermsSection = ({ section }) => {
  return (
    <div className="space-y-6">
      {/* Pre-content if exists */}
      {section.preContent && (
        <div className="text-gray-600 whitespace-pre-line">
          {section.preContent}
        </div>
      )}

      {/* Table if exists */}
      {section.table && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {section.table.headers.map((header, idx) => (
                  <th
                    key={idx}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {section.table.rows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-6 py-4 text-sm text-gray-600 whitespace-normal"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Subsections if exist */}
      {section.subsections && (
        <div className="space-y-4">
          {section.subsections.map((subsection) => (
            <div key={subsection.id} className="space-y-2">
              <div className="flex space-x-2">
                <span className="font-medium text-gray-700">{subsection.id}</span>
                <div className="text-gray-600">{subsection.content}</div>
              </div>
              
              {/* Nested sub-items if exist */}
              {subsection.subItems && (
                <div className="pl-6 space-y-2">
                  {subsection.subItems.map((item) => (
                    <div key={item.id} className="flex space-x-2">
                      <span className="font-medium text-gray-700">{item.id}</span>
                      <div className="text-gray-600">{item.content}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Post-content if exists */}
      {section.postContent && (
        <div className="text-gray-600 whitespace-pre-line mt-6">
          {section.postContent}
        </div>
      )}
    </div>
  );
};

export default TermsSection;