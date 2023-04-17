import React, { useContext, useEffect, useState } from "react";
import './styles/app.css';
import Footer from "./components/footer/Footer";
import Header from './components/header/Header';
import MainPageLayout from "./components/mainPage/MainPageLayout";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Routes,
} from 'react-router-dom';
import FaqTopicPageLayout from "./components/faq/FaqTopicPageLayout";
import NotFound from "./components/NotFound";
import FaqPageLayout from "./components/faq/FaqPageLayout";
import AuPageLayout from "./components/authorized/AuPageLayout";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";
import Loader from "./components/ui/Loader";
import Loader2 from "./components/ui/Loader2";
import LoaderPage from "./components/ui/LoaderPage";


const App = observer( () => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
    check().then(data => {
      if(data != null){
        user.setUser(data.data)
        user.setIsAuth(true)
      }
    }).finally(() => setLoading(false))
  }, 0)
  }, [])
  return (
    <div className="App">
      {loading
      ? <LoaderPage />
      :''}
      <Header loadingPageStatus={loading}/>
        <Routes>
          <Route path='*' element={<NotFound loadingPageStatus={loading} />} />
          <Route path="/" element={<MainPageLayout loadingPageStatus={loading} />} />
          <Route exact path="/faq" element={<FaqPageLayout /> } />
          <Route exact path="/faq/:topicId" element={<FaqTopicPageLayout /> } />
          <Route path="/me" element={user.isAuth ? <AuPageLayout type={'me'} loadingPageStatus={loading} /> : <NotFound loadingPageStatus={loading} />} />
          {user.user['status'] === 4 || user.user['status'] === 5 
          ?
            <Route path="/users" element={user.isAuth ? <AuPageLayout type={'users'} loadingPageStatus={loading} /> : <NotFound loadingPageStatus={loading} />} />
          : '' }
          {user.user['status'] === 4 || user.user['status'] === 5 
          ?
            <Route path="/history/all" element={user.isAuth ? <AuPageLayout type={'historyall'} loadingPageStatus={loading} /> : <NotFound loadingPageStatus={loading} />} />
          : '' }
          {user.user['status'] === 4 || user.user['status'] === 5 
          ?
            <Route path="/history/all/:chatId" element={user.isAuth ? <AuPageLayout type={'historyall'} loadingPageStatus={loading} /> : <NotFound loadingPageStatus={loading} />} />
          : '' }
          <Route path="/history" element={user.isAuth ? <AuPageLayout type={'history'} loadingPageStatus={loading} /> : <NotFound loadingPageStatus={loading} />} />
          <Route exact path="/history/:chatId" element={user.isAuth ? <AuPageLayout type={'history'} loadingPageStatus={loading} /> : <NotFound loadingPageStatus={loading} />} />
          <Route exact path="/chat" element={user.isAuth ? <AuPageLayout type={'chat'} loadingPageStatus={loading} /> : <NotFound loadingPageStatus={loading} />} />
          <Route exact path="/chat/:chatId" element={user.isAuth ? <AuPageLayout type={'chat'} loadingPageStatus={loading} /> : <NotFound loadingPageStatus={loading} />} />
        </Routes>
      <Footer />
    </div>
  );
})

export default App;
