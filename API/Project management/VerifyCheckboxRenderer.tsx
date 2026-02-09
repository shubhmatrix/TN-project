import React from "react";
import { ICellRendererParams } from "ag-grid-community";
import styles from "./VerifyCheckbox.module.css";

interface Props extends ICellRendererParams {
  onClickVerify: (row: any) => void;
}

export default function VerifyCheckboxRenderer(props: Props) {
  const { data, onClickVerify } = props;

  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        checked={data.is_verified}
        disabled={data.is_verified}
        onChange={() => onClickVerify(data)}
      />
      <span className={styles.customCheckbox} />
    </label>
  );
}
