import React from 'react';

const BlendItLogo: React.FC = () => {
  return (
    <div className="flex items-center text-4xl font-extrabold tracking-tight">
      {/* The "blend" part of the logo */}
      <span className="text-orange-500">blend</span>

      {/* The ":" separator that adapts to the theme */}
      <span className="text-black dark:text-white">:</span>

      {/* The "it" part of the logo */}
      <span className="text-orange-500">it</span>
    </div>
  );
};

export default BlendItLogo;