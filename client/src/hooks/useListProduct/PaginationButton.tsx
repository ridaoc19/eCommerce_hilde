import Button from '../../components/common/button/Button';
import { HandleClick } from '../../interfaces/global.interface';

interface PaginationButtonProps {
  handleClickPaginationButtonBack: () => void;
  handleClickPaginationButtonNext: () => void;
  handleClickPaginationButtonSelect: HandleClick;
  paginationTotal: number;
  disableBack: boolean;
  disableNext: boolean;
  currentIndex: number;
}

function PaginationButton({
  handleClickPaginationButtonBack,
  handleClickPaginationButtonNext,
  handleClickPaginationButtonSelect,
  disableBack,
  disableNext,
  paginationTotal,
  currentIndex
}: PaginationButtonProps) {
  console.log(currentIndex)
  return (
    <div className="pagination-buttons">
      <div className="pagination-buttons__button pagination-buttons__button--back" >
        <Button
          button={{ type: "dark", text: '<', handleClick: handleClickPaginationButtonBack, disabled: disableBack }}
        />
      </div>
      <div className="pagination-numbers">
        {Array.from({ length: paginationTotal }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <span key={pageNumber} className="pagination-numbers__item">
              <Button
                style={{ backgroundColor: pageNumber === currentIndex ? 'orange' : '', color: pageNumber === currentIndex ? 'white' : '' }}
                button={{
                  value: String(pageNumber),
                  type: "light",
                  text: String(pageNumber),
                  handleClick: handleClickPaginationButtonSelect
                }}
              // className="pagination-numbers__button"
              />
            </span>
          );
        })}
      </div>
      <div className="pagination-buttons__button pagination-buttons__button--next" >
        <Button
          button={{ type: "dark", text: '>', handleClick: handleClickPaginationButtonNext, disabled: disableNext }}
        />
      </div>
    </div>
  );
}

export default PaginationButton;
