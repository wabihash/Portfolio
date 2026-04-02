'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

import { NAV_ITEMS } from '@/shared/constants/navigation';

export default function Dock() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-3 py-3 glass-card rounded-2xl flex items-center gap-2">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative p-3 rounded-xl transition-all duration-300 hover:bg-white/5 group"
          >
            <item.icon 
              className={cn(
                "w-5 h-5 transition-colors duration-300",
                isActive ? "text-indigo-400" : "text-white/40 group-hover:text-white/60"
              )} 
            />
            
            {/* Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="active-nav"
                className="absolute inset-0 bg-indigo-500/10 rounded-xl -z-10"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              />
            )}

            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-white text-black text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest whitespace-nowrap">
              {item.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
