import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-teal-600 text-white shadow-lg hover:bg-teal-700 focus:ring-teal-500/50",
        outline:
          "border border-gray-300 bg-white text-gray-900 shadow-sm hover:bg-gray-50 focus:ring-teal-500/50",
        ghost:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-teal-500/50",
        link: "text-teal-600 underline-offset-4 hover:underline focus:ring-teal-500/50",
        destructive:
          "bg-red-600 text-white shadow-lg hover:bg-red-700 focus:ring-red-500/50",
        secondary:
          "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 focus:ring-teal-500/50",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg gap-1.5 px-4 py-2",
        lg: "h-14 rounded-lg px-8 py-4 text-base",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
