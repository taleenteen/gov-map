import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlaceholderCardProps {
  onClose: () => void;
}

export function PlaceholderCard({ onClose }: PlaceholderCardProps) {
  return (
    <Card className="w-[400px] shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Card 1</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ✕
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">
          This is a placeholder card for the first button.
          <br />
          You can customize the layout here.
        </p>
      </CardContent>
    </Card>
  );
}
