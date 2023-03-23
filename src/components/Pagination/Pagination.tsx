import { FC } from 'react';

import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (value: number) => void;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const setNextPage = () => {
    if (currentPage !== totalPages && currentPage < 10) {
      setCurrentPage(currentPage + 1);
    }
  };

  const setPrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.prev} type="button" onClick={setPrevPage}>
        &lt;
      </button>
      {currentPage} of {totalPages}
      <button className={styles.next} type="button" onClick={setNextPage}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
