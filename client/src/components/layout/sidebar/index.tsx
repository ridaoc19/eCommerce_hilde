import { useState } from 'react';
import { PermitsRoles } from '../../../interfaces/user.interface';
import SidebarHome from './SidebarHome';
import { Link } from 'react-router-dom';
import Svg from '../../../assets/icons/Svg';

export namespace ISidebar {
  export type ItemRole = {
    id: PermitsRoles['id'];
    value: string;
    type: string;
    svg: any;
    roles: PermitsRoles['roles'];
  };
}

// interface IsOverflowing { _id: string, overrun: boolean }

function Sidebar() {
  // const [selectedId, setSelectedId] = useState("")
  // const { findItemById } = useProductFilter();
  // const department = useMemo(() => findItemById({ id: "" }).department.data, [findItemById]);
  const [isActive, setIsActive] = useState(false);
  // const [isOverflowing, setIsOverflowing] = useState<IsOverflowing[]>([]);
  // const itemsRef = useRef<Map<string, HTMLElement>>(new Map());


  // const handleOverflowCheck = useCallback((selectedId: string) => {

  //   const current = itemsRef.current!;
  //   const isVerticalOverflowing: IsOverflowing[] | undefined = department.find(dep => dep._id === selectedId)?.categoriesId.map((item) => {
  //     const node = current.get(item._id)!;
  //     const isVertical: boolean = node?.scrollHeight > node?.offsetHeight;
  //     return { _id: item._id, overrun: isVertical };
  //   });
  //   isVerticalOverflowing ? setIsOverflowing(isVerticalOverflowing) : setIsOverflowing(isOverflowing)
  // }, []);

  // useEffect(() => {
  //   if (selectedId) {
  //     handleOverflowCheck(selectedId);
  //   }
  // }, [selectedId]);

  // const handleMouseEnter = (depId: string) => {
  //   setSelectedId(depId);
  // };

  // const handleMouseLeave = () => {
  //   setSelectedId("");
  // };

  // const customHome = (
  //   <>
  //     <div className='section__main-department'>
  //       {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onClick={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onMouseEnter={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onMouseEnter={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onMouseEnter={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //       {department.map((dep) => (<div key={dep._id} onMouseEnter={() => handleMouseEnter(dep._id)}>{dep.name}</div>))}
  //     </div>
  //     {selectedId && (
  //       <div className='section__main-category'>
  //         {department.find(dep => dep._id === selectedId)?.categoriesId.map((cat) => {
  //           return (
  //             <div key={cat._id}>
  //               <div
  //                 ref={(node) => node ? itemsRef.current.set(cat._id, node) : itemsRef.current.delete(cat._id)}
  //                 className='main__category-card'
  //               >
  //                 <Link to={""}>{cat.name}</Link>
  //                 <ul >
  //                   {cat.subcategoriesId.map(sub => <li key={sub._id}>{sub.name}</li>)}
  //                   {cat.subcategoriesId.map(sub => <li key={sub._id}>{sub.name}</li>)}
  //                   {cat.subcategoriesId.map(sub => <li key={sub._id}>{sub.name}</li>)}
  //                   {cat.subcategoriesId.map(sub => <li key={sub._id}>{sub.name}</li>)}
  //                   {cat.subcategoriesId.map(sub => <li key={sub._id}>{sub.name}</li>)}
  //                   {cat.subcategoriesId.map(sub => <li key={sub._id}>{sub.name}</li>)}
  //                   {cat.subcategoriesId.map(sub => <li key={sub._id}>{sub.name}</li>)}
  //                   {cat.subcategoriesId.map(sub => <li key={sub._id}>{sub.name}</li>)}
  //                   {cat.subcategoriesId.map(sub => <li key={sub._id}>{sub.name}</li>)}
  //                   {cat.subcategoriesId.map(sub => <li key={sub._id}>{sub.name}</li>)}
  //                 </ul>
  //               </div>
  //               {isOverflowing.find(e => e._id === cat._id)?.overrun && <Link to={''}>Ver mas</Link>}
  //             </div>
  //           );
  //         })}
  //       </div>
  //     )}
  //   </>
  // );
  const handleOnClick = () => {
    document.body.classList.toggle('body-scroll-locked');
    setIsActive(!isActive);
  }
  return (
    <div className='sidebar__container'>
      <div className={`sidebar__icon-container ${isActive ? 'is-active' : ''}`} onClick={handleOnClick}>
        <div className="_layer -top"></div>
        <div className="_layer -mid"></div>
        <div className="_layer -bottom"></div>
      </div>

      <div className={`sidebar__content ${isActive ? 'is-active' : ''}`} onClick={handleOnClick}>
        <div className='sidebar__main'
          //  onMouseLeave={handleMouseLeave}
          onClick={(e) => e.stopPropagation()}>
          <div className='sidebar__header-container'>
            <Link to={'/'}>{Svg({ type: "logo", width: 50, height: 50, color: "white" })}</Link>
          </div>
          <div className='sidebar__section-container'>
            <SidebarHome />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Sidebar;
