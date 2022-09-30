type DashboardLayoutProps = {
  children: React.ReactNode,
};

const AuthLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <main className="bg-[#D9D9D9] h-[100vh]" >
        { children }
      </main>
    </>
  )
}

export default AuthLayout