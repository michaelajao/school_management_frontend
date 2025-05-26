import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, ReactNode } from "react"

type IconPosition = "left" | "right"

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: ReactNode
    iconPosition?: IconPosition
    variant?: "default" | "outline" | "ghost"
    size?: "sm" | "md" | "lg"
    fullWidth?: boolean
    className?: string
}

export const CustomButton = ({
    icon,
    iconPosition = "left",
    children,
    size = "md",
    fullWidth = false,
    className,
    ...props
}: CustomButtonProps) => {
    const sizeClasses = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
    }

    return (
        <Button
            className={cn(
                "flex items-center justify-center gap-2 rounded-md transition",
                sizeClasses[size],
                fullWidth && "w-full",
                className
            )}
            {...props}
        >
            {icon && iconPosition === "left" && <span>{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === "right" && <span>{icon}</span>}
        </Button>
    )
}
