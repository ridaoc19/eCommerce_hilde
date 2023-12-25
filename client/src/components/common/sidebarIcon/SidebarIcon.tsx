
function SidebarIcon({ isActive, handleOnClick }: { isActive: boolean, handleOnClick: () => void }) {
  
  return (
    <div className={`sidebar__icon ${isActive ? 'is-active' : ''}`} onClick={handleOnClick}>
      <div className="_layer -top"></div>
      <div className="_layer -mid"></div>
      <div className="_layer -bottom"></div>
    </div>
  );
}

export default SidebarIcon;