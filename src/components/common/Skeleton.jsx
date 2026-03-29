import React from 'react';

/**
 * ⚡ Ultra-Realistic Skeleton Node
 * Features: Infinite Shimmer, Pulse Depth, & Adaptive Backgrounds
 */
const Skeleton = ({ className, variant = "rect" }) => {
  
  // 🎨 Border Radius Mapping for Realism
  const variantStyles = {
    circle: "rounded-full",
    rect: "rounded-[2rem]",
    text: "rounded-lg h-4",
  };

  return (
    <div className={`
      relative overflow-hidden 
      bg-slate-200 dark:bg-slate-800/50 
      ${variantStyles[variant] || variantStyles.rect} 
      ${className}
      before:absolute before:inset-0
      before:-translate-x-full
      before:animate-[shimmer_2s_infinite]
      before:bg-gradient-to-r
      before:from-transparent 
      before:via-white/20 dark:before:via-white/5 
      before:to-transparent
      animate-pulse
    `}>
      {/* 🔮 Embedded CSS Keyframes (Zero Config Needed) */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

      {/* Internal Content (Hidden but maintains structure) */}
      <div className="opacity-0 select-none pointer-events-none">
        &nbsp;
      </div>
    </div>
  );
};

// 📦 Pre-built Realistic Layouts for Azeem's Gadgets
export const ProductSkeleton = () => (
  <div className="bg-white dark:bg-slate-900/40 p-4 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 space-y-6 shadow-sm">
    {/* Product Image Node */}
    <Skeleton className="aspect-[10/11] w-full" />
    
    <div className="px-2 space-y-4">
      {/* Brand & Category Node */}
      <div className="flex justify-between items-center">
        <Skeleton className="w-16 h-3" variant="text" />
        <Skeleton className="w-10 h-3" variant="text" />
      </div>

      {/* Title Node */}
      <Skeleton className="w-3/4 h-6" variant="text" />

      {/* Price & Action Node */}
      <div className="pt-4 border-t-2 border-dashed border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="w-12 h-3" variant="text" />
          <Skeleton className="w-28 h-8" variant="text" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="w-12 h-12 rounded-2xl" />
          <Skeleton className="w-12 h-12 rounded-2xl" />
        </div>
      </div>
    </div>
  </div>
);

export default Skeleton;