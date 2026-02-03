type Props = {
  document: any;
  onClose: () => void;
};

export default function DocumentViewerModal({ document, onClose }: Props) {
  const isPdf = document.mime_type === "application/pdf";
  const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${document.file_path}`;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.viewerModal}>
        <div className={styles.header}>
          <h4>{document.original_filename}</h4>
          <button onClick={onClose}>✕</button>
        </div>

        {isPdf ? (
          <iframe src={fileUrl} width="100%" height="100%" />
        ) : (
          <img src={fileUrl} alt="" style={{ maxWidth: "100%" }} />
        )}
      </div>
    </div>
  );
}
