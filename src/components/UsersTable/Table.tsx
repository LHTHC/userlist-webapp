import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import getUsersData from '../../api/usersApi';

import styles from './Table.module.scss';

import Thead from './Thead';
import UserRow from './UserRow';
import Select from '../Select/Select';

const options = [
  { label: 'AU', value: 'AU' },
  { label: 'BR', value: 'BR' },
  { label: 'CA', value: 'CA' },
  { label: 'CH', value: 'CH' },
  { label: 'DE', value: 'DE' },
  { label: 'DK', value: 'DK' },
  { label: 'ES', value: 'ES' },
  { label: 'FI', value: 'FI' },
  { label: 'FR', value: 'FR' },
  { label: 'GB', value: 'GB' },
  { label: 'IE', value: 'IE' },
  { label: 'IN', value: 'IN' },
  { label: 'IR', value: 'IR' },
  { label: 'MX', value: 'MX' },
  { label: 'NL', value: 'NL' },
  { label: 'NO', value: 'NO' },
  { label: 'NZ', value: 'NZ' },
  { label: 'RS', value: 'RS' },
  { label: 'TR', value: 'TR' },
  { label: 'UA', value: 'UA' },
  { label: 'US', value: 'US' },
];

const Table: FC = () => {
  const [nationality, setNationality] = useState<(typeof options)[0] | undefined>(
    options[0]
  );

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
