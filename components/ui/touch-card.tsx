"use client";

import * as React from "react";
import { useGesture } from '@use-gesture/react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface TouchCardProps extends Omit<React.ComponentProps<"div">, 'children'> {
  children?: React.ReactNode;
  onTap?: () => void;
  onLongPress?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  enableHover?: boolean;
  pressAnimation?: boolean;
  swipeThreshold?: number;
}

const TouchCard = React.forwardRef<
  HTMLDivElement,
  TouchCardProps
>(({ 
  className, 
  onTap, 
  onLongPress, 
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeUp, 
  onSwipeDown,
  enableHover = true,
  pressAnimation = true,
  swipeThreshold = 50,
  children,
  ...props 
}, ref) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx, my], direction: [dx, dy], distance, cancel }) => {
        setIsDragging(down);
        
        if (Math.sqrt(mx * mx + my * my) > swipeThreshold) {
          // Determine swipe direction
          if (Math.abs(mx) > Math.abs(my)) {
            // Horizontal swipe
            if (dx > 0 && onSwipeRight) {
              onSwipeRight();
              cancel();
            } else if (dx < 0 && onSwipeLeft) {
              onSwipeLeft();
              cancel();
            }
          } else {
            // Vertical swipe
            if (dy > 0 && onSwipeDown) {
              onSwipeDown();
              cancel();
            } else if (dy < 0 && onSwipeUp) {
              onSwipeUp();
              cancel();
            }
          }
        }
      },
      
      onPointerDown: () => {
        if (pressAnimation) {
          setIsPressed(true);
        }
      },
      
      onPointerUp: () => {
        if (pressAnimation) {
          setIsPressed(false);
        }
      },
      
      onClick: (e) => {
        if (!isDragging && onTap) {
          onTap();
        }
      },
      
      onContextMenu: (state) => {
        state.event.preventDefault();
        if (onLongPress) {
          onLongPress();
        }
      }
    },
    {
      drag: {
        filterTaps: true,
        threshold: 10,
      }
    }
  );

  return (
    <Card
      ref={ref}
      className={cn(
        "cursor-pointer select-none touch-manipulation",
        "transition-all duration-150 ease-out",
        enableHover && "hover:shadow-md hover:scale-[1.02]",
        pressAnimation && isPressed && "scale-[0.98] shadow-sm",
        isDragging && "transition-none",
        className
      )}
      {...bind()}
      {...props}
    >
      {children}
    </Card>
  );
});

TouchCard.displayName = "TouchCard";

export { TouchCard };

// Higher-order component for making any element touch-friendly
export function withTouch<T extends React.HTMLAttributes<HTMLElement>>(
  Component: React.ComponentType<T>
) {
  const TouchEnhancedComponent = React.forwardRef<HTMLElement, T & TouchCardProps>(
    (props, ref) => {
      const {
        onTap,
        onLongPress,
        onSwipeLeft,
        onSwipeRight,
        onSwipeUp,
        onSwipeDown,
        enableHover = true,
        pressAnimation = true,
        swipeThreshold = 50,
        className,
        ...componentProps
      } = props;

      const [isPressed, setIsPressed] = React.useState(false);
      const [isDragging, setIsDragging] = React.useState(false);

      const bind = useGesture(
        {
          onDrag: ({ down, movement: [mx, my], direction: [dx, dy], distance, cancel }) => {
            setIsDragging(down);
            
            if (Math.sqrt(mx * mx + my * my) > swipeThreshold) {
              if (Math.abs(mx) > Math.abs(my)) {
                if (dx > 0 && onSwipeRight) {
                  onSwipeRight();
                  cancel();
                } else if (dx < 0 && onSwipeLeft) {
                  onSwipeLeft();
                  cancel();
                }
              } else {
                if (dy > 0 && onSwipeDown) {
                  onSwipeDown();
                  cancel();
                } else if (dy < 0 && onSwipeUp) {
                  onSwipeUp();
                  cancel();
                }
              }
            }
          },
          
          onPointerDown: () => {
            if (pressAnimation) {
              setIsPressed(true);
            }
          },
          
          onPointerUp: () => {
            if (pressAnimation) {
              setIsPressed(false);
            }
          },
          
          onClick: () => {
            if (!isDragging && onTap) {
              onTap();
            }
          },
          
          onContextMenu: (state) => {
            state.event.preventDefault();
            if (onLongPress) {
              onLongPress();
            }
          }
        },
        {
          drag: {
            filterTaps: true,
            threshold: 10,
          }
        }
      );

      return (
        <Component
          ref={ref as any}
          className={cn(
            "cursor-pointer select-none touch-manipulation",
            "transition-all duration-150 ease-out",
            enableHover && "hover:scale-[1.02]",
            pressAnimation && isPressed && "scale-[0.98]",
            isDragging && "transition-none",
            className
          )}
          {...bind()}
          {...(componentProps as any)}
        />
      );
    }
  );
  
  TouchEnhancedComponent.displayName = `withTouch(${Component.displayName || Component.name})`;
  return TouchEnhancedComponent;
}