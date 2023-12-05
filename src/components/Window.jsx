import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Rnd } from 'react-rnd'
import styles from './styles/Window.module.css'
import close from '../assets/close.svg'
import maxWindowIcon from '../assets/max.svg'
import mixWindow from '../assets/close_max.svg'
import min from '../assets/min.png'

const Window = ({ folderImage, folderName, Content, closeFunction }) => {
  const [$rnd, set$rnd] = useState(null)
  const [display, setDisplay] = useState('grid')
  const [draggin, setDragging] = useState(true)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isDraggin, setIsDraggin] = useState(false)

  const [viewPort, setViewPort] = useState({
    vh: null,
    vw: null
  })

  const [maxWindowStyle] = useState({
    x: 0,
    y: 0,
    width: '100%',
    height: '100%'
  })

  const [defaultState, setDefaultState] = useState({
    x: 25,
    y: 30,
    width: '80%',
    height: '60%'

  })

  const handleDragginPositions = () => {
    if (defaultState.x < -30) {
      setDefaultState({
        x: 0,
        y: Number(`${$rnd.style.transform.replace('translate', '')}`.replace('(', '').replace(')', '').split(',')[1].replace('px', '')),
        width: $rnd.clientWidth,
        height: $rnd.clientHeight
      })
      return 0
    }

    if (defaultState.x >= 1000) {
      setDefaultState({
        x: 900,
        y: Number(`${$rnd.style.transform.replace('translate', '')}`.replace('(', '').replace(')', '').split(',')[1].replace('px', '')),
        width: $rnd.clientWidth,
        height: $rnd.clientHeight
      })
      return 0
    }

    if (defaultState.y < 0) {
      setDefaultState({
        x: Number(`${$rnd.style.transform.replace('translate', '')}`.replace('(', '').replace(')', '').split(',')[0].replace('px', '')),
        y: 10,
        width: $rnd.clientWidth,
        height: $rnd.clientHeight
      })
      return 0
    }

    if (defaultState.y >= 500) {
      setDefaultState({
        x: Number(`${$rnd.style.transform.replace('translate', '')}`.replace('(', '').replace(')', '').split(',')[0].replace('px', '')),
        y: 450,
        width: $rnd.clientWidth,
        height: $rnd.clientHeight
      })
      return 0
    }

    setDefaultState({
      x: Number(`${$rnd.style.transform.replace('translate', '')}`.replace('(', '').replace(')', '').split(',')[0].replace('px', '')),
      y: Number(`${$rnd?.style?.transform?.replace('translate', '')}`.replace('(', '').replace(')', '').split(',')[1].replace('px', '')) || 0,
      width: $rnd.clientWidth,
      height: $rnd.clientHeight
    })
  }

  const style = {
    display,
    background: '#262626',
    maxWidth: '90%',
    cursor: 'default',
    userSelect: 'hiden',
    overflowY: 'hidden',
    overflowX: 'hidden',
    zIndex: 3
  }

  useEffect(() => {
    const $rnd = document.getElementById('rnd')
    if ($rnd) {
      set$rnd($rnd)
    }
    const $body = window
    setViewPort({ vw: $body.innerWidth, vh: $body.innerHeight })
  }, [])

  // const handleResponsive = () => {
  //   if ($rnd.clientWidth <= 600) {
  //     setDisplay('grid')
  //   } else {
  //     // setDisplay('flex')
  //     setDisplay('grid')
  //   }
  // }

  return (
    <>
      <Rnd
        id='rnd'
        // onResize={handleResponsive}
        size={isMaximized
          ? {
              height: isMaximized ? maxWindowStyle.height : defaultState.height,
              width: isMaximized ? maxWindowStyle.width : defaultState.width
            }
          : null}
        style={style}
        minHeight='300px'
        minWidth='200px'
        disableDragging={
          (viewPort.vw < 500 && viewPort.vh < 1000) ||
          ((viewPort.vw < 1000 && viewPort.vh < 500))
            ? true
            : draggin
          }
        enableResizing={
          (viewPort.vw < 500 && viewPort.vh < 1000) ||
          ((viewPort.vw < 1000 && viewPort.vh < 500))
            ? false
            : !isMaximized
          }
        onDragStart={() => setIsDraggin(true)}
        onDragStop={() => { handleDragginPositions(); setIsDraggin(false) }}
        onMouseLeave={handleDragginPositions}
        default={defaultState}
        position={{
          x: isMaximized ? maxWindowStyle.x : defaultState.x,
          y: isMaximized ? maxWindowStyle.y : defaultState.y
        }}
      >
        <nav
          onMouseEnter={() => {
            if (!isMaximized) {
              setDragging(false)
              handleDragginPositions()
            } else {
              return 0
            }
          }}
          onMouseLeave={() => {
            setDragging(true)
            handleDragginPositions()
          }}
          className={styles.upperBar}
        >
          <div className={styles.folderName}>
            <img src={folderImage} width='10px' />
            {folderName}
          </div>
          <div className={styles.iconsBox}>
            <img
              onClick={() => {
                console.log('aaaa')
                setDisplay('none')
              }} src={min}
            />
            {isMaximized
              ? <img
                  src={mixWindow}
                  onClick={() => setIsMaximized(false)}
                  onMouseEnter={() => setDragging(true)}
                />
              : <img src={maxWindowIcon} width='10px' onClick={() => setIsMaximized(true)} />}

            <img onClick={() => closeFunction()} src={close} />
          </div>
        </nav>
        <div style={{ pointerEvents: isDraggin ? 'none' : 'all' }}>
          <Content />
        </div>
      </Rnd>
      {
      display === 'none'
        ? <div onClick={() => { setDisplay('grid') }} className={styles.minimizeWindow}>
          <img src={folderImage} />
          </div>
        : null
    }
    </>
  )
}

Window.propTypes = {
  folderImage: PropTypes.string,
  folderName: PropTypes.string,
  Content: PropTypes.func,
  closeFunction: PropTypes.func

}
export default Window
