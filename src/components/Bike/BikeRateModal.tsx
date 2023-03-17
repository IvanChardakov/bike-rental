import { useState, useContext } from 'react';
import Modal from 'react-modal';
import { Star, StarBorder } from '@mui/icons-material';

import Button from '../common/Button';
import UserManagerContext from '../../services/userManager/UserManagerContext';
import BikeManagerContext from '../../services/bikeManager/BikeManagerContext';

interface BikeRateModalProps {
  bikeId: number | undefined;
  disabled: boolean;
}

function BikeRateModal({ bikeId, disabled }: BikeRateModalProps) {
  const { currentUser } = useContext(UserManagerContext);
  const { addUserRating } = useContext(BikeManagerContext);
  const [currentRating, setCurrentRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onUserRateBike() {
    if (!bikeId || !currentUser?.id) return;
    addUserRating(bikeId, currentUser?.id, currentRating);
    closeModal();
  }

  if (!bikeId) {
    return null;
  }

  return (
    <>
      <Button type="button" onClick={openModal} buttonText="Rate bike" disabled={disabled} />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="max-w-sm mx-auto"
        ariaHideApp={false}
      >
        <div className={`p-6 bg-white rounded shadow-md mt-5`}>
          <h3>
            <b>Rate bike</b>
          </h3>
          {[...Array(5)].map((e, i) =>
            i < currentRating ? (
              <Star
                onClick={() => setCurrentRating(i + 1)}
                className="cursor-pointer text-yellow-500"
                key={i}
              />
            ) : (
              <StarBorder
                onClick={() => setCurrentRating(i + 1)}
                className="cursor-pointer"
                key={i}
              />
            )
          )}
          <div className="mt-4">
            <Button type="button" onClick={onUserRateBike} buttonText="Save" />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default BikeRateModal;
