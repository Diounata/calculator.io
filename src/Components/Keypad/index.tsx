import styles from './styles.module.scss';

import Key from 'Components/Key';

export default function Keypad() {
  return (
    <div className={styles.keypadContainer}>
      <Key>7</Key>
      <Key>8</Key>
      <Key>9</Key>
      <Key>DEL</Key>

      <Key>4</Key>
      <Key>5</Key>
      <Key>6</Key>
      <Key>+</Key>

      <Key>1</Key>
      <Key>2</Key>
      <Key>3</Key>
      <Key>-</Key>

      <Key>.</Key>
      <Key>0</Key>
      <Key>/</Key>
      <Key>x</Key>

      <Key>RESET</Key>
      <Key>=</Key>
    </div>
  );
}
