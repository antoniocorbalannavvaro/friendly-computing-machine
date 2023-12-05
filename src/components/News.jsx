import { useEffect, useState } from 'react'
import NEWS from '../mocks/news.json'
import styles from './styles/News.module.css'
import refreshIcon from '../assets/refreshIcon.webp'
import notFoundImg from '../assets/newsIcon.webp'

export const News = () => {
  const [showNew, setShowNew] = useState('')
  const [data, setData] = useState(NEWS.articles)

  const refreshNews = () => {
    const newNews = data
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

    setShowNew({})
    setData(newNews)
  }

  useEffect(() => {
    refreshNews()
  }, [])

  return (
    <div className={styles.fullContainer}>
      <h1 className={styles.newTitle}>NOTICIAS</h1>
      <img
        onClick={() => refreshNews()}
        src={refreshIcon}
        className={styles.moreNews}
      />
      {
        data.slice(0, 10).map((i) => (
          <div key={i.url} className={styles.newsCard}>
            <img
              src={i.urlToImage}
              alt='new'
              onError={(e) => {
                e.target.src = notFoundImg
              }}
            />
            <div>
              <h1 onClick={() => {
                if (showNew === i.url) {
                  setShowNew('')
                } else {
                  setShowNew(i.url)
                }
              }}
              >{i.title}
              </h1>
              {
                showNew === i.url
                  ? <div className={styles.newContent}>
                    <h2>Autor: {i.author}</h2>
                    <h5>Fecha: {i.publishedAt.toString()}</h5>
                    <h3>{i.content}</h3>
                    <div className={styles.link}>
                      <h4>
                        <a href={i.url} target='_blank' rel='noreferrer'>Link a la noticia</a>
                      </h4>
                    </div>
                  </div>
                  : null
            }

            </div>
          </div>
        ))
      }
    </div>

  )
}
