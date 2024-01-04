import React from 'react';

const HTMLPreview = ({ htmlContent }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default HTMLPreview;
