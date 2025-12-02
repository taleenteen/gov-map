import React from "react";

interface TankDetailsProps {
  title?: string;
}

export function TankDetails({ title = "หมุดปริมาณน้ำ 1" }: TankDetailsProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>รายละเอียดของหมุดปริมาณน้ำ</p>
    </div>
  );
}
