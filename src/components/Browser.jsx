import styles from './styles/Browser.module.css'

const Browser = () => {
  return (
    <div className={styles.browser}>
      <iframe src='https://www.google.com/search?igu=1' width='100%' height='100%' />
    </div>
  )
}

export default Browser
