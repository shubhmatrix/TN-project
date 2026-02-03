type Props = {
  asset: any;
  onClose: () => void;
  onSelect: (doc: any) => void;
};

export default function DocumentListModal({ asset, onClose, onSelect }: Props) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Document List</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Document Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {asset.documents.map((doc: any) => (
              <tr key={doc.document_id}>
                <td>{doc.original_filename}</td>
                <td>{doc.document_type_name}</td>
                <td>
                  <button onClick={() => onSelect(doc)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
