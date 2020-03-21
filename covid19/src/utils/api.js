import axios from 'axios'

const baseService = () => {
  const service = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_DOMAIN}`
  })
  /*service.interceptors.request.use(
    config => (
      sessionStorage.getItem(process.env.REACT_APP_TOKEN)
        ? {
          ...config,
          headers: {
            ...config.headers,
            ...{ 'Authorization': `Bearer ${sessionStorage.getItem(process.env.REACT_APP_TOKEN)}` }
          }
        }
        : config
    ),
    error => Promise.reject(error)
  )*/

  service.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error)
  )

  return service
}

export const api = baseService()