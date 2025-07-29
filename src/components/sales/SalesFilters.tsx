import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SalesFiltersProps {
  onFiltersChange: (filters: {
    startDate?: string;
    endDate?: string;
    shift?: "AM" | "PM";
  }) => void;
  initialFilters: {
    startDate?: string;
    endDate?: string;
    shift?: "AM" | "PM";
  };
}

export const SalesFilters = ({
  onFiltersChange,
  initialFilters,
}: SalesFiltersProps) => {
  const handleStartDateChange = (date: string) => {
    onFiltersChange({ ...initialFilters, startDate: date });
  };

  const handleEndDateChange = (date: string) => {
    onFiltersChange({ ...initialFilters, endDate: date });
  };

  const handleShiftChange = (shift: string) => {
    onFiltersChange({
      ...initialFilters,
      shift: shift === "all" ? undefined : (shift as "AM" | "PM"),
    });
  };

  const handleReset = () => {
    const today = new Date().toISOString().split("T")[0];
    onFiltersChange({ startDate: today, endDate: today, shift: undefined });
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-gray-50/50 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full">
              <Filter className="w-5 h-5 text-amber-600" />
            </div>
            <span className="font-bold text-lg text-gray-800">
              Filter Options:
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 flex-1">
            <div className="flex flex-col gap-2 min-w-[160px]">
              <Label
                htmlFor="start-date"
                className="text-sm font-semibold text-gray-700"
              >
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={initialFilters.startDate || ""}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className="w-full border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-lg shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2 min-w-[160px]">
              <Label
                htmlFor="end-date"
                className="text-sm font-semibold text-gray-700"
              >
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={initialFilters.endDate || ""}
                onChange={(e) => handleEndDateChange(e.target.value)}
                className="w-full border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-lg shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2 min-w-[140px]">
              <Label
                htmlFor="shift"
                className="text-sm font-semibold text-gray-700"
              >
                Shift
              </Label>
              <Select
                value={initialFilters.shift || "all"}
                onValueChange={handleShiftChange}
              >
                <SelectTrigger className="w-full border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-lg shadow-sm">
                  <SelectValue placeholder="All shifts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All shifts</SelectItem>
                  <SelectItem value="AM">AM (6-12)</SelectItem>
                  <SelectItem value="PM">PM (12-18)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              onClick={handleReset}
              className="self-end lg:self-end h-10 px-6 border-gray-200 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition-all duration-300 rounded-lg shadow-sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
