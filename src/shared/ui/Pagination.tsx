import Pagination from 'react-bootstrap/Pagination';

type PageChangeFn = (item: number) => void;

interface PaginationComponentProps {
  pagesCount: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: PageChangeFn;
  className?: string;
  entityName: string;
}

const showPageItemsFunction = ({
  pagesCount,
  itemsPerPage,
  currentPage,
  onPageChange,
  entityName,
}: PaginationComponentProps) => {
  const data = [];
  if (pagesCount <= itemsPerPage) {
    for (let i = 1; i <= pagesCount; i++) {
      data.push(
        <Pagination.Item
          key={`${entityName}-${i}`}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>,
      );
    }
  } else {
    const leftside = currentPage - itemsPerPage / 2 > 1;
    const rightside = currentPage + itemsPerPage / 2 < pagesCount;
    data.push(<Pagination.First key="first" onClick={() => onPageChange(1)} />);
    data.push(
      <Pagination.Prev
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
      />,
    );
    if (leftside) {
      data.push(<Pagination.Ellipsis key="leftEllipsis" />);
    }
    const str = Math.max(1, Math.round(currentPage - itemsPerPage / 5));
    const end = Math.min(
      pagesCount,
      Math.round(currentPage + itemsPerPage / 5),
    );
    for (let i = str; i <= end; i++) {
      data.push(
        <Pagination.Item
          key={`${entityName}-${i}`}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>,
      );
    }
    if (rightside) {
      data.push(<Pagination.Ellipsis key="rightEllipsis" />);
    }
    data.push(
      <Pagination.Next
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
      />,
    );
    data.push(
      <Pagination.Last key="last" onClick={() => onPageChange(pagesCount)} />,
    );
  }
  return data;
};

export const BigPagination = (props: PaginationComponentProps) => {
  return (
    <Pagination className={props.className}>
      <Pagination>{showPageItemsFunction(props)}</Pagination>
    </Pagination>
  );
};

export const MainPagination = (props: PaginationComponentProps) => {
  const {
    onPageChange,
    pagesCount,
    itemsPerPage,
    currentPage,
    className,
    entityName,
  } = props;
  const pagesAmount = Math.ceil(pagesCount / itemsPerPage);
  return (
    <Pagination className={className}>
      <Pagination.First onClick={() => onPageChange(1)} />
      <Pagination.Prev
        onClick={() =>
          onPageChange(currentPage === 1 ? pagesAmount : currentPage - 1)
        }
      />
      {Array(Math.ceil(pagesAmount))
        .fill(0)
        .map((_, idx) => (
          <Pagination.Item
            active={currentPage === idx + 1}
            key={`${entityName}-${idx}`}
            onClick={() => onPageChange(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      <Pagination.Next
        onClick={() =>
          onPageChange(currentPage === pagesAmount ? 1 : currentPage + 1)
        }
      />
      <Pagination.Last onClick={() => onPageChange(pagesAmount)} />
    </Pagination>
  );
};
