import { useState, type FC } from 'react';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '~components/ui/Button';
import { TextField } from '~components/ui/Input';

type EditableNumberCellProps = {
  value: number;
  onChange: (value: number) => void;
};

const EditableNumberCell: FC<EditableNumberCellProps> = ({
  value,
  onChange,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(newValue);
    setIsEditMode(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(Number(e.target.value));
  };

  if (isEditMode) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            className="w-20 h-7"
            classes={{ input: 'p-0' }}
            size="small"
            type="number"
            value={newValue}
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
      {value}
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

export default EditableNumberCell;
