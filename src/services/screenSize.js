export const getViewport = () => {
  const width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );

  if (width <= 992) return "md";
  if (width <= 1200) return "lg";
  return "xl";
};
