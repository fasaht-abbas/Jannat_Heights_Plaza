export const handleScrollClick = (targetSection: string) => {
  const element: HTMLElement | null = document.getElementById(targetSection);
  if (element) {
    const offsetTop = element.offsetTop - 120;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  } else {
    console.error("Element not found!");
  }
};
