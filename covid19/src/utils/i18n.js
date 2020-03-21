import { createSelector } from 'reselect'

export const intlSelector = createSelector(
  state => state.i18n,
  (_, toFind) => toFind,
  (i18n, toFind) => i18n[toFind]
)