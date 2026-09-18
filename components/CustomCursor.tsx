'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Plus } from 'lucide-react';

export type CursorState = 'default' | 'hover' | 'link' | 'active' | 'drag' | 'text' | 'cart';

function subscribeToPointerChange(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia('(pointer: fine)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getIsTouchSnapshot(): boolean {
  if (typeof window === 'undefined') return true;
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  return hasTouch && !isFinePointer;
}

function getIsTouchServerSnapshot(): boolean {
  return true;
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isDarkBackground, setIsDarkBackground] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const isTouch = useSyncExternalStore(
    subscribeToPointerChange,
    getIsTouchSnapshot,
    getIsTouchServerSnapshot
  );

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for high-end luxury feel
  const springConfig = { damping: 38, stiffness: 650, mass: 0.18 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouch) return;

    // Helper to determine if an element has a dark background
    const checkDarkBg = (target: HTMLElement | null): boolean => {
      let current: HTMLElement | null = target;
      while (current && current !== document.body && current !== document.documentElement) {
        if (
          current.classList.contains('bg-[#111111]') ||
          current.classList.contains('bg-black') ||
          current.getAttribute('data-theme') === 'dark' ||
          current.getAttribute('data-cursor-mode') === 'dark'
        ) {
          return true;
        }

        const computed = window.getComputedStyle(current);
        const bg = computed.backgroundColor;
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          const rgb = bg.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0], 10);
            const g = parseInt(rgb[1], 10);
            const b = parseInt(rgb[2], 10);
            const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            return luminance < 110;
          }
        }
        current = current.parentElement;
      }
      return false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isDark = checkDarkBg(target);
      setIsDarkBackground(isDark);

      // Check explicit data-cursor overrides first
      const explicitCursor = target.closest('[data-cursor]')?.getAttribute('data-cursor') as CursorState | null;
      if (explicitCursor) {
        setCursorState(explicitCursor);
        return;
      }

      // Check for Cart buttons / Add to cart trigger
      if (
        target.closest('[aria-label*="savat" i]') ||
        target.closest('[aria-label*="cart" i]') ||
        target.closest('button[data-action="add-to-cart"]')
      ) {
        setCursorState('cart');
        return;
      }

      // Check for Drag elements (product images, carousels, sliders)
      if (
        target.closest('[data-cursor-drag]') ||
        target.closest('.aspect-product') ||
        target.closest('.aspect-\\[4\\/5\\]')
      ) {
        if (!target.closest('a') && !target.closest('button')) {
          setCursorState('drag');
          return;
        }
      }

      // Check for Link elements -> 'link' state ('VIEW →')
      if (target.closest('a')) {
        setCursorState('link');
        return;
      }

      // Check for Buttons / Clickable controls -> 'hover' state (Fabric + '+' badge)
      if (
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input[type="checkbox"]') ||
        target.closest('input[type="radio"]') ||
        target.closest('select')
      ) {
        setCursorState('hover');
        return;
      }

      // Check for Text input elements or editable text -> 'text' state
      if (
        target.closest('input[type="text"]') ||
        target.closest('input[type="email"]') ||
        target.closest('input[type="search"]') ||
        target.closest('input[type="number"]') ||
        target.closest('textarea') ||
        target.isContentEditable
      ) {
        setCursorState('text');
        return;
      }

      setCursorState('default');
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouch, isVisible, mouseX, mouseY]);

  if (isTouch) return null;

  // Render hot spot offsets based on state
  const getOffset = () => {
    switch (cursorState) {
      case 'text':
        return { x: -8, y: -24 };
      case 'cart':
        return { x: -4, y: -4 };
      case 'drag':
        return { x: -4, y: -4 };
      case 'link':
        return { x: -4, y: -4 };
      case 'hover':
        return { x: -4, y: -4 };
      case 'active':
      case 'default':
      default:
        return { x: -4, y: -4 };
    }
  };

  const offset = getOffset();
  const fabricSrc = isDarkBackground ? '/cursor/cursor_light.png' : '/cursor/cursor_dark.png';

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform select-none"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isPressed ? 0.94 : 1,
      }}
      transition={{
        opacity: { duration: 0.16 },
        scale: { duration: 0.12, ease: 'easeOut' },
      }}
    >
      <motion.div
        className="relative"
        style={{
          marginLeft: offset.x,
          marginTop: offset.y,
        }}
        transition={{
          marginLeft: { duration: 0.12, ease: 'easeOut' },
          marginTop: { duration: 0.12, ease: 'easeOut' },
        }}
      >
        <AnimatePresence mode="wait">
          {/* ==================================================== */}
          {/* 1. TEXT CURSOR (Draped Fabric Column I-Beam)         */}
          {/* ==================================================== */}
          {cursorState === 'text' ? (
            <motion.div
              key="text-cursor"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
              className="relative w-4 h-12 flex items-center justify-center filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            >
              <Image
                src="/cursor/cursor_text.png"
                alt="Aurelin Text Cursor"
                width={16}
                height={48}
                priority
                className="w-auto h-12 object-contain"
              />
            </motion.div>
          ) : cursorState === 'cart' ? (
            /* ==================================================== */
            /* SPECIAL: ADD TO CART CURSOR (Aurelin Tote Bag)       */
            /* ==================================================== */
            <motion.div
              key="cart-cursor"
              initial={{ scale: 0.8, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: -6 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-12 h-12 flex items-start justify-start filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
            >
              <Image
                src="/cursor/cursor_cart.png"
                alt="Aurelin Cart Bag Cursor"
                width={48}
                height={48}
                priority
                className="w-12 h-12 object-contain"
              />
            </motion.div>
          ) : (
            /* ==================================================== */
            /* BASE FABRIC POINTER with DYNAMIC STATES              */
            /* DEFAULT / HOVER / LINK / DRAG / ACTIVE               */
            /* ==================================================== */
            <motion.div
              key="fabric-cursor"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.14, ease: 'easeOut' }}
              className="relative flex items-center"
            >
              {/* Active Concentric Ripple Waves (State 4: ACTIVE) */}
              {(isPressed || cursorState === 'active') && (
                <div className="absolute top-4 left-4 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-20 h-20 flex items-center justify-center">
                  <motion.div
                    className="absolute rounded-full border border-white/70"
                    initial={{ width: 16, height: 16, opacity: 0.9 }}
                    animate={{ width: 68, height: 68, opacity: 0 }}
                    transition={{ duration: 0.65, ease: 'easeOut', repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute rounded-full border border-white/40"
                    initial={{ width: 16, height: 16, opacity: 0.8 }}
                    animate={{ width: 50, height: 50, opacity: 0 }}
                    transition={{ duration: 0.65, ease: 'easeOut', repeat: Infinity, delay: 0.18 }}
                  />
                </div>
              )}

              {/* Fabric Pointer Container */}
              <div className="relative w-10 h-10 shrink-0 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                <Image
                  src={fabricSrc}
                  alt="Aurelin Fabric Cursor"
                  width={40}
                  height={40}
                  priority
                  className="w-10 h-10 object-contain will-change-transform"
                />

                {/* State 2: HOVER -> Round Badge with '+' Plus sign */}
                {cursorState === 'hover' && (
                  <motion.div
                    key="hover-badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md border ${
                      isDarkBackground
                        ? 'bg-white text-black border-black/30'
                        : 'bg-[#111111] text-white border-white/80'
                    }`}
                  >
                    <Plus className="w-3 h-3 stroke-[2.2]" />
                  </motion.div>
                )}

                {/* State 5: DRAG -> Fine Crosshair Reticle Overlay */}
                {cursorState === 'drag' && (
                  <motion.div
                    key="drag-crosshair"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.14, ease: 'easeOut' }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="overflow-visible"
                    >
                      <line
                        x1="4"
                        y1="19"
                        x2="34"
                        y2="19"
                        stroke={isDarkBackground ? '#FFFFFF' : '#FFFFFF'}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))"
                      />
                      <line
                        x1="19"
                        y1="4"
                        x2="19"
                        y2="34"
                        stroke={isDarkBackground ? '#FFFFFF' : '#FFFFFF'}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>

              {/* State 3: LINK / BUTTON -> 'VIEW →' Pill Badge */}
              {cursorState === 'link' && (
                <motion.div
                  key="link-pill"
                  initial={{ opacity: 0, x: -6, scale: 0.85 }}
                  animate={{ opacity: 1, x: 2, scale: 1 }}
                  exit={{ opacity: 0, x: -6, scale: 0.85 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-full backdrop-blur-md transition-colors duration-150 shadow-md ${
                    isDarkBackground
                      ? 'bg-[#111111]/95 text-white border border-white/30 shadow-[0_4px_14px_rgba(0,0,0,0.6)]'
                      : 'bg-white/95 text-[#111111] border border-black/15 shadow-[0_4px_14px_rgba(0,0,0,0.15)]'
                  }`}
                >
                  <span className="text-[10px] font-bold tracking-[0.22em] uppercase font-mono">
                    VIEW
                  </span>
                  <span className="text-[11px] font-mono leading-none">&rarr;</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
