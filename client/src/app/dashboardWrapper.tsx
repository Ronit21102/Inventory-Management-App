import React from "react";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`dark flex bg-gray-50 text-gray-900 w-full min-f-screen`}>
      Sidebar
      <main className={` flex flex-col w-full h-full py-7 px-9 bg-gray-200`}>
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
