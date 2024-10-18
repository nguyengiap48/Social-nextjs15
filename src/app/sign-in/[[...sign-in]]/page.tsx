import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex w-full h-[calc(100vh-64px)] items-center justify-center'>
        <SignIn />
    </div>
  )
}