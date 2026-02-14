import clsx from 'clsx';

export const Input = ({
    label,
    error,
    className,
    id,
    ...props
}) => {
    return (
        <div className="input-group">
            {label && <label htmlFor={id} className="input-label">{label}</label>}
            <input
                id={id}
                className={clsx(
                    'input-field',
                    error && 'input-error',
                    className
                )}
                {...props}
            />
            {error && <span className="input-error-msg">{error}</span>}
        </div>
    );
};
