import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Select.module.scss';

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  value: SelectOption | undefined;
  placeholder?: string;
  topDirection?: boolean;
  onChange: (value: SelectOption | undefined) => void;
};

const Select: FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  topDirection = false,
}) => {
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
      {!topDirection && (
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
      )}
      {topDirection && (
        <div className={`${styles.caret} ${isOpen ? styles.open : ''}`} />
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${styles.options} ${isOpen ? styles.show : ''} ${
              topDirection ? styles.top : ''
            }`}
          >
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
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
