<CreatePoleStructureModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSuccess={() => {
    // reload grid after creation
    refetchData(); // replace with your fetch method
  }}
  crmJobOptions={[
    { id: 1, label: "CRM Job 1" },
    { id: 2, label: "CRM Job 2" },
  ]}
  structureOptions={[
    { id: 1, label: "Structure A" },
    { id: 2, label: "Structure B" },
  ]}
/>


onConfirm={async () => {
  if (!selectedRow) return;

  try {
    await verifyPoleStructure({
      pole_structure_id: selectedRow.pole_structure_id,
      verified_by: 1, // replace with logged-in user id
    });

    await refetch(); // reload list

  } catch (err) {
    console.error("Verification failed", err);
  } finally {
    setOpenConfirm(false);
    setSelectedRow(null);
  }
}}
