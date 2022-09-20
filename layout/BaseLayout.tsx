import Header from "../components/Header";


type DashboardLayoutProps = {
  children: React.ReactNode,
};

function BaseLayout({ children }: DashboardLayoutProps) {
  return (
    <>
  <Header/>
      <main>{ children }</main>
    </>
  )
}

export default BaseLayout