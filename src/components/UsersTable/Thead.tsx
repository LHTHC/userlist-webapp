import { FC } from 'react';

import styles from './Thead.module.scss';

const Thead: FC = () => {
  return (
    <thead className={styles.thead}>
      <tr>
        <th>Profile</th>
        <th>Location</th>
        <th>Email</th>
        <th>Birthday</th>
        <th>Gender</th>
        <th>Nationality</th>
        <th>Phone</th>
      </tr>
    </thead>
  );
};

export default Thead;
