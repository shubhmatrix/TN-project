"use client";
import styles from "@/styles/ConfirmModal.module.css";

type Props = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{message}</p>

        <div className={styles.actions}>
          <button className={styles.primary} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.secondary} onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
