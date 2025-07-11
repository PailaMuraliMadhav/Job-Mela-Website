import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import ThemeToggle from '../shared/ThemeToggle'

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='bg-white dark:bg-gray-900 transition-colors'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Job<span className='text-[#F83002]'>Mela</span>
          </h1>
        </div>

        <div className='flex items-center gap-12'>
          {/* Navigation Links */}
          <ul className='flex font-medium items-center gap-5 text-gray-700 dark:text-gray-200'>
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to='/admin/companies'>Companies</Link>
                </li>
                <li>
                  <Link to='/admin/jobs'>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/jobs'>Jobs</Link>
                </li>
                <li>
                  <Link to='/browse'>Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Actions Section */}
          <div className='flex items-center gap-4'>
            {/* 🌗 Theme Toggle Button */}
            <ThemeToggle />

            {!user ? (
              <div className='flex items-center gap-2'>
                <Link to='/login'>
                  <Button variant='outline'>Login</Button>
                </Link>
                <Link to='/signup'>
                  <Button className='bg-[#6A38C2] hover:bg-[#5b30a6]'>
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className='cursor-pointer'>
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt='user'
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className='w-80'>
                  <div className='space-y-4'>
                    <div className='flex gap-2 items-center'>
                      <Avatar className='cursor-pointer'>
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt='user'
                        />
                      </Avatar>
                      <div>
                        <h4 className='font-medium'>{user?.fullname}</h4>
                        <p className='text-sm text-muted-foreground'>
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>

                    <div className='flex flex-col text-gray-600 dark:text-gray-300 gap-2'>
                      {user.role === 'student' && (
                        <div className='flex items-center gap-2 cursor-pointer'>
                          <User2 />
                          <Link to='/profile'>
                            <Button variant='link'>View Profile</Button>
                          </Link>
                        </div>
                      )}

                      <div className='flex items-center gap-2 cursor-pointer'>
                        <LogOut />
                        <Button onClick={logoutHandler} variant='link'>
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {user && (
              <Link to='/payment'>
                <Button className='bg-[#5aa621] hover:bg-[#2e7d20]'>
                  Get Personalized Help
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
