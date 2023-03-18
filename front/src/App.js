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

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<MainPageLayout />} />
          <Route path="/faq" element={<FaqPageLayout /> } />
          <Route path="/faq/:topicId" element={<FaqTopicPageLayout /> } />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
