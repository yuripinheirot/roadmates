import { summaryRoutes } from '@/utils/summary-routes'

const settings = {
  home: {
    label: 'Home',
    href: '/',
  },
  estimate: {
    label: 'Procurar corrida',
    href: '/estimate',
  },
  history: {
    label: 'Histórico',
    href: '/history',
  },
}

export const breadcrumbLocations = {
  [summaryRoutes.home]: [settings.home],
  [summaryRoutes.estimate]: [settings.home, settings.estimate],
  [summaryRoutes.history]: [settings.home, settings.history],
}
