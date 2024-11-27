import logo from '@/assets/logo-black.svg'

export const Header = () => {
  return (
    <div className='w-full bg-black'>
      <img
        className='w-full object-fill h-[100px]'
        src={logo}
        alt='logo'
      />
    </div>
  )
}
