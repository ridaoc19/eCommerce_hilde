import { BreadcrumbItem } from "../../../hooks/useProductFilter";

function Breadcrumb({ breadcrumb, buttonName, handleClickBreadcrumb, }:
  { breadcrumb: BreadcrumbItem[], buttonName?: string, handleClickBreadcrumb: (data: string) => void, }) {
  return (
    <div>
      {breadcrumb.map((item, index) => (
        <span key={item._id}>
          <button name={buttonName} onClick={(() => handleClickBreadcrumb(item._id))} className='button_link'>
            {item.name}
          </button >
          {index < breadcrumb.length - 1 && ' > '}
        </span>
      ))}
    </div>
  );
}

export default Breadcrumb;