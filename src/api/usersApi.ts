import { IUsers } from '../types/users';
import api from './apiInstance';

const getUsersData = async (nationality: { value: string } | undefined) => {
  const natFilter = nationality ? `nat=${nationality.value}` : '';
  const response = await api.get<IUsers>(`api/?results=10&seed=foo&${natFilter}`);
  return response.data;
};

export default getUsersData;
