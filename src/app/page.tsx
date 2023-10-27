'use client';
import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
const [user, setUser] = useState<any>(null);

const getUser = async () => {
  try {
    const response = await axios.get('/api/users/currentuser');
    setUser(response.data.data);

  } catch (error: any) {
    message.error(error.response.data.message || error.message);
  }
}

useEffect(() => {
  getUser();
},[]);

  return (
    <div>
      <h1>Share Jobs</h1>
      <h1>
        Current User Name : {user && user.name}
      </h1>
    </div>
  );
}
