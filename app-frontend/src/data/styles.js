export const styles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    '&:hover': {
        border: '1px solid var(--border-color)',
    },
    borderColor: state.isFocused
      ? "var(--border-color)"
      : "var(--placeholder-color)",
    boxShadow: "none",
    backgroundColor: "transparent",
  }),
  option: (base, state) => ({
    ...base,      
    backgroundColor: state.isFocused ? "var(--body-bg-color)" : "",
    cursor: "pointer",
  }),
};
