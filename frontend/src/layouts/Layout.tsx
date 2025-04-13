import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {
  children : React.ReactNode;
};

const Layout = ({children}: Props) => {
  return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="p-5 flex-1">{children}</div>
        <Footer />
      </div>
  )
};

export default Layout;