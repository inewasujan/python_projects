import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="container mx-auto w-full flex flex-col py-16 gap-y-10">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
