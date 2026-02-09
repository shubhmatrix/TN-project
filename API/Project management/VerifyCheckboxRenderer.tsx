import React from "react";
import { ICellRendererParams } from "ag-grid-community";

interface Props extends ICellRendererParams {
  onClickVerify: (row: any) => void;
}

export default function VerifyCheckboxRenderer(props: Props) {
  const { data, onClickVerify } = props;

  return (
    <input
      type="checkbox"
      checked={data.is_verified}
      disabled={data.is_verified}
      onChange={() => onClickVerify(data)}
    />
  );
}
