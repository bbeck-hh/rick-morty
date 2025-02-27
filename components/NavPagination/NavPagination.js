export function Pagination(currentPage, maxPage) {
  const paginationDisplay = document.createElement("span");
  paginationDisplay.classList.add("navigation__pagination");
  paginationDisplay.setAttribute("data-js", "pagination");

  paginationDisplay.textContent = `${currentPage} / ${maxPage}`;

  return paginationDisplay;
}
