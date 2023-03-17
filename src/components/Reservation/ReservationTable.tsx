import { useContext, useMemo } from 'react';

import Table from '../Table/Table';
import TData from '../Table/TData';
import THead from '../Table/THead';
import Button from '../common/Button';
import { IUser } from '../../types/user';
import BikeRateModal from '../Bike/BikeRateModal';
import { IReservation } from '../../types/reservations';
import UserManagerContext from '../../services/userManager/UserManagerContext';
import BikeManagerContext from '../../services/bikeManager/BikeManagerContext';
import ReservationManagerContext from '../../services/reservationManager/ReservationManagerContext';

function ReservationTable({ user }: { user: IUser | undefined }) {
  const { currentUser } = useContext(UserManagerContext);
  const { getReservationByUserId, updateReservation } = useContext(ReservationManagerContext);
  const { getBikeById } = useContext(BikeManagerContext);

  const reservations = useMemo(() => {
    if (!user) {
      return [];
    }
    return getReservationByUserId(user?.id);
  }, [getReservationByUserId, user]);

  return (
    <div className="bg-white mx-auto p-6 bg-white">
      {!reservations || reservations.length === 0 ? (
        <p>There are no reservations</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <THead title="id" />
              <THead title="Bike" />
              <THead title="From" />
              <THead title="To" />
              <THead title="Status" />
              {user?.id === currentUser?.id ? <THead title="actions" /> : null}
            </tr>
          </thead>
          <tbody>
            {reservations?.map((res: IReservation) => {
              const bike = res?.bikeId ? getBikeById(res.bikeId) : null;
              return (
                <tr key={res.id}>
                  <TData data={res.id} />
                  <TData
                    data={
                      <>
                        {bike ? (
                          <div>
                            <b>Model:</b> {bike?.model} <br />
                            <b>Location:</b> {bike?.location}
                          </div>
                        ) : null}
                      </>
                    }
                  />

                  <TData data={res.fromDate} />
                  <TData data={res.toDate} />
                  <TData
                    data={res.isCancelled ? <span className="text-red-500">Cancelled</span> : ''}
                  />

                  {user?.id === currentUser?.id ? (
                    <TData
                      data={
                        <>
                          <Button
                            type="button"
                            onClick={() => updateReservation({ ...res, isCancelled: true })}
                            buttonText="Cancel reservation"
                            className="ml-2 mr-2"
                            disabled={res.isCancelled}
                          />
                          <BikeRateModal bikeId={res.bikeId} disabled={res.isCancelled} />
                        </>
                      }
                    />
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ReservationTable;
