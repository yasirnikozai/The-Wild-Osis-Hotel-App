import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

// Styled Components
const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Component
function Pagination({ count, page, onPageChange, pageSize = 10 }) {
  const pageCount = Math.ceil(count / pageSize);
  if (pageCount <= 1) return null;

  function handlePrevious() {
    if (page > 1) onPageChange(page - 1);
  }

  function handleNext() {
    if (page < pageCount) onPageChange(page + 1);
  }

  return (
    <StyledPagination>
      <P>
        Showing <span>{(page - 1) * pageSize + 1}</span> to{" "}
        <span>{Math.min(page * pageSize, count)}</span> of <span>{count}</span>{" "}
        results
      </P>

      <Buttons>
        <PaginationButton onClick={handlePrevious} disabled={page === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>

        {Array.from({ length: pageCount }, (_, i) => (
          <PaginationButton
            key={i + 1}
            active={page === i + 1}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </PaginationButton>
        ))}

        <PaginationButton onClick={handleNext} disabled={page === pageCount}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
