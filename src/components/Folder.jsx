import styles from './styles/Folder.module.css'
import PropTypes from 'prop-types'

export const Folder = ({ image, folderName }) => {
  return (
    <div className={styles.folder}>
      <img src={image} />
      <div className={styles.folderName}>
        <h5>{folderName}</h5>
      </div>
    </div>
  )
}

Folder.propTypes = {
  image: PropTypes.string,
  folderName: PropTypes.string
}

export default Folder
