<div style={{ padding: "24px 32px" }}>
  {/* Title already shown in ContextBar */}

  {/* Pole Selector Section */}
  <section style={{ marginBottom: "28px" }}>
    <label
      style={{
        display: "block",
        fontSize: "13.5px",
        fontWeight: 600,
        marginBottom: "6px",
        color: "#222",
      }}
    >
      Pole Structure Search
    </label>

    <select
      style={{
        width: "420px",
        height: "32px",
        borderRadius: "4px",
        border: "1px solid #C7C7C7",
        fontSize: "13px",
        padding: "4px",
        background: "#fff",
      }}
      value={selectedPole}
      onChange={(e) => setSelectedPole(e.target.value)}
    >
      <option value="">Select Pole</option>
      {poleOptions.map((item, i) => (
        <option key={i} value={item}>
          {item}
        </option>
      ))}
    </select>
  </section>

  {/* Card for Upload Form */}
  <section
    style={{
      width: "350px",
      background: "#fff",
      borderRadius: "6px",
      boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
      border: "1px solid #eaeaea",
      padding: "16px 18px",
    }}
  >
    <label style={{ fontSize: "14px", fontWeight: 600 }}>File 1</label>

    {/* Document Upload Row */}
    <div style={{ marginTop: "12px" }}>
      <div style={{ marginBottom: "6px", fontSize: "13px", color: "#555" }}>
        Document Type:
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <select
          style={{
            flex: 1,
            height: "32px",
            borderRadius: "4px",
            border: "1px solid #C7C7C7",
            fontSize: "13px",
            padding: "4px",
          }}
        >
          <option>Select Document Type</option>
        </select>

        <input
          type="file"
          style={{
            fontSize: "12.5px",
            padding: "3px",
          }}
        />
      </div>
    </div>

    {/* Buttons */}
    <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
      <button
        style={{
          background: "#1660E8",
          border: "none",
          color: "#fff",
          padding: "6px 14px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "12.5px",
        }}
      >
        Upload
      </button>

      <button
        style={{
          border: "1px solid #C7C7C7",
          background: "#fff",
          padding: "6px 14px",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "12.5px",
          color: "#444",
        }}
      >
        Add Another
      </button>
    </div>
  </section>
</div>
