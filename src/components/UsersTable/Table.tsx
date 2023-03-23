import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import getUsersData from '../../api/usersApi';

import styles from './Table.module.scss';

import Thead from './Thead';
import UserRow from './UserRow';
import Select from '../Select/Select';

const options = [
  { label: 'BR', value: 'BR' },
  { label: 'DE', value: 'DE' },
  { label: 'FR', value: 'FR' },
  { label: 'NZ', value: 'NZ' },
  { label: 'UA', value: 'UA' },
  { label: 'US', value: 'US' },
];

const Table: FC = () => {
  const [nationality, setNationality] = useState<(typeof options)[0] | undefined>();

  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: userDataError,
  } = useQuery(['users', nationality], () => getUsersData(nationality));

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
      <Select
        options={options}
        value={nationality}
        onChange={(o) => {
          setNationality(o);
        }}
        placeholder="Nationality"
      />
      <table className={styles.table}>
        <Thead />
        <tbody className={styles.tbody}>
          {usersIsLoading && (
            <tr>
              <td>Loading</td>
            </tr>
          )}
          {usersData &&
            usersData.results.map((user) => (
              <UserRow user={user} key={user.phone} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
