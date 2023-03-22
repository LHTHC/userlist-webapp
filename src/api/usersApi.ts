import { IUsers } from '../types/users';
import api from './apiInstance';

const getUsersData = async () => {
  const response = await api.get<IUsers>('api/?seed=holla&results=10');
  return response.data;
};

export default getUsersData;
