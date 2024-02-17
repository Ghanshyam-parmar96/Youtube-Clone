import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(["transition-color"], {
    variants: {
        variant: {
            default: ["hover:bg-secondary-hover", "bg-secondary"],
            ghost: ["hover:bg-gray-100"],
            btn: ["bg-[#f2f2f2]" ,"hover:bg-[#e9e8e8]"],
            dark : ["bg-secondary-dark", "hover:bg-secondary-dark-hover", "text-secondary"],
        },
        size: {
            default: ["rounded", "p-2"],
            btn : ["rounded-full", "flex", "items-center", "justify-center", "px-3", "py-1.5" ],
            icon: [
                "rounded-full",
                "w-10",
                "h-10",
                "flex",
                "items-center",
                "justify-center",
                "p-2.5",
            ],
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

const Button = ({ variant, size, className, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={twMerge(buttonStyles({ variant, size }), className)}
        />
    );
};

export default Button;
