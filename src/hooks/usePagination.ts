export const usePagination = (
  totalPages: number,
  currentPage: number,
  siblingCount = 1
): Array<number | "ellipsis"> => {
  const totalNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 2);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

  const pages: Array<number | "ellipsis"> = [1];

  if (leftSibling > 2) {
    pages.push("ellipsis");
  }

  for (let page = leftSibling; page <= rightSibling; page++) {
    pages.push(page);
  }

  if (rightSibling < totalPages - 1) {
    pages.push("ellipsis");
  }

  pages.push(totalPages);

  return pages;
};