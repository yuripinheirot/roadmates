import { appConfig } from '@/constants/app-config'
import axios from 'axios'

export const http = axios.create({
  baseURL: appConfig.apiUrl,
})
