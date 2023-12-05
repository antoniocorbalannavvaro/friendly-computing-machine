import PropTypes from 'prop-types'
import styles from '../styles/Option.module.css'

const Option = ({ optionName, image, selected, setSelected, colorOption }) => {
  return (
    <div
      onClick={() => setSelected(`${optionName.toLowerCase()}`)}
      style={{ background: selected === optionName.toLowerCase() ? 'rgba(109, 109, 109, 0.479)' : null }}
      className={styles.option}
    >
      <div style={{ backgroundColor: selected === optionName.toLowerCase() ? colorOption : null }} className={styles.lateralOption} />
      <img src={image} />
      <h4>{optionName}</h4>
    </div>
  )
}

Option.propTypes = {
  optionName: PropTypes.string,
  image: PropTypes.string,
  selected: PropTypes.string,
  setSelected: PropTypes.func,
  colorState: PropTypes.string,
  colorOption: PropTypes.string
}

export default Option
