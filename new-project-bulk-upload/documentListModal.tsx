type Props = {
  asset: any;
  onClose: () => void;
  onSelect: (doc: any) => void;
};

export default function DocumentListModal({ asset, onClose, onSelect }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h3>Document List</h3>
            <span className={styles.subText}>
              Asset Tag: {asset.structure_name}
            </span>
          </div>
          <button onClick={onClose} className={styles.closeBtn}>✕</button>
        </div>

        {/* Grid */}
        <div className={`ag-theme-quartz ${styles.grid}`}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
            }}
            animateRows
          />
        </div>
      </div>
    </div>
  );
}
