import { FC } from 'react';

import Table from '../components/UsersTable/Table';
import Background from '../components/Background/Background';

const Main: FC = () => {
  return (
    <div className="main">
      <Background />
      <Table />
    </div>
  );
};

export default Main;
