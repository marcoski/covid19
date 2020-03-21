import colors from '../../scss/_variables.scss'

export const getMapStyle = () => ({
  default: {
    fill: colors.mapFill,
    stroke: colors.deepBlue,
    strokeWidth: 0.1,
    outline: 'none'
  },
  hover: {
    fill: colors.lightBlue,
    stroke: colors.deepBlue,
    strokeWidth: 0.1,
    outline: 'none'
  },
  pressed: {
    fill: colors.lightBlue,
    stroke: colors.deepBlue,
    strokeWidth: 0.1,
    outline: 'none'
  }
})

export const getRegionMapStyle = () => {
  const styles = getMapStyle()
  styles.default.strokeWidth = 0.02
  styles.hover.strokeWidth = 0.02
  styles.pressed.strokeWidth = 0.02
  return styles
}

export const getMarkerStyle = (target, current) => ({
  default: {
    fill: target !== current ? colors.widgetOrangeAlpha : colors.darkBlueAlpha,
    stroke: colors.deepBlue,
    strokeWidth: 0.2,
    outline: 'none'
  },
  hover: {
    fill: colors.darkBlueAlpha,
    stroke: colors.widgetOrange,
    strokeWidth: 0.2,
    outline: 'none',
    cursor: 'pointer'
  },
  pressed: {
    fill: colors.darkBlueAlpha,
    stroke: colors.widgetOrange,
    strokeWidth: 0.2,
    outline: 'none',
    cursor: 'pointer'
  }
})

export const getDistrictMarkerStyle = (target, current) => {
  const styles = getMarkerStyle(target, current)
  styles.default.strokeWidth = 0.02
  styles.hover.strokeWidth = 0.02
  styles.pressed.strokeWidth = 0.02
  return styles
}