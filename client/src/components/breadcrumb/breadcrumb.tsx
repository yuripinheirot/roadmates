import {
  Breadcrumb as BreadcrumbUI,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { breadcrumbLocations } from './breadcrumb-locations'
import { useLocation, useNavigate } from 'react-router'
import { summaryRoutes } from '@/utils/summary-routes'

export function Breadcrumb() {
  const navigate = useNavigate()
  const location = useLocation()
  const items = breadcrumbLocations[location.pathname]
  const isHome = location.pathname === summaryRoutes.home

  const renderItems = () =>
    items.map((item, index) => {
      const isLastItem = index === items.length - 1
      const Component = isLastItem ? BreadcrumbPage : BreadcrumbLink

      return (
        <>
          <BreadcrumbItem
            className={isLastItem ? 'cursor-default' : 'cursor-pointer'}
          >
            <Component onClick={() => navigate(item.href)}>
              {item.label}
            </Component>
          </BreadcrumbItem>
          {index !== items.length - 1 && <BreadcrumbSeparator />}
        </>
      )
    })

  return isHome ? (
    <></>
  ) : (
    <BreadcrumbUI>
      <BreadcrumbList>{renderItems()}</BreadcrumbList>
    </BreadcrumbUI>
  )
}
