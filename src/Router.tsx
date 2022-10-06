import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./layout/Layout";
import Blog from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { scroller, animateScroll } from "react-scroll";
import AboutMePage from "./pages/AboutMePage";
import BlogPage from "./pages/BlogPage";

function Router() {
  const location: any = useLocation();
  useEffect(() => {
    scroller.scrollTo(location?.state?.from, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuad",
    });
    location.state = { from: "top" };
  }, [location]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about-me" element={<AboutMePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Router;
