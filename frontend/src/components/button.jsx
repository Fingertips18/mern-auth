import { Loader } from 'lucide-react';

const Button = ({
  loading,
  disabled,
  label,
  type = 'submit',
  withLoader = true,
  loadingLabel,
  onClick,
}) => {
  return (
    <button
      className='mt-5 w-full py-3 px-4 bg-accent font-bold rounded-lg shadow-lg hover:brightness-90
        focus:outline-hidden hover:drop-shadow-glow transition duration-200 active:scale-90 flex-center
        disabled:bg-accent/50 disabled:text-foreground/50 disabled:pointer-events-none'
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
    >
      {withLoader ? (
        loading ? (
          <Loader className='w-5 h-5 animate-spin' />
        ) : (
          label
        )
      ) : loading ? (
        loadingLabel
      ) : (
        label
      )}
    </button>
  );
};

export { Button };
