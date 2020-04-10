import axios, { AxiosError } from 'axios'
const cancelHandler = () => {
  return {
    responseReject(error: AxiosError) {
      if (axios.isCancel(error)) {
        return error
      } else {
        return Promise.reject(error)
      }
    },
  }
}
export default cancelHandler
