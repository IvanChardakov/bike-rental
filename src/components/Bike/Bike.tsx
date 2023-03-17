import React from 'react';
import styled from 'styled-components';
import { LocationOn, Star } from '@mui/icons-material';

import Color from '../common/Color';
import { IBike } from '../../types/bike';
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

function Bike({ id, model, color, location, rating, isAvailable }: IBike) {
  return (
    <BikeWrapper>
      <BikeHeader>
        <div>
          <LocationOn fontSize="small" className="align-baseline" />
          <div className="truncate w-36 inline-block">{location}</div>
        </div>
      </BikeHeader>
      <BikeFooter>
        <div>
          <h3 className="font-bold truncate w-36">{model}</h3>
        </div>
        <FlexDiv>
          <FlexDiv className="mr-4">
            <Star className="mr-1 text-yellow-500" fontSize="small" /> {rating.toFixed(2)}
          </FlexDiv>
          <Color color={color} />
        </FlexDiv>
        <CreateReservationModal bikeId={id} disableButton={isAvailable} />
      </BikeFooter>
    </BikeWrapper>
  );
}

export default Bike;
