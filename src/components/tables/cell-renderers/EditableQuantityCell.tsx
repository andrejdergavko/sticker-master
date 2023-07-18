import { useState, type FC } from 'react';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '~components/ui/Button';
import { TextField } from '~components/ui/Input';

type EditableQuantityCellPropsT = {
  quantity: number;
  onChange: (value: number) => void;
};

const EditableQuantityCell: FC<EditableQuantityCellPropsT> = ({
  quantity,
  onChange,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newQuantity, setNewQuantity] = useState(quantity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(newQuantity);
    setIsEditMode(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuantity(Number(e.target.value));
  };

  if (isEditMode) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            className="w-20 h-7"
            classes={{ input: 'p-0' }}
            type="number"
            size="small"
            value={newQuantity}
            onChange={handleInputChange}
            autoFocus
          />
          <Button
            className="mx-2 normal-case"
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant="text"
            size="small"
            type="submit"
          >
            <FontAwesomeIcon icon={faCheck} size="lg" />
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      {quantity}
      <Button
        className="mx-2 normal-case"
        onClick={(e) => {
          e.stopPropagation();
          setIsEditMode(true);
        }}
        variant="text"
        size="small"
      >
        <FontAwesomeIcon icon={faPen} size="sm" />
      </Button>
    </div>
  );
};

export default EditableQuantityCell;
