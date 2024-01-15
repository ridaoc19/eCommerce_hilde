import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Svg from "../../../components/assets/icons/Svg";
import Button from "../../../components/common/button/Button";
import SidebarIcon from "../../../components/common/sidebarIcon/SidebarIcon";
import { CreateContext } from "../../../hooks/useContext";


interface IsOverflowing { _id: string, overrun: boolean }

function SidebarNavigation({ isOpenMenu, handleOnSelectedId, selectedIdBoolean, handleOnClick }: { isOpenMenu: boolean, handleOnSelectedId: () => void, selectedIdBoolean: boolean, handleOnClick: () => void }) {
  const { navigation: { navigationContextState: { hierarchicalData: { isLoading, isFetching, data } } } } = useContext(CreateContext)!
  const itemsRef = useRef<Map<string, HTMLElement>>(new Map());
  const [selectedId, setSelectedId] = useState("")
  const [isOverflowing, setIsOverflowing] = useState<IsOverflowing[]>([]);
  const findDepartment = useMemo(() => data.find(({ department_id }) => department_id === selectedId), [data, selectedId]);


  const handleOverflowCheck = useCallback(() => {
    const current = itemsRef.current!;
    const isVerticalOverflowing: IsOverflowing[] | undefined = findDepartment?.categories.map(({ category_id }) => {
      const node = current.get(category_id)!;
      const isVertical: boolean = node?.scrollHeight > node?.offsetHeight;
      return { _id: category_id, overrun: isVertical };
    });
    isVerticalOverflowing ? setIsOverflowing(isVerticalOverflowing) : setIsOverflowing(isOverflowing)
  }, [data, isOverflowing]);

  useEffect(() => {
    if (!isOpenMenu || !selectedIdBoolean) setSelectedId("")
    // eslint-disable-next-line
  }, [isOpenMenu, selectedIdBoolean])

  useEffect(() => {
    if (selectedId) {
      handleOverflowCheck();
    }
    // eslint-disable-next-line
  }, [selectedId]);

  const handleMouseEnter = (depId: string) => {
    handleOnSelectedId()
    setSelectedId(depId);
  };

  return (
    <>
      {/* componente izquierdo */}
      <div className={`sidebar__section-left ${selectedId ? "hide" : ""}`}>
        <div className="sidebar__section-left-header">
          <div className="sidebar__section-left-header-content">
            <SidebarIcon handleOnClick={handleOnClick} isOpenMenu={isOpenMenu} />
            <div>
              <Link to={'/'}>{Svg({ type: "logo", width: 50, height: 50, color: "white" })}</Link>
            </div>
          </div>
        </div>

        <div className="sidebar__section-left-main">
          {isFetching || isLoading ? <>Cargando...</> : data.map(({ department_id, department }) => (
            <div
              key={department_id}
              // onClick={() => handleMouseEnter(department_id)}
            onMouseEnter={() => handleMouseEnter(department_id)}
            >
              <Button
                svgLeft={{ type: "arrowRight" }}
                button={{
                  type: "highlighter",
                  text: department,
                  handleClick: () => handleOnClick
                }}
              />
            </div>
          ))}
        </div>

        <div className="sidebar__section-left-footer">
          <ul>
            <li>Mi cuenta</li>
            <li>Donde estamos</li>
            <li>Atención al cliente</li>
          </ul>
        </div>

      </div>

      {/* componente derecho */}
      {selectedId && (
        <div className='section__main-right'>
          <div className="sidebar__section-right-header">
            <div className="right__header-department">
              <h2><Link className="link" onClick={() => handleOnClick()} to={`/list-products/${findDepartment?.department_id}`}>{findDepartment?.department}</Link></h2>
            </div>
            <div className="right__button-back">
              <Button
                button={{
                  text: 'volver',
                  handleClick: () => { setSelectedId("") },
                  type: 'light'
                }} />
            </div>
          </div>

          <div className="sidebar__section-right-card-container">
            {/* <div className="right__card-container"> */}
            {findDepartment?.categories.map(({ category_id, category, subcategories }) => {
              return (
                <div className='right__card-content'
                  key={category_id}
                  ref={(node) => node ? itemsRef.current.set(category_id, node) : itemsRef.current.delete(category_id)} >
                  <h3>
                    <Link
                      className="link"
                      to={`/list-products/${category_id}`}
                      onClick={handleOnClick}>
                      {category}
                    </Link>
                  </h3>
                  <div >
                    {subcategories.map(({ subcategory_id, subcategory }) => {
                      return (
                        <h5 key={subcategory_id}>
                          <Link
                            className="link"
                            to={`/list-products/${subcategory_id}`}
                            onClick={handleOnClick} >
                            {subcategory}
                          </Link>
                        </h5>
                      )
                    })}
                  </div>
                  {/* </div> */}
                  {/* <div className="right__card-message">
                    {isOverflowing.find(e => e._id === category_id)?.overrun && <Link to={`/list-products/${category_id}`}>Ver mas</Link>}
                  </div> */}
                </div>
              );
            })}
          </div>
          {/* </div> */}

        </div>
      )}
    </>
  );
}

export default SidebarNavigation;


