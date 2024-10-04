import './App.css';
import { Routes,Route } from 'react-router-dom';
import Login from './LoginSignup/Login';
import Signin from './LoginSignup/Signin';
import ChatField from './Chatting/ChatField';
import Logout from './LoginSignup/Logout';
import UserProfile from './Chatting/UserProfile';
import SearchUser from './Chattinglist/SearchUser';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='signin' element={<Signin />} />
      <Route path="userprofile" element={<UserProfile />} />
      <Route path='chat' element={<ChatField />} />
      <Route path="/chat/:userId" element={<ChatField />} />
      <Route path='search' element={<SearchUser />} />
    </Routes>

    </>
  );
}
export default App;
