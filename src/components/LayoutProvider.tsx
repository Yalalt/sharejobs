'use client';
import React, { useEffect } from 'react';
import { ConfigProvider, message } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { SetCurrentUser } from '@/redux/usersSlice';
import Loader from './Loader';
import { SetLoading } from '@/redux/loadersSlice';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.users);
  const { loading } = useSelector((state: any) => state.loaders);
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState<boolean>(true);

  const menuItems = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-7-line',
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: 'ri-shield-user-line',
    },
    {
      name: 'Applications',
      path: '/applications',
      icon: 'ri-file-list-2-line',
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: 'ri-settings-2-line',
    },
    {
      name: 'Saved',
      path: '/saved',
      icon: 'ri-save-line',
    },
  ];

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get('/api/users/currentuser');
      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong');
    } finally {
      dispatch(SetLoading(false));
    }
  };

  // Login and register page dont need to get current user
  // also loading to display loader component
  useEffect(() => {
    if (pathName !== '/login' && pathName !== '/register' && !currentUser) {
      getCurrentUser();
    }
  }, [pathName]);

  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.post('/api/users/logout');
      message.success('Logout successfully');

      dispatch(SetCurrentUser(null));
      router.push('/login');
    } catch (error: any) {
      message.error(error.response.data.message || 'Something went wrong');
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <html lang='en'>
      <head>
        <link href='https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css' rel='stylesheet' />
      </head>
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#213555',
            },
          }}
        >
          {loading && <Loader />}

          {/* if route is login or register, dont show layout */}

          {pathName === '/login' || pathName === '/register' ? (
            <div>{children}</div>
          ) : (
            currentUser && (
              <div className='layout-parent'>
                <div className='sidebar'>
                  <div className='logo'>
                    {isSidebarExpanded && <h1>SHAREJOBS</h1>}

                    {!isSidebarExpanded && (
                      <i className='ri-menu-2-line' onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}></i>
                    )}
                    {isSidebarExpanded && (
                      <i className='ri-close-line' onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}></i>
                    )}
                  </div>

                  <div className='menu-items'>
                    {menuItems.map((item, index) => {
                      const isActive = pathName === item.path;
                      return (
                        <div
                          key={index + 'menutem'}
                          className={`menu-item ${isActive ? 'active-menu-item' : ''}`}
                          style={{ justifyContent: isSidebarExpanded ? 'flex-start' : 'center' }}
                          onClick={() => router.push(item.path)}
                        >
                          <i className={item.icon}></i>
                          {isSidebarExpanded && <span>{item.name}</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className='user-info'>
                    {isSidebarExpanded && (
                      <div className='flex flex-col'>
                        <span>{currentUser?.name}</span>
                        <span>{currentUser?.email}</span>
                      </div>
                    )}
                    <i className='ri-logout-box-line' onClick={onLogout}></i>
                  </div>
                </div>
                <div className='body'>{children}</div>
              </div>
            )
          )}
        </ConfigProvider>
      </body>
    </html>
  );
}

export default LayoutProvider;
