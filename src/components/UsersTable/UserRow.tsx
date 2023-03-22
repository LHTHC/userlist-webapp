import { FC } from 'react';
import { User } from '../../types/users';

import styles from './UserRow.module.scss';

interface UserRowProps {
  user: User;
}

const UserRow: FC<UserRowProps> = ({ user }) => {
  const { name, location, email, dob, gender, nat, phone } = user;
  return (
    <tr key={phone} className={styles.user}>
      <td className={styles.profile}>
        <img src={user.picture.thumbnail} alt="portrait" className={styles.portrait} />
        <span className={styles.name}>{`${name.first} ${name.last}`}</span>
      </td>
      <td>{location.city}</td>
      <td>{email}</td>
      <td>{new Date(dob.date).toLocaleDateString()}</td>
      <td>{gender}</td>
      <td>{nat}</td>
      <td>{phone}</td>
    </tr>
  );
};

export default UserRow;
