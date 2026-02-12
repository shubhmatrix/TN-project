const [openCreate, setOpenCreate] = useState(false);

const refetchJobs = () => {
  fetchProjectList(); // your existing list API
};

<button
  className={styles.primaryButton}
  onClick={() => setOpenCreate(true)}
>
  Add New Job
</button>

<CreateJobModal
  isOpen={openCreate}
  onClose={() => setOpenCreate(false)}
  onSuccess={refetchJobs}
/>
