import { Header } from '@/components/header'

type Props = {
  children: React.ReactNode
}

export const MainLayout = ({ children }: Props) => {
  return (
    <main className='flex flex-col justify-center items-center'>
      <div className='flex flex-col md:w-[600px] w-full'>
        <Header />
        <div className='flex flex-col p-4 md:px-0 gap-4 w-full'>{children}</div>
      </div>
    </main>
  )
}
