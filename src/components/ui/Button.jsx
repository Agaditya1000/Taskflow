import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

export const Button = ({
    children,
    variant = 'primary',
    className,
    isLoading,
    disabled,
    ...props
}) => {
    const baseStyles = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25",
        secondary: "bg-surface-2 text-white hover:bg-surface-1 border border-white/10",
        ghost: "bg-transparent hover:bg-white/5 text-text-muted hover:text-white",
        danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
    };

    // Note: Using inline styles for colors since we are using vanilla CSS mostly, 
    // but here I'm using utility-like class names that I assume exist or will map to style objects?
    // Wait, I am restricted to Vanilla CSS. I shouldn't rely on Tailwind classes like 'bg-primary' unless I define them.
    // My global.css only has a few utils.
    // I should use a CSS Module or direct style objects or define these classes in global.css.
    // I will use `className` with specific standard classes I'll define in global.css

    // Let's rewrite to use style objects or specific BEM-like classes.
    // actually, clsx is fine for toggling, but the classes need to exist.
    // I will return to standard CSS classes.

    return (
        <button
            className={clsx('btn', `btn-${variant}`, className)}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
            {children}
        </button>
    );
};
