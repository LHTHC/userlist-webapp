import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import getUsersData from '../../api/usersApi';
import { natOptions, genderOptions, rowOptions } from '../../data/filterData';
import filterSearch from '../../utils/searchFilter';
import spinner from '../../assets/svg/spinner.svg';

import styles from './Table.module.scss';

import { IUsers, User } from '../../types/users';

import Thead from './Thead';
import UserRow from './UserRow';
import Select from '../Select/Select';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';

const Table: FC = () => {
  const [nationality, setNationality] = useState<
    (typeof natOptions)[0] | undefined
  >();
  const [gender, setGender] = useState<(typeof genderOptions)[0] | undefined>();
  const [search, setSearch] = useState<string | undefined>('');
  const [rowsPerPage, setRowsPerPage] = useState<(typeof rowOptions)[0] | undefined>(
    rowOptions[0]
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: userDataError,
  } = useQuery({
    queryKey: ['users', nationality],
    queryFn: () => getUsersData(nationality),
    select: (data) => {
      const copy: IUsers = structuredClone(data);
      if (gender) {
        copy.results = copy.results.filter((user) => user.gender === gender.value);
      }
      if (search?.length) {
        copy.results = copy.results.filter((user) => {
          return filterSearch(search, user.name.first, user.name.last);
        });
      }
      return copy;
    },
  });

  if (userDataError) {
    return (
      <div>
        Uh oh, something has gone wrong. Please tweet us @randomapi about the issue.
        Thank you.
      </div>
    );
  }

  let numberOfPages: number = 1;
  let indexOfFirstRecord: number = 0;
  let indexOfLastRecord: number = 0;

  if (usersData && rowsPerPage) {
    const nPages = Math.ceil(usersData.results.length / +rowsPerPage.value);
    numberOfPages = nPages > 10 ? 10 : nPages;
  }

  if (rowsPerPage) {
    indexOfLastRecord = +rowsPerPage.value * currentPage;
    indexOfFirstRecord = indexOfLastRecord - +rowsPerPage.value;
  }

  const currentUsers = usersData?.results.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  return (
    <div className={styles.container}>
      <Search value={search} onChange={setSearch} placeholder="Search" />
      <div className={styles.filters}>
        <Select
          options={natOptions}
          value={nationality}
          onChange={(o) => {
            setNationality(o);
            setCurrentPage(1);
          }}
          placeholder="Nationality"
        />
        <Select
          options={genderOptions}
          value={gender}
          onChange={(o) => {
            setGender(o);
            setCurrentPage(1);
          }}
          placeholder="Gender"
        />
      </div>
      <table className={styles.table}>
        <Thead />
        <tbody className={styles.tbody}>
          {usersIsLoading && (
            <tr>
              <td>
                <img src={spinner} alt="Loading Spinner" />
              </td>
            </tr>
          )}
          {currentUsers &&
            currentUsers.map((user: User) => (
              <UserRow user={user} key={user.phone} />
            ))}
        </tbody>
      </table>
      <div className={styles.tfooter}>
        <div />
        <Pagination
          currentPage={currentPage}
          totalPages={numberOfPages}
          setCurrentPage={setCurrentPage}
        />
        <div className={styles['rows-select']}>
          <span>Rows per page:</span>
          <Select
            options={rowOptions}
            value={rowsPerPage}
            onChange={(o) => {
              setRowsPerPage(o);
            }}
            topDirection
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
