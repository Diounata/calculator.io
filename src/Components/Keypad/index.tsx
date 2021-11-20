import styles from './styles.module.scss';

import Key from 'Components/Key';

export default function Keypad() {
  return (
    <div className={styles.keypadContainer}>
      <Key number={7}>7</Key>
      <Key number={8}>8</Key>
      <Key number={9}>9</Key>
      <Key actionType="delete">DEL</Key>

      <Key number={4}>4</Key>
      <Key number={5}>5</Key>
      <Key number={6}>6</Key>
      <Key actionType="undefined">+</Key>

      <Key number={1}>1</Key>
      <Key number={2}>2</Key>
      <Key number={3}>3</Key>
      <Key actionType="undefined">-</Key>

      <Key actionType="undefined">.</Key>
      <Key number={0}>0</Key>
      <Key actionType="undefined">/</Key>
      <Key actionType="undefined">x</Key>

      <Key actionType="reset">RESET</Key>
      <Key actionType="undefined">=</Key>
    </div>
  );
}
