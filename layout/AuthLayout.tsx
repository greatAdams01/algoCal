type DashboardLayoutProps = {
  children: React.ReactNode,
};

const AuthLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <main className="bg-[#f5f5f5] h-[100vh]" >
        { children }
      </main>
    </>
  )
}

export default AuthLayout