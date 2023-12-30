import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Svg from "../../../components/assets/icons/Svg";
import Button from "../../../components/common/button/Button";
import SidebarIcon from "../../../components/common/sidebarIcon/SidebarIcon";
import { CreateContext } from "../../../hooks/useContext";


interface IsOverflowing { _id: string, overrun: boolean }

function SidebarNavigation({ isActive, handleOnSelectedId, selectedIdBoolean, handleOnClick }: { isActive: boolean, handleOnSelectedId: () => void, selectedIdBoolean: boolean, handleOnClick: () => void }) {
  const { navigation: { navigationContextState: { hierarchicalData: { isLoading, isFetching, data } } } } = useContext(CreateContext)!


  const itemsRef = useRef<Map<string, HTMLElement>>(new Map());

  const [selectedId, setSelectedId] = useState("")
  const [isOverflowing, setIsOverflowing] = useState<IsOverflowing[]>([]);


  const handleOverflowCheck = useCallback((selectedId: string) => {
    const current = itemsRef.current!;
    const isVerticalOverflowing: IsOverflowing[] | undefined = data.find(({ department_id }) => department_id === selectedId)?.categories.map(({ category_id }) => {
      const node = current.get(category_id)!;
      const isVertical: boolean = node?.scrollHeight > node?.offsetHeight;
      return { _id: category_id, overrun: isVertical };
    });
    isVerticalOverflowing ? setIsOverflowing(isVerticalOverflowing) : setIsOverflowing(isOverflowing)
  }, [data, isOverflowing]);

  useEffect(() => {
    if (!isActive || !selectedIdBoolean) setSelectedId("")
    // eslint-disable-next-line
  }, [isActive, selectedIdBoolean])

  useEffect(() => {
    if (selectedId) {
      handleOverflowCheck(selectedId);
    }
    // eslint-disable-next-line
  }, [selectedId]);

  const handleMouseEnter = (depId: string) => {
    handleOnSelectedId()
    setSelectedId(depId);
  };

  useEffect(() => {
    console.log("tiene")
  }, [])

  return (
    <>
      <div className={`sidebar__section-left ${selectedId ? "hide" : ""}`}>
        <div className="sidebar__section-left-header">
          <div className="sidebar__section-left-header-content">
            <SidebarIcon handleOnClick={handleOnClick} isActive={isActive} />
            <div>
              <Link to={'/'}>{Svg({ type: "logo", width: 50, height: 50, color: "white" })}</Link>
            </div>
          </div>
        </div>

        <div className="sidebar__section-left-main">
          {isFetching || isLoading ? <>Cargando...</> : data.map(({ department_id, department }) => (
            <div
              key={department_id}
              onClick={() => handleMouseEnter(department_id)}>
              {/* onMouseEnter={() => handleMouseEnter(department_id)}> */}
              <Link
                to={`/list-products/department/${department_id}`}
                onClick={handleOnClick} >
                {department}
              </Link>
              <span>{`>`}</span></div>))}
        </div>

        <div className="sidebar__section-left-footer">
          <ul>
            <li>Mi cuenta</li>
            <li>Donde estamos</li>
            <li>Atención al cliente</li>
          </ul>
        </div>

      </div>

      {selectedId && (
        <div className='section__main-right'>
          <div className="right__button-back">
            <Button button={{ text: 'volver', handleClick: () => { setSelectedId("") }, type: 'light' }} />
          </div>

          <div className="sidebar__section-right-card-container">
            {data.find(({ department_id }) => department_id === selectedId)?.categories.map(({ category_id, category, subcategories }) => {
              return (
                // <div key={category_id} className="right__card-container">
                <div className='right__card-content'
                  key={category_id}
                  ref={(node) => node ? itemsRef.current.set(category_id, node) : itemsRef.current.delete(category_id)} >
                  <h3>
                    <Link
                      to={`/list-products/category/${category_id}`}
                      onClick={handleOnClick}>
                      {category}
                    </Link>
                  </h3>
                  <div >
                    {subcategories.map(({ subcategory_id, subcategory }) => {
                      return (
                        <h5 key={subcategory_id}>
                          <Link
                            to={`/list-products/subcategory/${subcategory_id}`}
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

        </div>
      )}
    </>
  );
}

export default SidebarNavigation;


