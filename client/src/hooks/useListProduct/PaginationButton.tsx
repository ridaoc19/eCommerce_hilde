import Button from '../../components/common/button/Button';
import { HandleClick } from '../../interfaces/global.interface';



interface PaginationButtonProps {
  handleClickPaginationButtonBack: () => void;
  handleClickPaginationButtonNext: () => void;
  handleClickPaginationButtonSelect: HandleClick;
  paginationTotal: number
  disableBack: boolean
  disableNext: boolean
}

function PaginationButton({
  handleClickPaginationButtonBack,
  handleClickPaginationButtonNext,
  handleClickPaginationButtonSelect,
  disableBack,
  disableNext,
  paginationTotal
}: PaginationButtonProps) {
  return (
    <div style={{ display: 'flex', gap: '1rem', width: '95vw' }}>
      <Button button={{ type: "dark", text: '<', handleClick: handleClickPaginationButtonBack, disabled: disableBack }} />
      <div style={{ display: 'flex', gap: '1rem', overflow: 'auto', maxWidth: '100vw' }} className='pagination'>
        {Array.from({ length: paginationTotal }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <span
              key={pageNumber}
            >
              <Button
                button={{
                  value: String(pageNumber),
                  type: "light",
                  text: String(pageNumber),
                  handleClick: handleClickPaginationButtonSelect
                }}
              />
            </span>
          );
        })}
      </div>
      <Button button={{ type: "dark", text: '>', handleClick: handleClickPaginationButtonNext, disabled: disableNext }} />
    </div>
  );
}

export default PaginationButton;