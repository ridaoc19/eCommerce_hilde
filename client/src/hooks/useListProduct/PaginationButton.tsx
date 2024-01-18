import { useMemo } from 'react';
import Button from '../../components/common/button/Button';
import useMediaQuery from '../useMediaQuery';

interface PaginationButtonProps {
  handleClickPaginationButtonBack: () => void;
  handleClickPaginationButtonNext: () => void;
  handleClickPaginationButtonSelect: (selectedValue: string) => void;
  disableBack: boolean;
  disableNext: boolean;
  paginationTotal: number;
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
  const { mediaQuery } = useMediaQuery()
  const visibleRange = useMemo(() => mediaQuery === 'phone' ? 5 : 7, [mediaQuery]) // cuántos números de página quieres mostrar en la barra

  const startPage = Math.max(1, currentIndex - Math.floor(visibleRange / 2));
  const endPage = Math.min(paginationTotal, startPage + visibleRange - 1);

  console.log(startPage, endPage)
  return (
    <div className="pagination-buttons">
      <div className='pagination-buttons_container'>
        <div className="pagination-buttons__button pagination-buttons__button--back">
          <Button
            button={{ type: "dark", text: '<', handleClick: handleClickPaginationButtonBack, disabled: disableBack }}
          />
        </div>
        <div className="pagination-numbers">
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
            const pageNumber = startPage + index;
            console.log(pageNumber, "dentro")
            return (
              <span key={pageNumber} className="pagination-numbers__item">
                <Button
                  className={pageNumber === currentIndex ? "pagination-numbers_selected-button" : ""}
                  button={{
                    value: String(pageNumber),
                    type: "highlighter",
                    text: String(pageNumber),
                    handleClick: () => handleClickPaginationButtonSelect(String(pageNumber))
                  }}
                />
              </span>
            );
          })}
        </div>
        <div className="pagination-buttons__button pagination-buttons__button--next">
          <Button
            button={{ type: "dark", text: '>', handleClick: handleClickPaginationButtonNext, disabled: disableNext }}
          />
        </div>
      </div>
    </div>
  );
}

export default PaginationButton;
