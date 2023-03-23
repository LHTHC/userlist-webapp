import { FC, useState } from 'react';
import styles from './Select.module.scss';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  value: SelectOption | undefined;
  placeholder: string;
  onChange: (value: SelectOption | undefined) => void;
};

const Select: FC<SelectProps> = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const clearOptions = () => {
    onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    onChange(option);
  };

  const filteredOptions = options.filter(
    ({ value: optValue }) => optValue !== value?.value
  );

  return (
    <div
      className={styles.container}
      tabIndex={0}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
    >
      <span className={styles.placeholder}>{placeholder}</span>
      <span className={styles.value}>{value?.label}</span>
      <button
        className={styles['clear-btn']}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
      >
        &times;
      </button>
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {value?.value && (
          <>
            <li className={`${styles['selected-option']} ${styles.option}`}>
              {value.value}
            </li>
            <div />
          </>
        )}
        {filteredOptions.map((option) => (
          <li
            key={option.label}
            className={styles.option}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
