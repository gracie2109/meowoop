export const BANNER_POSITION = {
  // TOP: 'top',
  LEFT: 'left',
  RIGHT: 'right',
  // BOTTOM: 'bottom',
  CENTER: 'center'
}

export const BANNER_POSITION_ARR = () => {
  return Object.entries(BANNER_POSITION).map(([key, value]) => ({
    key: key,
    value: value,
    label: key
  }))
}
