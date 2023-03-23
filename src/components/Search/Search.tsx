import { FC } from 'react';

import searchIcon from '../../assets/svg/search.svg';
import styles from './Search.module.scss';

type SearchProps = {
  value: string | undefined;
  placeholder: string;
  onChange: (value: string) => void;
};

const Search: FC<SearchProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <img src={searchIcon} alt="searchIcon" />
    </div>
  );
};

export default Search;
