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
