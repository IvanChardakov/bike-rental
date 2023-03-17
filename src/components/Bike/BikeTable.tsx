import { useContext, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Table from '../Table/Table';
import TData from '../Table/TData';
import THead from '../Table/THead';
import Color from '../common/Color';
import Button from '../common/Button';
import BikeEditModal from './BikeEditModal';
import { BikeWithDates } from '../../types/bike';
import BikeManagerContext from '../../services/bikeManager/BikeManagerContext';

const DeleteButton = styled(Button)`
  background-color: rgb(185 28 28);
  :hover {
    background-color: rgb(127 29 29);
  }
`;

interface BikeListProps {
  bikes: BikeWithDates[];
}

function BikeTable({ bikes }: BikeListProps) {
  const { deleteBike } = useContext(BikeManagerContext);

  const onDeleteBike = useCallback(
    (bikeId: number) => {
      if (window.confirm('Are you sure you want to delete this bike?')) {
        deleteBike(bikeId);
      }
    },
    [deleteBike]
  );

  const showDatePeriod = useMemo(() => {
    if (!bikes || bikes.length === 0) return false;

    return !!(bikes[0].fromDate && bikes[0].toDate);
  }, [bikes]);

  return (
    <div className="bg-white mx-auto p-6 bg-white">
      {!bikes || bikes.length === 0 ? (
        <p>There are no bikes</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <THead title="id" />
              <THead title="Model" />
              <THead title="Color" />
              <THead title="Location" />
              <THead title="Avg. rating" />
              {showDatePeriod ? <THead title="Reservation period" /> : null}
              {showDatePeriod ? null : <THead title="Available" />}
              {showDatePeriod ? null : <THead title="actions" />}
            </tr>
          </thead>
          <tbody>
            {bikes?.map((bike: BikeWithDates) => (
              <tr key={bike.id}>
                <TData data={bike.id} />
                <TData data={bike.model} />
                <TData
                  data={
                    <>
                      <Color color={bike.color} />
                    </>
                  }
                />
                <TData data={bike.location} />
                <TData data={bike.rating} />
                {showDatePeriod ? (
                  <TData
                    data={
                      <>
                        From: {bike.fromDate} / To: {bike.toDate}
                      </>
                    }
                  />
                ) : null}
                {showDatePeriod ? null : <TData data={bike.isAvailable.toString()} />}
                {showDatePeriod ? null : (
                  <TData
                    data={
                      <>
                        <BikeEditModal bike={bike} />
                        <DeleteButton
                          type="button"
                          onClick={() => onDeleteBike(bike.id)}
                          buttonText="Delete"
                          className="ml-2"
                        />

                        <Link
                          to={`/bikes/${bike.id}/user-reservations`}
                          className="ml-2 text-blue-500"
                        >
                          Bike reservations
                        </Link>
                      </>
                    }
                  />
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default BikeTable;
