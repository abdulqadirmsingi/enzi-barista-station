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
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-coffee" />
            <span className="font-medium text-sm">Filters:</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex flex-col gap-1">
              <Label htmlFor="start-date" className="text-xs">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={initialFilters.startDate || ""}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className="w-full sm:w-auto"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="end-date" className="text-xs">
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={initialFilters.endDate || ""}
                onChange={(e) => handleEndDateChange(e.target.value)}
                className="w-full sm:w-auto"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="shift" className="text-xs">
                Shift
              </Label>
              <Select
                value={initialFilters.shift || "all"}
                onValueChange={handleShiftChange}
              >
                <SelectTrigger className="w-full sm:w-32">
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
              size="sm"
              onClick={handleReset}
              className="self-end"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
