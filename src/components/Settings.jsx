import { useEffect, useState, useRef } from 'react'
import Option from './utils/Option'
import palleteColorIcon from '../assets/palleteColor.webp'
import backgroundColorIcon from '../assets/backgroundColor.webp'
import styles from './styles/Settings.module.css'
import THEMES from '../themes.json'
import useOutsideSetter from '../libs/useOutsideSetter'
// import NavBarStyles from './styles/NavBar.module.css'
// import WindowStyles from './styles/Window.module.css'

const COLORS = [
  'rgb(255, 204, 0)', 'rgb(247, 99, 12)', 'rgb(234, 0, 94)', 'rgb(227, 0, 140)', 'rgb(191, 0, 119)', 'rgb(154, 0, 137)', 'rgb(177, 70, 194)', 'rgb(88, 86, 214)',
  'rgb(107, 105, 214)', 'rgb(142, 140, 216)', 'rgb(0, 118, 214)', 'rgb(0, 120, 215)', 'rgb(58, 150, 221)', 'rgb(3, 131, 135)', 'rgb(0, 178, 148)', 'rgb(0, 170, 170)',
  'rgb(76, 217, 100)', 'rgb(0, 102, 102)', 'rgb(72, 104, 96)', 'rgb(93, 64, 55)', 'rgb(183, 123, 18)', 'rgb(198, 156, 109)', 'rgb(142, 142, 147)', 'rgb(164, 164, 164)']

const handleChangeBackground = (color) => {
  document.body.style['background-color'] = color
  document.body.style['background-image'] = `linear-gradient(to right, rgba(0, 0, 0, 0.045), ${color})`
}

const BackgroundOption = ({ colorSelected, setColorSelected }) => {
  useEffect(() => {
    setColorSelected(document.body.style['background-color'])
  }, [colorSelected, setColorSelected])

  const handleChange = (e) => {
    if (e.target.textLength === 6) {
      console.log(`#${e.target.value}`)
      handleChangeBackground(`#${e.target.value}`)
      setColorSelected(`#${e.target.value}`)
    }
  }
  return (
    <div className={styles.backgroundPage}>
      <h1>Background</h1>
      <h2>Selecciona color de fondo</h2>
      <div className={styles.colorsContainer}>
        {COLORS.map((i) => {
          return (
            <div
              onClick={() => {
                handleChangeBackground(i.toString())
                setColorSelected(document.body.style['background-color'])
              }}
              style={{
                backgroundColor: i.toString(),
                border: colorSelected === i.toString() ? '1px solid' : null,
                borderColor: colorSelected === i.toString() ? window.getComputedStyle(document.getElementById('root')).getPropertyValue('--selectedBackgroundColor') : null
              }}
              className={styles.colorDiv} key={i}

            />
          )
        })}
      </div>
      <h3>Color personalizado</h3>
      <label> # </label>
      <input onChange={handleChange} type='text' className={styles.inputColor} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

const ColorOption = () => {
  // const $varColor = window.getComputedStyle(document.getElementById('root')).getPropertyValue('--lowColor')
  const [showOptionThemes, setShowOptionThemes] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(window.getComputedStyle(document.getElementById('root')).getPropertyValue('--theme'))
  const changeTheme = (theme) => {
    for (const i of Object.entries(THEMES[theme])) {
      document.getElementById('root').style.setProperty(i[0], i[1])
    }
  }
  const wrapperRef = useRef(null)
  useOutsideSetter(wrapperRef, setShowOptionThemes, false)

  return (
    <div className={styles.themeContainer}>
      <h1>Tema</h1>
      <h2>Selecciona tema:</h2>
      <h5 style={{ paddingLeft: '5px' }} onClick={() => { setShowOptionThemes(!showOptionThemes) }} type='none' className={styles.inputTheme}>{selectedTheme}</h5>
      {
        showOptionThemes
          ? <div ref={wrapperRef} className={styles.themesPopUp}>
            <h3 onClick={() => {
              changeTheme('dark')
              setSelectedTheme(window.getComputedStyle(document.getElementById('root')).getPropertyValue('--theme'))
            }}
            >Dark
            </h3>
            <h3 onClick={() => {
              changeTheme('light')
              setSelectedTheme(window.getComputedStyle(document.getElementById('root')).getPropertyValue('--theme'))
            }}
            >Light
            </h3>
          </div>
          : null
      }
    </div>
  )
}

const Settings = () => {
  const [selected, setSelected] = useState('background')
  const colorOption = document.body.style['background-color'] || 'rgb(0, 118, 214)'
  const [colorSelected, setColorSelected] = useState(document.body.style['background-color'] || 'rgb(0, 118, 214)')

  return (
    <div className={styles.responsiveBox}>
      <div className={styles.settings}>

        <div className={styles.leftBar}>
          <Option
            optionName='Tema'
            image={palleteColorIcon}
            selected={selected}
            setSelected={setSelected}
            colorOption={colorOption}
          />
          <Option
            optionName='Background'
            image={backgroundColorIcon}
            selected={selected}
            setSelected={setSelected}
            colorOption={colorOption}
          />
        </div>

        <div className={styles.rightBar}>
          {
        selected === 'background'
          ? <BackgroundOption colorSelected={colorSelected} setColorSelected={setColorSelected} />
          : null
        }
          {
        selected === 'tema'
          ? <ColorOption />
          : null
        }

        </div>

      </div>
    </div>

  )
}

export default Settings
