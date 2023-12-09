import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useProductFilter from "../../../hooks/useProductFilter";
import { Link } from "react-router-dom";
import Svg from "../../../assets/icons/Svg";

interface IsOverflowing { _id: string, overrun: boolean }

function SidebarHome({ isActive, handleOnSelectedId, selectedIdBoolean, handleOnClick }: { isActive: boolean, handleOnSelectedId: () => void, selectedIdBoolean: boolean, handleOnClick: () => void }) {
  const itemsRef = useRef<Map<string, HTMLElement>>(new Map());
  const { findItemById } = useProductFilter();
  const department = useMemo(() => findItemById({ id: "" }).department.data, [findItemById]);
  const [selectedId, setSelectedId] = useState("")
  const [isOverflowing, setIsOverflowing] = useState<IsOverflowing[]>([]);


  const handleOverflowCheck = useCallback((selectedId: string) => {
    const current = itemsRef.current!;
    const isVerticalOverflowing: IsOverflowing[] | undefined = department.find(dep => dep._id === selectedId)?.categoriesId.map((item) => {
      const node = current.get(item._id)!;
      const isVertical: boolean = node?.scrollHeight > node?.offsetHeight;
      return { _id: item._id, overrun: isVertical };
    });
    isVerticalOverflowing ? setIsOverflowing(isVerticalOverflowing) : setIsOverflowing(isOverflowing)
  }, [department, isOverflowing]);

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
  return (
    <>
      <div className='section__main-left'>
        <div className="main__left-header">
          <div>
            <Link to={'/'}>{Svg({ type: "logo", width: 50, height: 50, color: "white" })}</Link>
          </div>
        </div>
        <div className="main__left-content">
          {department.map((dep) => (<div key={dep._id} onMouseEnter={() => handleMouseEnter(dep._id)}><Link to={`/list-products/${dep._id}`} onClick={handleOnClick} >{dep.department}</Link> <span>{`>`}</span></div>))}
        </div>

        <div className="main__left-footer">
          <ul>
            <li>Mi cuenta</li>
            <li>Donde estamos</li>
            <li>Atención al cliente</li>
          </ul>
        </div>

      </div>

      {selectedId && (
        <div className='section__main-right'>
          {department.find(dep => dep._id === selectedId)?.categoriesId.map((cat) => {
            return (
              <div key={cat._id} className="right__card-container">
                <div className='right__card-content' ref={(node) => node ? itemsRef.current.set(cat._id, node) : itemsRef.current.delete(cat._id)} >
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
      )}
    </>
  );
}

export default SidebarHome;