const filterSearch = (
  searchString: string,
  firstName: string,
  lastName: string
): boolean => {
  const searchToLower = searchString.toLowerCase();
  return (
    firstName.toLowerCase().includes(searchToLower) ||
    lastName.toLowerCase().includes(searchToLower)
  );
};

export default filterSearch;
