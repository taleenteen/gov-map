"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Plus,
  FileText,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  RequestItem,
  RequestStatus,
  RequestPriority,
} from "@/data/mock-table-data";
import { cn } from "@/lib/utils";

interface RequestTableProps {
  data: RequestItem[];
}

export function RequestTable({ data }: RequestTableProps) {
  // 🎨 Helper: จัดการสี Status
  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-100 shadow-none font-normal">
            อนุมัติ
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-100 shadow-none font-normal">
            รอดำเนินการ
          </Badge>
        );
      case "review":
        return (
          <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100 shadow-none font-normal">
            กำลังตรวจสอบ
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // 🎨 Helper: จัดการสี Priority
  const getPriorityBadge = (priority: RequestPriority) => {
    switch (priority) {
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-600 border-red-100 font-normal"
          >
            สูง
          </Badge>
        );
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-600 border-yellow-100 font-normal"
          >
            ปานกลาง
          </Badge>
        );
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-slate-50 text-slate-600 border-slate-100 font-normal"
          >
            ต่ำ
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* --- 1. Header & Filter --- */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-100">
        {/* Search & Filter */}
        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="ค้นหาด้วยชื่อ ผู้ยื่นคำขอ หรือรหัส..."
              className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-1"
            />
          </div>
          <Button
            variant="outline"
            className="gap-2 text-slate-600 border-slate-200 bg-slate-50"
          >
            <Filter className="h-4 w-4" />
            กรอง
          </Button>
        </div>

        {/* Add Button */}
        <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shadow-sm">
          <Plus className="h-4 w-4" />
          คำขอใหม่
        </Button>
      </div>

      {/* --- 2. Table Content --- */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[30%] uppercase text-xs font-semibold text-slate-500">
                Title
              </TableHead>
              <TableHead className="w-[20%] uppercase text-xs font-semibold text-slate-500">
                Applicant
              </TableHead>
              <TableHead className="w-[15%] uppercase text-xs font-semibold text-slate-500">
                Date
              </TableHead>
              <TableHead className="w-[15%] uppercase text-xs font-semibold text-slate-500">
                Status
              </TableHead>
              <TableHead className="w-[10%] uppercase text-xs font-semibold text-slate-500">
                Priority
              </TableHead>
              <TableHead className="w-[10%] uppercase text-xs font-semibold text-slate-500 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-slate-50/50 border-slate-100"
              >
                {/* Title */}
                <TableCell className="font-medium text-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                      <FileText className="h-4 w-4" />
                    </div>
                    {item.title}
                  </div>
                </TableCell>

                {/* Applicant */}
                <TableCell className="text-slate-600">
                  {item.applicant}
                </TableCell>

                {/* Date */}
                <TableCell className="text-slate-500 font-mono text-xs">
                  {item.date}
                </TableCell>

                {/* Status */}
                <TableCell>{getStatusBadge(item.status)}</TableCell>

                {/* Priority */}
                <TableCell>{getPriorityBadge(item.priority)}</TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-500 hover:text-slate-600 hover:bg-slate-100"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* --- 3. Pagination Footer --- */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
        <p className="text-sm text-slate-500">แสดง 1-8 จาก 8 รายการ</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-white border-slate-200 text-slate-600 disabled:opacity-50"
            disabled
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            ก่อนหน้า
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white border-slate-200 text-slate-600 disabled:opacity-50"
            disabled
          >
            ถัดไป
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
