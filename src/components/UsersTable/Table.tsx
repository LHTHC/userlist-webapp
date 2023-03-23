import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import getUsersData from '../../api/usersApi';
import { natOptions, genderOptions } from '../../data/filterData';
import filterSearch from '../../utils/searchFilter';
import spinner from '../../assets/svg/spinner.svg';

import styles from './Table.module.scss';

import { IUsers, User } from '../../types/users';

import Thead from './Thead';
import UserRow from './UserRow';
import Select from '../Select/Select';
import Search from '../Search/Search';

const Table: FC = () => {
  const [nationality, setNationality] = useState<
    (typeof natOptions)[0] | undefined
  >();
  const [gender, setGender] = useState<(typeof genderOptions)[0] | undefined>();
  const [search, setSearch] = useState<string | undefined>('');

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

  return (
    <div className={styles.container}>
      <Search value={search} onChange={setSearch} placeholder="Search" />
      <div className={styles.filters}>
        <Select
          options={natOptions}
          value={nationality}
          onChange={(o) => {
            setNationality(o);
          }}
          placeholder="Nationality"
        />
        <Select
          options={genderOptions}
          value={gender}
          onChange={(o) => {
            setGender(o);
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
          {usersData &&
            usersData.results.map((user: User) => (
              <UserRow user={user} key={user.phone} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
