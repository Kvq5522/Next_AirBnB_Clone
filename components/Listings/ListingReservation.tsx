"use client";

import { Range } from "react-date-range";
import Calendar from "../Inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  totalPrice?: number;
  dateRange: Range;
  onDateChange: (value: Range) => void;
  onSubmit: () => void;
  disabledDates: Date[];
  disabled?: boolean;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  onDateChange,
  onSubmit,
  disabledDates,
  disabled = false,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">${price}</div>

        <div className="text-neutral-500">/ night</div>
      </div>

      <hr />

      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onDateChange(value.selection)}
      />

      <hr />

      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>

      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>

        <div>${totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
