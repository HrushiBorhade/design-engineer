import { cn } from "@/lib/utils"

export function PulseLoader({
    className,
    size = "md",
}: {
    className?: string
    size?: "sm" | "md" | "lg"
}) {
    const sizeClasses = {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
    }

    return (
        <div className={cn("relative", sizeClasses[size], className)}>
            <div className="border-primary absolute inset-0 animate-thin-pulse rounded-full border-2" />
            <span className="sr-only">Loading</span>
        </div>
    )
}

export function PulseDotLoader({
    className,
    size = "md",
}: {
    className?: string
    size?: "sm" | "md" | "lg"
}) {
    const sizeClasses = {
        sm: "size-1",
        md: "size-2",
        lg: "size-3",
    }

    return (
        <div
            className={cn(
                "bg-primary animate-pulse-dot rounded-full",
                sizeClasses[size],
                className
            )}
        >
            <span className="sr-only">Loading</span>
        </div>
    )
}
