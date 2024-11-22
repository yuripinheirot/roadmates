type Props = {
  children: React.ReactNode
}

export const MainLayout = ({ children }: Props) => {
  return <main className='flex flex-col p-4'>{children}</main>
}
