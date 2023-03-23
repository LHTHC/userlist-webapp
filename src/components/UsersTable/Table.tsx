import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import getUsersData from '../../api/usersApi';
import { natOptions, genderOptions } from '../../data/filterData';

import styles from './Table.module.scss';

import { User } from '../../types/users';

import Thead from './Thead';
import UserRow from './UserRow';
import Select from '../Select/Select';

const Table: FC = () => {
  const [nationality, setNationality] = useState<
    (typeof natOptions)[0] | undefined
  >();
  const [gender, setGender] = useState<(typeof genderOptions)[0] | undefined>();

  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: userDataError,
  } = useQuery({
    queryKey: ['users', nationality],
    queryFn: () => getUsersData(nationality),
    select: (data) => {
      const copy = structuredClone(data);
      if (gender) {
        copy.results = data.results.filter((user) => user.gender === gender.value);
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
              <td>Loading</td>
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
