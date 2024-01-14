
function SidebarIcon({ isOpenMenu, handleOnClick }: { isOpenMenu: boolean, handleOnClick: () => void }) {
  
  return (
    <div className={`sidebar__icon ${isOpenMenu ? 'is-active' : ''}`} onClick={handleOnClick}>
      <div className="_layer -top"></div>
      <div className="_layer -mid"></div>
      <div className="_layer -bottom"></div>
    </div>
  );
}

export default SidebarIcon;