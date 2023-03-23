import styles from './Background.module.scss';

const Background = () => {
  return (
    <div style={{ position: 'absolute', overflow: 'hidden' }}>
      <div className={styles['ellipse-big']} />
      <div className={styles['ellipse-small']} />
      <div className={styles['ellipse-light']} />
      <div className={styles['oval-first']} />
    </div>
  );
};

export default Background;
