import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";


type DashboardLayoutProps = {
  children: React.ReactNode,
};

function BaseLayout({ children }: DashboardLayoutProps) {
  return (
    <>
  <Header/>
  <MobileHeader />
      <main>{ children }</main>
    </>
  )
}

export default BaseLayout