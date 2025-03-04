import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["hover:bg-secondary-hover", "bg-secondary"],
      ghost: ["hover:bg-gray-200"],
      dark: [
        "bg-secondary-dark",
        "hover:bg-secondary-dark-hover",
        "text-secondary",
      ],
    },
    size: {
      default: ["rounded", "p-2"],
      icon: [
        "rounded-full",
        " w-10",
        "h-10",
        "flex",
        " items-center",
        "justify-center",
        " p-2.5",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

const Button = ({ variant, size, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={twMerge(buttonStyles({ variant, size, className }))}
    />
  );
};

export default Button;
