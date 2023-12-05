import { useEffect } from 'react'

function useOutsideSetter (ref, setState, state) {
  useEffect(() => {
    function handleClickOutside (event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setState(state)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, setState, state])
}

export default useOutsideSetter
