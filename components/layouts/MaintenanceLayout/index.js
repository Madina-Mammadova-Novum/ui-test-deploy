export default function MaintenanceLayout({ children }) {
  return (
    <div className="max-w-screen flex min-h-screen">
      <div className="relative flex w-full flex-col md:grow">{children}</div>
    </div>
  );
}
