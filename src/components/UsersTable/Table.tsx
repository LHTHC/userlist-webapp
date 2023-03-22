import { FC } from 'react';
import { IUsers } from '../../types/users';

import styles from './Table.module.scss';

import Thead from './Thead';
import UserRow from './UserRow';

interface TableProps {
  usersData: IUsers;
}

const Table: FC<TableProps> = ({ usersData }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <Thead />
        <tbody className={styles.tbody}>
          {usersData.results.map((user) => (
            <UserRow user={user} key={user.phone} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
