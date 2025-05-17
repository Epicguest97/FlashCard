
import { useState } from "react";
import { User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserProfileProps {
  strongTopics: number;
  weakTopics: number;
  totalAnswered?: number;
  averageTime?: number;
  correctAnswers?: number;
  incorrectAnswers?: number;
}

const UserProfile = ({
  strongTopics,
  weakTopics,
  totalAnswered = 0,
  averageTime = 0,
  correctAnswers = 0,
  incorrectAnswers = 0,
}: UserProfileProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 bg-secondary/50 hover:bg-secondary/70 rounded-full px-3 py-1 transition-colors">
          <User size={18} />
          <span className="font-medium">Analytics</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">User Analytics</h3>
          
          <div className="flex justify-between">
            <Badge variant="outline" className="bg-green-600/10 text-green-600 border-green-600/20">
              Strong: {strongTopics}
            </Badge>
            <Badge variant="outline" className="bg-red-600/10 text-red-600 border-red-600/20">
              Weak: {weakTopics}
            </Badge>
          </div>
          
          {(totalAnswered > 0 || correctAnswers > 0) && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">Quiz Performance</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50%]">Metric</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {totalAnswered > 0 && (
                    <TableRow>
                      <TableCell>Total Answered</TableCell>
                      <TableCell>{totalAnswered}</TableCell>
                    </TableRow>
                  )}
                  {correctAnswers > 0 && (
                    <TableRow>
                      <TableCell>Correct Answers</TableCell>
                      <TableCell>{correctAnswers}</TableCell>
                    </TableRow>
                  )}
                  {incorrectAnswers > 0 && (
                    <TableRow>
                      <TableCell>Incorrect Answers</TableCell>
                      <TableCell>{incorrectAnswers}</TableCell>
                    </TableRow>
                  )}
                  {averageTime > 0 && (
                    <TableRow>
                      <TableCell>Average Time</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{averageTime.toFixed(1)}s</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
