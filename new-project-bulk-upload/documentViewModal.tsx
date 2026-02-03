type Props = {
  document: any;
  onClose: () => void;
};

export default function DocumentViewModal({ document, onClose }: Props) {
  const fileUrl = document?.blob_url || document?.file_path;

  return (
    <div className="overlay">
      <div className="viewerModal">
        <div className="viewerHeader">
          <h4>{document.original_filename}</h4>
          <button onClick={onClose}>✕</button>
        </div>

        <iframe
          src={fileUrl}
          title="Document Viewer"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
