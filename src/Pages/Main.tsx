import { FC } from 'react';
import { useQuery } from 'react-query';
import getUsersData from '../api/usersApi';

import Table from '../components/UsersTable/Table';

const Main: FC = () => {
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: userDataError,
  } = useQuery('users', getUsersData);

  if (usersIsLoading) {
    return <div>Loading</div>;
  }

  return <div className="main">{usersData && <Table usersData={usersData} />}</div>;
};

export default Main;
