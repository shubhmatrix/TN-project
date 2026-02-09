interface Props {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{title}</h3>
        <p>{description}</p>

        <div className="actions">
          <button onClick={onConfirm} className="primary">Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}
