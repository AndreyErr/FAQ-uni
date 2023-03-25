import React from "react";
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

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<MainPageLayout />} />
          <Route exact path="/faq" element={<FaqPageLayout /> } />
          <Route exact path="/faq/:topicId" element={<FaqTopicPageLayout /> } />
          <Route path="/me" element={<AuPageLayout type={'me'} /> } />
          <Route path="/users" element={<AuPageLayout type={'users'} /> } />
          <Route path="/history" element={<AuPageLayout type={'history'} /> } />
          <Route exact path="/chat" element={<AuPageLayout type={'chat'} /> } />
          <Route exact path="/chat/:chatId" element={<AuPageLayout type={'chat'}/> } />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
