"use client";
import SidebarContent from "./SidebarContent";

const Sidebar = () => {

  return (
    <div className="p-4 max-md:px-0">
      <div className="max-md:hidden h-full">
        <SidebarContent />
      </div>
    </div>
  );
};

export default Sidebar;
