import { Link } from "react-router-dom";
import Svg from "../../../components/assets/icons/Svg";
import SidebarIcon from "../../../components/common/sidebarIcon/SidebarIcon";
import { useContext } from "react";
import { CreateContext } from "../../../hooks/useContext";
import Button from "../../../components/common/button/Button";


function SidebarNavigation({ handleOnClick, isActive }: { isActive: boolean, handleOnClick: () => void }) {
  const { navigation: { navigationContextState: { hierarchicalData: { isLoading, isFetching, data } } } } = useContext(CreateContext)!

  return (
    <>
      <div className={`sidebar__section-left `}>
        {/* <div className={`sidebar__section-left ${selectedId ? "hide" : ""}`}> */}
        <div className="sidebar__section-left-header">
          <div className="sidebar__section-left-header-content">
            <SidebarIcon handleOnClick={handleOnClick} isActive={isActive} />
            <div>
              <Link to={'/'}>{Svg({ type: "logo", width: 50, height: 50, color: "white" })}</Link>
            </div>
          </div>
        </div>

        <div className="sidebar__section-left-main">
          {isFetching || isLoading ? <>Cargando...</> :
            data.map(({ department_id, department }) => {
              return (
                <div
                  key={department_id}
                  onMouseEnter={() => console.log(department_id)}
                >
                  <Button
                    button={{ type: "none", text: department, handleClick: () => { } }}
                  />
                  <span>{`>`}</span>
                </div>
        )
            })
          }
        {/* {department.map((dep) => (
            <div
              key={dep._id}
              onMouseEnter={() => handleMouseEnter(dep._id)}>
              <Link
                to={`/list-products/${dep._id}`}
                onClick={handleOnClick} >
                {dep.department}
              </Link>
              <span>{`>`}</span></div>))
              } */}
      </div>

      <div className="sidebar__section-left-footer">
        <ul>
          <li>Mi cuenta</li>
          <li>Donde estamos</li>
          <li>Atención al cliente</li>
        </ul>
      </div>

    </div >

    {/* {selectedId && (
        <div className='section__main-right'>
          <div className="right__button-back">
            <Button button={{ text: 'volver', handleClick: () => { setSelectedId("") }, type: 'light' }} />
          </div>
          {department.find(dep => dep._id === selectedId)?.categoriesId.map((cat) => {
            return (
              <div key={cat._id} className="right__card-container">
                <div className='right__card-content'
                  ref={(node) => node ? itemsRef.current.set(cat._id, node) : itemsRef.current.delete(cat._id)} >
                  <h3><Link to={`/list-products/${cat._id}`} onClick={handleOnClick}>{cat.category}</Link></h3>
                  <div >
                    {cat.subcategoriesId.map(sub => <h5 key={sub._id}><Link to={`/list-products/${sub._id}`} onClick={handleOnClick} >{sub.subcategory}</Link></h5>)}
                  </div>
                </div>
                <div className="right__card-message">
                  {isOverflowing.find(e => e._id === cat._id)?.overrun && <Link to={`/list-products/${cat._id}`}>Ver mas</Link>}
                </div>
              </div>
            );
          })}
        </div>
      )} */}
    </>
  );
}


export default SidebarNavigation;