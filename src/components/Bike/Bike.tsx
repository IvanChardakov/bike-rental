import { useContext, useState, useCallback } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { LocationOn, Edit, Star, Delete } from '@mui/icons-material';

import BikeForm from './BikeForm';

import Button from '../common/Button';
import Color from '../common/Color';
import { IBike } from '../../types/bike';
import { BikeFormData } from '../../types/formData';
import BikeManagerContext from '../../services/bikeManager/BikeManagerContext';
import UserManagerContext from '../../services/userManager/UserManagerContext';
import CreateReservationModal from '../Reservation/CreateReservationModal';

const BikeWrapper = styled.div`
  border: 1px solid gray;
  border-radius: 6px;
  width: 270px;
  height: 120px;
  margin-right: 20px;
  margin-bottom: 20px;
  background: url(bike.png);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const BikeHeader = styled(FlexDiv)`
  padding: 5px;
  margin-bottom: 45px;
`;

const BikeFooter = styled(FlexDiv)`
  position: relative;
  padding: 5px;
  border-top: 1px solid grey;
  background-color: #ffffff8c;
`;

const ReserveButton = styled(Button)`
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  margin: auto;
  width: 90px;
`;

function Bike({ id, model, color, location, rating, isAvailable }: IBike) {
  const { updateBike, deleteBike } = useContext(BikeManagerContext);
  const { currentUser } = useContext(UserManagerContext);

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = (data: BikeFormData) => {
    updateBike({ ...data, id });
    closeModal();
  };

  const onDeleteBike = useCallback(() => {
    if (window.confirm('Are you sure you want to delete this bike?')) {
      deleteBike(id);
    }
  }, [deleteBike, id]);

  return (
    <BikeWrapper>
      <Modal isOpen={isOpen} onRequestClose={closeModal} className="max-w-md mx-auto">
        <BikeForm
          onSubmit={onSubmit}
          initialValues={{ model, color, location, rating, isAvailable }}
          formTitle="Edit bike"
          submitText="Save"
        />
      </Modal>

      <BikeHeader>
        <div>
          <LocationOn fontSize="small" className="align-baseline" />
          <div className="truncate w-36 inline-block">{location}</div>
        </div>
        {currentUser?.role === 'manager' ? (
          <div>
            <button type="button" onClick={openModal}>
              <Edit fontSize="small" />
            </button>
            <button type="button" onClick={onDeleteBike}>
              <Delete fontSize="small" className="text-red-500 hover:text-red-700" />
            </button>
          </div>
        ) : null}
      </BikeHeader>
      <BikeFooter>
        <div>
          <h3 className="font-bold truncate w-36">{model}</h3>
        </div>
        <FlexDiv>
          <FlexDiv className="mr-4">
            <Star className="mr-1 text-yellow-500" fontSize="small" /> {rating}
          </FlexDiv>
          <Color color={color} />
        </FlexDiv>
        <CreateReservationModal bikeId={id} />
      </BikeFooter>
    </BikeWrapper>
  );
}

export default Bike;
