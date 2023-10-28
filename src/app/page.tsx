import axios from 'axios';
import { cookies } from 'next/headers';

// return user data
// server side data fetching
// This function compiled and run on server side
export async function getUser() {
  try {
    const token = cookies().get('__session-sharejobs');
    const response = await axios.get(`http://localhost:3000/api/users/currentuser`, {
      headers: {
        Cookie: `__session-sharejobs=${token?.value}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const user: any = await getUser();
  // client side data fetching
// const [user, setUser] = useState<any>(null);

// const getUser = async () => {
//   try {
//     const response = await axios.get('/api/users/currentuser');
//     setUser(response.data.data);

//   } catch (error: any) {
//     message.error(error.response.data.message || error.message);
//   }
// }

// useEffect(() => {
//   getUser();
// },[]);

  return (
    <div>
      <h1>Share Jobs</h1>
      <h1>
        Current User Name : {user && user.name}
      </h1>
    </div>
  );
}
