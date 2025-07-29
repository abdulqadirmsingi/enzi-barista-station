import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Filter, Sun, Moon } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SalesFiltersProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  selectedShift: string;
  onShiftChange: (shift: string) => void;
  onResetFilters: () => void;
}

export const SalesFilters = ({
  selectedDate,
  onDateChange,
  selectedShift,
  onShiftChange,
  onResetFilters
}: SalesFiltersProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-coffee" />
            <span className="font-medium text-sm">Filters:</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="w-auto"
              />
            </div>
            
            <Select value={selectedShift} onValueChange={onShiftChange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Shift" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Shifts</SelectItem>
                <SelectItem value="am">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    AM (6-14)
                  </div>
                </SelectItem>
                <SelectItem value="pm">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    PM (14-22)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onResetFilters}
              className="whitespace-nowrap"
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};