import React from 'react';
import Skeleton from './Skeleton';

/**
 * 💎 Ultra-Realistic Product Node Skeleton
 * Designed to mirror the exact layout of the real ProductCard
 */
const ProductSkeleton = () => {
  return (
    <div className="group relative bg-white dark:bg-slate-900/40 backdrop-blur-xl border border-slate-100 dark:border-slate-800/50 p-4 rounded-[2.5rem] transition-all duration-500 overflow-hidden shadow-sm">
      
      {/* 🔮 Background Glow Simulation (Halki roshni ka ehsas) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/5 blur-[50px] -z-10"></div>

      {/* 🖼️ Hero Image Node: aspect ratio exactly like real card */}
      <div className="relative aspect-[10/11] mb-5">
        <Skeleton className="w-full h-full rounded-[2rem]" />
        
        {/* Top Badges Simulation */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Skeleton className="w-16 h-5 rounded-full" />
        </div>
        <div className="absolute top-4 right-4">
          <Skeleton className="w-12 h-6 rounded-xl" />
        </div>
      </div>

      <div className="px-2 space-y-4">
        {/* Info Section: Category & Brand Node */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Skeleton className="w-20 h-2.5" /> {/* Category */}
            <Skeleton className="w-12 h-2" />    {/* Brand */}
          </div>
          
          {/* Title Node: Two lines simulation for realism */}
          <div className="space-y-1.5">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-2/3 h-5" />
          </div>
        </div>

        {/* 🛡️ Tech Badge Node */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="w-24 h-2.5" />
        </div>

        {/* 💰 Price & Actions Container */}
        <div className="pt-5 border-t-2 border-dashed border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="w-10 h-2" />   {/* Price Label */}
            <Skeleton className="w-28 h-7" />   {/* Actual Price */}
          </div>
          
          {/* Buttons: Circular icons like the real UI */}
          <div className="flex gap-2.5">
            <Skeleton className="w-12 h-12 rounded-2xl" /> {/* Buy Now Btn */}
            <Skeleton className="w-12 h-12 rounded-2xl" /> {/* Add Cart Btn */}
          </div>
        </div>
      </div>

      {/* 🚀 Bottom Tech Line Simulation */}
      <div className="absolute bottom-0 left-12 right-12 h-0.5 bg-slate-100 dark:bg-slate-800/50"></div>
    </div>
  );
};

export default ProductSkeleton;