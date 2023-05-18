export const styles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    '&:hover': {
        border: '1px solid var(--border-color)',
    },
    padding: "4px 8px",
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
