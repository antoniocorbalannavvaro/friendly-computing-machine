import { useState, useRef, useEffect } from 'react'
import useOutsideSetter from '../libs/useOutsideSetter'
import Folder from './Folder'
import styles from './styles/FolderContainer.module.css'
import folderImg from '../assets/folder.webp'
import browserImage from '../assets/browse.svg'
import Window from './Window.jsx'
import Curriculum from './Curriculum.jsx'
import Browser from './Browser.jsx'
import Quedapp from './Quedapp.jsx'
import Settings from './Settings.jsx'
import quedappLogo from '../assets/logo-quedapp-edit.webp'
import settingIcon from '../assets/settings.webp'

export const FolderContainer = () => {
  const [viewPort, setViewPort] = useState({
    vh: null,
    vw: null
  })
  // const [wizardState, setWizardState] = useState(false)
  const [selected, setSelected] = useState('')
  const wrapperRef = useRef(null)
  useOutsideSetter(wrapperRef, setSelected, '')
  const [display] = useState('grid')
  const selectedStyle = { backgroundColor: 'rgba(10, 20, 240, 0.5)', height: '90px' }

  const closeFunction = () => {
    setCurrentWindow({
      Content: null,
      folderName: null,
      folderImage: null,
      display
    })
  }
  const [currentWindow, setCurrentWindow] = useState({
    Content: null,
    folderName: null,
    folderImage: null,
    display
  })

  const handleClick = (e, { folderName, folderImage, Content }) => {
    switch (e.detail) {
      case 1:
        setSelected(folderName)
        break
      case 2:
        setCurrentWindow({ Content, folderName, folderImage })
        setSelected('folderName')
        break
      case 3:
        console.log('triple click')
        break
    }
  }

  useEffect(() => {
    const $body = window
    setViewPort({ vw: $body.innerWidth, vh: $body.innerHeight })
  }, [])

  return (
    <>
      <div
        className={styles.container}
      >
        <div
          ref={wrapperRef}
          style={selected === 'Currículum' ? selectedStyle : null}
          onClick={() => handleClick(event, {
            folderName: 'Currículum',
            folderImage: folderImg,
            Content: Curriculum
          })}
        >
          <Folder image={folderImg} folderName='Currículum' />
        </div>

        <div
          style={selected === 'Buscador' ? selectedStyle : null}
          onClick={() => handleClick(event, {
            folderName: 'Buscador',
            folderImage: browserImage,
            Content: Browser
          })}
        >
          <Folder image={browserImage} folderName='Buscador' />
        </div>

        <div
          style={selected === 'Configuración' ? selectedStyle : null}
          onClick={() => handleClick(event, {
            folderName: 'Configuración',
            folderImage: settingIcon,
            Content: Settings
          })}
        >
          <Folder image={settingIcon} folderName='Configuración' />
        </div>

        <div
          style={selected === 'Quedapp' ? selectedStyle : null}
          onClick={() => handleClick(event, {
            folderName: 'Quedapp',
            folderImage: quedappLogo,
            Content: Quedapp
          })}
        >
          <Folder image={quedappLogo} folderName='Quedapp' />
        </div>
      </div>
      {
      currentWindow.Content
        ? <Window
            Content={currentWindow.Content}
            folderName={currentWindow.folderName}
            folderImage={currentWindow.folderImage}
            closeFunction={closeFunction}
          />
        : null
      }

    </>

  )
}

export default FolderContainer
