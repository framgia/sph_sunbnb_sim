import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Slider,
  Button
} from "@nextui-org/react";
import {
  MAX_PRICE,
  MAX_RATING,
  MIN_DATE,
  MIN_PRICE,
  MIN_RATING,
  type ListingFilterModalProps
} from "@/app/interfaces/ListingsProps";
import FilterButton from "./FilterButton";
import {
  ListingStatus,
  UserRole,
  AccommodationType,
  ExperienceType,
  ListingType
} from "@/app/utils/enums";
import { DateRange } from "react-date-range";

const ListingFilterModal: React.FC<ListingFilterModalProps> = ({
  user,
  type,
  isOpen,
  onOpenChange,
  filters,
  onSetFilters,
  onFilterChange,
  onFilterClear
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      scrollBehavior="inside"
      className="md:hidden"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 capitalize">
              {`${type}s Filter`}
            </ModalHeader>
            <ModalBody>
              <Slider
                label="Price Range"
                size="sm"
                minValue={MIN_PRICE}
                maxValue={MAX_PRICE}
                value={[filters.price.min, filters.price.max]}
                formatOptions={{ style: "currency", currency: "PHP" }}
                className="max-w-md p-1"
                onChange={(price) => {
                  if (Array.isArray(price) && price.length === 2)
                    onSetFilters({
                      ...filters,
                      price: { min: price[0], max: price[1] }
                    });
                }}
              />
              {user === UserRole.GUEST ? (
                <>
                  <Slider
                    label="Rating Range"
                    step={1}
                    size="sm"
                    showSteps
                    minValue={MIN_RATING}
                    maxValue={MAX_RATING}
                    value={[filters.rating.min, filters.rating.max]}
                    getValue={(rating) =>
                      `${String(rating).replace(",", "-")} Stars`
                    }
                    className="max-w-md p-1"
                    onChange={(rating) => {
                      if (Array.isArray(rating) && rating.length === 2)
                        onSetFilters({
                          ...filters,
                          rating: { min: rating[0], max: rating[1] }
                        });
                    }}
                  />
                  <div className="flex flex-col gap-1 px-1">
                    <div className="text-sm">Date</div>
                    <DateRange
                      onChange={(date) => {
                        onSetFilters({
                          ...filters,
                          date: [date.selection]
                        });
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={filters.date}
                      minDate={MIN_DATE}
                      rangeColors={["#FF2200"]}
                    />
                  </div>
                </>
              ) : null}
              {user === UserRole.HOST ? (
                <>
                  <div className="flex flex-col gap-1 px-1">
                    <div className="text-sm">Status</div>
                    <ul className="flex gap-2">
                      {Object.values(ListingStatus).map((status, index) => (
                        <li key={index}>
                          <Button
                            variant="bordered"
                            radius="full"
                            size="sm"
                            onClick={() => {
                              onSetFilters({ ...filters, status });
                            }}
                            className={
                              filters.status === status
                                ? "bg-primary text-white"
                                : ""
                            }
                          >
                            {status}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-1 px-1">
                    <div className="text-sm">Type</div>
                    <ul className="flex flex-wrap gap-2">
                      {Object.values(
                        type === ListingType.ACCOMMODATION
                          ? AccommodationType
                          : ExperienceType
                      ).map((listingType, index) => (
                        <li key={index}>
                          <Button
                            variant="bordered"
                            radius="full"
                            size="sm"
                            onClick={() => {
                              onSetFilters({ ...filters, type: listingType });
                            }}
                            className={
                              filters.type === listingType
                                ? "bg-primary text-white"
                                : ""
                            }
                          >
                            {listingType}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <FilterButton
                isModal
                onClick={() => {
                  onFilterChange();
                  onClose();
                }}
              >
                FILTER
              </FilterButton>
              <FilterButton
                isClear
                isModal
                onClick={() => {
                  onFilterClear();
                  onClose();
                }}
              >
                CLEAR
              </FilterButton>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ListingFilterModal;
