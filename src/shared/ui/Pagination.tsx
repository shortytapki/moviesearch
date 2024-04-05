import Pagination from 'react-bootstrap/Pagination';

type PageChangeFn = (item: number) => void;

interface PaginationComponentProps {
  total: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: PageChangeFn;
  className?: string;
}

const showPageItemsFunction = ({
  total,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationComponentProps) => {
  const data = [];
  if (total <= itemsPerPage) {
    for (let i = 1; i <= total; i++) {
      data.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>,
      );
    }
  } else {
    const leftside = currentPage - itemsPerPage / 2 > 1;
    const rightside = currentPage + itemsPerPage / 2 < total;
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
    const str = Math.max(1, Math.round(currentPage - itemsPerPage / 2));
    const end = Math.min(total, Math.round(currentPage + itemsPerPage / 2));
    for (let i = str; i <= end; i++) {
      data.push(
        <Pagination.Item
          key={i}
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
      <Pagination.Last key="last" onClick={() => onPageChange(total)} />,
    );
  }
  return data;
};

export const PaginationComponent = (props: PaginationComponentProps) => {
  return (
    <Pagination className={props.className}>
      <Pagination>{showPageItemsFunction(props)}</Pagination>
    </Pagination>
  );
};
