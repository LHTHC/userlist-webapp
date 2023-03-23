import { FC, useState } from 'react';
import { useQuery } from 'react-query';
import getUsersData from '../api/usersApi';

import Table from '../components/UsersTable/Table';

const Main: FC = () => {
  return (
    <div className="main">
      <Table />
    </div>
  );
};

export default Main;
