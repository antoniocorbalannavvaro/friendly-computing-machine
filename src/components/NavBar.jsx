import { useEffect, useState, useRef } from 'react'
import useOutsideSetter from '../libs/useOutsideSetter'
import useMountTransition from '../libs/useMountTransition'
import styles from './styles/NavBar.module.css'
import volumen from '../assets/volumen-max.webp'
import mesagges from '../assets/messages.png'
import lupa from '../assets/lupa.webp'
import HomePopUpContent from './utils/HomePopUpContent'
import { News } from './News'
import './styles/styles.css'

const NavBar = () => {
  const [date, setDate] = useState(new Date())

  const [showNews, setShowNews] = useState(false)
  let hasTransitionedInNew = useMountTransition(showNews, 100)
  const newWrapperRef = useRef(null)
  const OutsideNews = () => useOutsideSetter(newWrapperRef, setShowNews, false)
  OutsideNews()

  const [homeIsMounted, setHomeIsMounted] = useState(false)
  let hasTransitionedIn = useMountTransition(homeIsMounted, 100)
  const homeWrapperRef = useRef(null)
  const OutsideHome = () => useOutsideSetter(homeWrapperRef, setHomeIsMounted, false)
  OutsideHome()

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000)

    return function cleanUp () {
      clearInterval(timer)
    }
  })

  return (
    <>
      <nav className={styles.NavBar}>
        <div
          className={styles.logoContainer} onClick={() => {
            if (!hasTransitionedIn) {
              setHomeIsMounted(!homeIsMounted)
              hasTransitionedIn = false
            } else {
              return 0
            }
          }}
        />
        <div id='inputDiv' className={styles.searchBar}>
          <img id='inputImg' src={lupa} />
          <input id='inputText' type='text' placeholder='Type here to search' />
        </div>
        <div className={styles.utils}>
          <img style={{ display: 'none' }} id='volumen' src={volumen} />
          <img
            onClick={() => {
              if (!hasTransitionedInNew) {
                setShowNews(!showNews)
                hasTransitionedInNew = false
              } else {
                return 0
              }
            }}
            id='mensages'
            src={mesagges}
          />
        </div>
        <div className={styles.clock}>
          <span>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>{date.toLocaleDateString()}</span>
        </div>
      </nav>

      {
        showNews
          ? <div ref={newWrapperRef} className='content'>
            {(hasTransitionedIn || showNews) && (
              <div
                className={`newsPopUp ${hasTransitionedInNew && 'in'} ${
                  showNews && 'visible'
              }`}
              >
                <News />
              </div>
            )}
            </div>
          : null
      }

      {
        homeIsMounted
          ? <div ref={homeWrapperRef} className='content'>
            {(hasTransitionedIn || homeIsMounted) && (
              <div
                className={`homePopUp ${hasTransitionedIn && 'in'} ${
                  homeIsMounted && 'visible'
              }`}
              >
                <div>
                  <HomePopUpContent />
                </div>
              </div>
            )}
            </div>
          : null
      }

    </>
  )
}

export default NavBar
