export const saveState = (state) => {
  try {
    const serialised = JSON.stringify(state)
    window.localStorage.setItem('state', serialised)
  } catch (err) {
    console.log(err, 'save state failed')
  }
}

export const loadState = () => {
  try {
    const state = window.localStorage.getItem('state')
    return JSON.parse(state)
  } catch (err) {
    return null
  }
}
