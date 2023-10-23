import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useProductFilter from "../../../hooks/useProductFilter";
import { Link } from "react-router-dom";

interface IsOverflowing { _id: string, overrun: boolean }

function SidebarHome() {
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
  }, []);

  useEffect(() => {
    if (selectedId) {
      handleOverflowCheck(selectedId);
    }
  }, [selectedId]);

  const handleMouseEnter = (depId: string) => {
    setSelectedId(depId);
  };
  return (
    <div className="sidebar__section-container">
      <div className='section__main-department'>
        {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onMouseEnter={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onMouseEnter={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onMouseEnter={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
        {department.map((dep) => (<div key={dep._id} onMouseEnter={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
      </div>
      {selectedId && (
        <div className='section__main-category'>
          {department.find(dep => dep._id === selectedId)?.categoriesId.map((cat) => {
            return (
              <div key={cat._id}>
                <div
                  ref={(node) => node ? itemsRef.current.set(cat._id, node) : itemsRef.current.delete(cat._id)}
                  className='main__category-card'
                >
                  <Link to={cat._id}>{cat.name}</Link>
                  <ul >
                    {cat.subcategoriesId.map(sub => <Link to={sub._id} key={sub._id}>{sub.name}</Link>)}
                    {cat.subcategoriesId.map(sub => <Link to={sub._id} key={sub._id}>{sub.name}</Link>)}
                    {cat.subcategoriesId.map(sub => <Link to={sub._id} key={sub._id}>{sub.name}</Link>)}
                    {cat.subcategoriesId.map(sub => <Link to={sub._id} key={sub._id}>{sub.name}</Link>)}
                    {cat.subcategoriesId.map(sub => <Link to={sub._id} key={sub._id}>{sub.name}</Link>)}
                    {cat.subcategoriesId.map(sub => <Link to={sub._id} key={sub._id}>{sub.name}</Link>)}
                    {cat.subcategoriesId.map(sub => <Link to={sub._id} key={sub._id}>{sub.name}</Link>)}
                    {cat.subcategoriesId.map(sub => <Link to={sub._id} key={sub._id}>{sub.name}</Link>)}
                    {cat.subcategoriesId.map(sub => <Link to={sub._id} key={sub._id}>{sub.name}</Link>)}
                    {cat.subcategoriesId.map(sub => <Link to={sub._id} key={sub._id}>{sub.name}</Link>)}
                  </ul>
                </div>
                {isOverflowing.find(e => e._id === cat._id)?.overrun && <Link to={''}>Ver mas</Link>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SidebarHome;