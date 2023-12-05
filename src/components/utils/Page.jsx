import { useState } from 'react'
import nextIcon from '../../assets/next-icon.webp'
import backIcon from '../../assets/back-icon.webp'
import styles from '../styles/Page.module.css'
import emptyIcon from '../../assets/empty-next-back-icon.webp'

const Page = () => {
  const pageContent = [
    'Quedapp es mi proyecto personal. Es la primera APP de un conjunto de aplicaciones que pretende cambiar la manera en la que hoy en día gestionamos nuestra vida social y realizamos planes con nuestros amigos.',
    'Quedapp es una aplicación móvil con la que puedes crear planes con tus amigos y organizar tu vida social de una forma rápida y sencilla.',
    'Puedes añadir a tus amigos directamente con su número de teléfono e invitarlos a unirse a la APP.',
    'También puedes compartir tu ubicación actual en cualquier momento para hacer saber a tus amigos donde estás para que se puedan unirse a tu plan.',
    'Todo es y muchas más...',
    'CLICK PARA IR A LA LANDING PAGE'
  ]
  const PAGENUMBER = pageContent.length

  const [page, setPage] = useState(0)
  const [displayLanding, setDisplayLanding] = useState(false)
  const handleSetPage = (action) => {
    if (action === 'next') {
      if (page >= PAGENUMBER - 1) {
        return 0
      } else {
        setPage(page + 1)
      }
    }

    if (action === 'back') {
      if (page === 0) {
        return 0
      } else {
        setPage(page - 1)
      }
    }
  }
  if (displayLanding) {
    return (
      <div className={styles.quedapp}>
        <iframe src='https://www.quedapp.com/' width='100%' height='100%' />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        {
          page === 5
            ? <>
              <img
                onClick={() => handleSetPage('back')}
                src={backIcon}
              />
              <button className={styles.quedappButton} onClick={() => setDisplayLanding(true)}>{pageContent[page]}</button>
              <img
                className={styles.empty}
                onClick={() => handleSetPage('next')}
                src={emptyIcon} alt=''
              />
              <h4>{(page + 1).toString()}-{PAGENUMBER.toString()}</h4>
              </>
            : <>
              <img
                className={styles.empty}
                onClick={() => handleSetPage('back')}
                src={page === 0 ? emptyIcon : backIcon}
              />
              <h3>{pageContent[page]}</h3>
              <img
                onClick={() => handleSetPage('next')}
                src={nextIcon}
              />
              <h4>{(page + 1).toString()}-{PAGENUMBER.toString()}</h4>
              </>
        }
      </div>
      <div className={styles.responsiveButtons}>
        <img
          className={styles.empty}
          onClick={() => handleSetPage('back')}
          src={page === 0 ? emptyIcon : backIcon}
        />
        <img
          onClick={() => handleSetPage('next')}
          src={nextIcon}
        />
      </div>
    </div>
  )
}

export default Page
