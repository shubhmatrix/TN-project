const ContextBar = () => {
    return (
  <>
    <div className={styles["page-content-container"]}>
      <div className={styles["content-container"]}>
        <div
          className={styles["template_content"]}
          id="new_asset_document"
          style={{ overflowY: "auto" }}
        >

          <div className={styles["header"]} id="context_filter_bar">
            <h1 className={styles["context-bar-header"]}>
              {header_title}
            </h1>
          </div>

          <div className={styles["header-divider"]}></div>

          <div className={styles["header-attributes"]}>
            <div>
              <dt className={styles["attribute-name"]}>Job Number</dt>
              <dd
                className={
                  selectedJob
                    ? styles["attribute-text"]
                    : styles["attribute-text-unselected"]
                }
              >
                {selectedJob || "Not Selected"}
              </dd>
            </div>
          </div>

        </div>
      </div>
    </div>
  </>
);

}