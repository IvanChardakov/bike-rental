import { useContext, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import Input from '../Form/Input';
import Select from '../Form/Select';
import Button from '../common/Button';
import StyledForm from '../Form/StyledForm';
import { messages } from '../../utils/messages';
import { BikeFilterOptions } from '../../types/bike';
import BikeManagerContext from '../../services/bikeManager/BikeManagerContext';

interface IBikeFilters extends BikeFilterOptions {
  fromDate?: Date;
  toDate?: Date;
}

interface BikeFiltersProps {
  onSubmit: (data: BikeFilterOptions) => void;
}

const ratingOptions = [1, 2, 3, 4, 5];

function BikeFilters({ onSubmit }: BikeFiltersProps) {
  const { bikes } = useContext(BikeManagerContext);

  const filterOptions = useMemo(() => {
    const options: {
      modelOptions: string[];
      colorOptions: string[];
      locationOptions: string[];
      ratingOptions: number[];
    } = {
      modelOptions: [],
      colorOptions: [],
      locationOptions: [],
      ratingOptions,
    };
    const modelOptions = new Set<string>();
    const colorOptions = new Set<string>();
    const locationOptions = new Set<string>();

    bikes.forEach((bike) => {
      modelOptions.add(bike.model);
      colorOptions.add(bike.color);
      locationOptions.add(bike.location);
    });

    options.modelOptions = Array.from(modelOptions);
    options.colorOptions = Array.from(colorOptions);
    options.locationOptions = Array.from(locationOptions);

    return options;
  }, [bikes]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IBikeFilters>();

  const selectedColor = watch('color');

  return (
    <StyledForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      parentClasses="max-w-full mb-5"
      formClasses="flex justify-between items-center flex-wrap p-2"
    >
      <Select
        name={'model'}
        label={'Model'}
        options={filterOptions.modelOptions}
        register={register}
        validation={{ required: messages.required_field }}
        error={errors?.model?.message}
      />
      <Select
        name={'color'}
        label={'Color'}
        options={filterOptions.colorOptions}
        register={register}
        validation={{ required: messages.required_field }}
        error={errors?.color?.message}
        renderCustomOptions={(value, index) => (
          <option
            key={`${value}-${index}`}
            value={value}
            style={{ backgroundColor: value.toString() }}
          />
        )}
        style={{ backgroundColor: selectedColor }}
      />
      <Select
        name={'location'}
        label={'Location'}
        options={filterOptions.locationOptions}
        register={register}
        validation={{ required: messages.required_field }}
        error={errors?.location?.message}
      />
      <Select
        name={'minRating'}
        label={'Min. rating'}
        options={filterOptions.ratingOptions}
        register={register}
        error={errors?.minRating?.message}
      />
      <Input
        name="fromDate"
        register={register}
        error={errors?.fromDate?.message}
        label="From"
        type="date"
      />
      <Input
        name="toDate"
        register={register}
        error={errors?.toDate?.message}
        label="To"
        type="date"
      />
      <div>
        <Button type="submit" buttonText="Filter" />
        <button className="text-teal-700 ml-4" onClick={() => reset()}>
          Reset Filters
        </button>
      </div>
    </StyledForm>
  );
}

export default BikeFilters;
