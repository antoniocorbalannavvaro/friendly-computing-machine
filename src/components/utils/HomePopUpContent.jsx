import linkedin from '../../assets/linkedin.webp'
import gmail from '../../assets/gmail.webp'
import spootify from '../../assets/spootify.svg'
import github from '../../assets/github.webp'
import settings from '../../assets/settings-navbar.webp'
import powerOff from '../../assets/power-off.webp'
import styles from '../styles/HomePopUpContent.module.css'

const HomePopUpContent = () => {
  const Card = ({ image, text, link }) => {
    return (
      <a href={link} target='_blank' rel='noreferrer'>
        <div className={styles.card}>
          <img src={image} width='40px' height='40px' />
          <h4>{text}</h4>
        </div>
      </a>

    )
  }
  return (
    <div className={styles.popUp}>
      <div className={styles.lateralBar}>
        <div className={styles.imageContainer}>
          <img src={settings} />
          <img onClick={() => window.location.reload()} src={powerOff} />
        </div>
      </div>
      <div className={styles.content}>
        <Card link='https://www.linkedin.com/in/antonio-corbalan-navarro-0ab897232/' text='LinkedIn' image={linkedin} />
        <Card link='mailto: antoniocn1996@gmail.com' text='Email' image={gmail} />
        <Card link='https://open.spotify.com/artist/17mQMqtiJVWFebnFbcHo8C' text='Proyecto Musical' image={spootify} />
        <Card link='https://github.com/antoniocorbalannavvaro' text='Github' image={github} />
      </div>
    </div>
  )
}

export default HomePopUpContent
